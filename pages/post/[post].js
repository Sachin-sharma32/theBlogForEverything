import { Avatar, Tooltip } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ReplyIcon from "@mui/icons-material/Reply";
import RelatedPosts from "../../components/RelatedPosts";
import Author from "../../components/Author";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Smooth from "../../utils/Smooth";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import serializerFn from "../../utils/serializer";
import comment from "../../../sanity/schemas/comment";
const BlockContent = require("@sanity/block-content-to-react");
import moment from "moment/moment";
import Link from "next/link";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Error from "../../utils/Error";
import axios from "axios";
import LikeCommentIcon from "../../utils/LikeCommentIcon";

const post = () => {
    const mode = useSelector((state) => state.base.mode);
    const router = useRouter();
    const posts = useSelector((state) => state.base.posts);
    const user = useSelector((state) => state.base.user);
    const currentPost = posts.filter((item) => {
        return item._id == router.query.post;
    });
    const post = currentPost[0];
    const [comments, setComments] = useState([]);
    useEffect(() => {
        if (post) {
            setComments(post.comments);
        }
    }, [post]);

    const initialValues = {
        name: user.name,
        comment: "",
        email: user.email,
    };

    const EMAIL_REGEX =
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const validationObject = yup.object({
        name: yup.string().required("This field is required").min(3),
        email: yup
            .string()
            .required()
            .matches(EMAIL_REGEX, "Please provide a valid email address"),
    });
    const submitHandler = async (values) => {
        if (user) {
            values = {
                name: user.name,
                email: user.email,
                comment: values.comment,
            };
            const { data } = await axios.put("/api/users/comment", {
                postId: post._id,
                values,
            });
            setComments(data.comments);
        } else {
            values = {
                name: values.name,
                email: values.email,
                comment: values.comment,
            };
            const { data } = await axios.put("/api/users/comment", {
                postId: post._id,
                values,
            });
            setActivePost(data);
        }
    };

    if (!post) {
        return <div className="min-h-screen"></div>;
    } else {
        return (
            <Smooth
                className={`${
                    mode == "dark"
                        ? "post-page text-white"
                        : "post-page-light text-gray-800 bg-white"
                }  min-h-screen `}
            >
                {post && (
                    <div className=" px-4 md:px-10 py-4 md:py-8 flex flex-col lg:flex-row lg:gap-10">
                        <div className=" w-[100%] lg-[70%]">
                            <div
                                className={`${
                                    mode == "dark"
                                        ? "text-orange-500"
                                        : "text-black"
                                } flex gap-4 text-xs`}
                            >
                                {post.tag.map((item, i) => (
                                    <Link href={`/${item.title}`} key={i}>
                                        <p className=" hover:scale-125 transition-all duration-200 cursor-pointer">
                                            #{item.title}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                            <h1 className=" mt-2 md:mt-8 text-3xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 text-transparent bg-clip-text">
                                {post.title}
                            </h1>
                            <div className=" mt-4 flex gap-2 text-xs items-center">
                                <Avatar src="/person.webp" />
                                <p>
                                    {post.author[0].name} on{" "}
                                    {moment(post.publishedAt).format("ll")}
                                </p>
                            </div>
                            <div
                                className={`${
                                    mode == "dark"
                                        ? "bg-[#262626] text-white"
                                        : "bg-white text-[#262626]"
                                } mt-4 md:mt-10  p-4 rounded-sm shadow-xl text-xs sm:text-base`}
                            >
                                <BlockContent
                                    blocks={post.content}
                                    projectId="k0me7ccv"
                                    dataset="production"
                                    serializers={serializerFn()}
                                />
                            </div>
                            <div
                                className={`${
                                    mode == "dark"
                                        ? "bg-gray-800"
                                        : "bg-gray-100 text-black"
                                }  mt-10
                                rounded-sm
                                p-4
                                flex
                                flex-col
                                items-center shadow-xl text-xs md:text-base`}
                            >
                                <div className=" pb-1 bg-gradient-to-r from-pink-500 to-orange-500 h-7">
                                    <h3
                                        className={`${
                                            mode == "dark"
                                                ? "bg-gray-800"
                                                : "bg-gray-100"
                                        } font-bold mb-10 text-base`}
                                    >
                                        COMMENT
                                    </h3>
                                </div>
                                <Formik
                                    initialValues={initialValues}
                                    validateOnBlur={true}
                                    validateOnChange={true}
                                    validationSchema={validationObject}
                                    onSubmit={submitHandler}
                                >
                                    {(props) => {
                                        return (
                                            <Form className="flex flex-col justify-center items-center gap-6  w-[100%]">
                                                <div>
                                                    <Field
                                                        as="textarea"
                                                        name="comment"
                                                        values={
                                                            props.values.comment
                                                        }
                                                        cols="30"
                                                        rows="5"
                                                        className=" bg-white  w-[100%] md:w-[500px] text-black p-4 mt-4 border-b-2 shadow-sm rounded-md outline-none"
                                                        placeholder="Write a comment..."
                                                    ></Field>
                                                    <ErrorMessage
                                                        name="comment"
                                                        component={Error}
                                                    />
                                                </div>
                                                {!user && (
                                                    <div className="flex flex-col gap-6">
                                                        <div className=" relative">
                                                            <Field
                                                                type="text"
                                                                value={
                                                                    props.values
                                                                        .name
                                                                }
                                                                name="name"
                                                                placeholder="Name"
                                                                className=" bg-white w-[100%] md:w-[500px] h-10 rounded-md px-4 text-black shadow-md outline-none"
                                                            />
                                                            <ErrorMessage
                                                                name="name"
                                                                component={
                                                                    Error
                                                                }
                                                            />
                                                        </div>
                                                        <div className=" relative">
                                                            <Field
                                                                type="text"
                                                                value={
                                                                    props.values
                                                                        .email
                                                                }
                                                                name="email"
                                                                placeholder="Email"
                                                                className=" bg-white w-[100%] md:w-[500px] h-10 rounded-md px-4 text-black shadow-md outline-none"
                                                            />
                                                            <ErrorMessage
                                                                name="email"
                                                                component={
                                                                    Error
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                                <button
                                                    disabled={!props.isValid}
                                                    type="submit"
                                                    className="  valid:bg-gradient-to-r from-pink-500 to-orange-500 p-2 rounded-md disabled:active:scale-100 self-end active:scale-90 disabled:bg-gray-500 transition-all duration-200"
                                                >
                                                    POST COMMENT
                                                </button>
                                            </Form>
                                        );
                                    }}
                                </Formik>
                            </div>
                            <div className=" mt-10 text-xs md:text-base">
                                {comments?.length > 0 && (
                                    <div>
                                        {comments.map((item, i) => (
                                            <div
                                                className="border-t-[1px] border-white mt-4"
                                                key={i}
                                            >
                                                <div>
                                                    <h5 className=" text-2xl font-semibold">
                                                        {item.name}
                                                    </h5>
                                                    <p className=" text-xs">
                                                        #{" "}
                                                        {moment(
                                                            item.publishedAt
                                                        ).format("ll")}
                                                    </p>
                                                </div>
                                                <div className=" mt-2 bg-white p-4 pr-20 rounded-md text-black">
                                                    <div className="relative">
                                                        <p>{item.comment}</p>
                                                        <div className=" absolute -bottom-4 -right-16 flex gap-6">
                                                            <LikeCommentIcon
                                                                comment={item}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className=" lg:w-[30%] mt-8 flex flex-col md:flex-row lg:flex-col gap-2 lg:gap-8">
                            <div className=" bg-white rounded-md overflow-hidden shadow-xl w-fit h-fit">
                                <Author author={post.author[0]} />
                            </div>
                            <div className=" bg-white rounded-md overflow-hidden sticky top-20 shadow-xl w-fit">
                                <RelatedPosts post={post} />
                            </div>
                        </div>
                    </div>
                )}
            </Smooth>
        );
    }
};

export default post;
