import { Avatar, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import RelatedPosts from "../../components/RelatedPosts";
import Author from "../../components/Author";
import Smooth from "../../utils/Smooth";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import serializerFn from "../../utils/serializer";
const BlockContent = require("@sanity/block-content-to-react");
import moment from "moment/moment";
import Link from "next/link";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Error from "../../utils/Error";
import axios from "axios";
import LikeCommentIcon from "../../utils/LikeCommentIcon";
import Head from "next/head";
import { imageBuilder } from "../../sanity";

const Post = () => {
    const mode = useSelector((state) => state.base.mode);
    const router = useRouter();
    const posts = useSelector((state) => state.base.posts);
    const user = useSelector((state) => state.base.user);
    const currentPost = posts.filter((item) => {
        return item._id == router.query.post;
    });
    const post = currentPost[0];
    console.log(post);
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
            <>
                <Head>
                    <title>TBFE-{post.title}</title>
                    <link rel="icon" type="image/png" href="/favicon.ico" />
                    <meta
                        name="description"
                        content={`${post.content[0].children[0].text}`}
                    />
                    <meta
                        property="og:title"
                        content={`TBFE - ${post.title}`}
                    />
                    <meta
                        property="og:description"
                        content={`${post.summery[0].children[0].text}`}
                    />
                    <meta property="og:type" content="article" />
                    <meta
                        property="og:site_name"
                        content="TheBlogForEverything"
                    />
                    <meta
                        property="og:image"
                        content={`${imageBuilder(post.image)}`}
                    />
                    <meta
                        property="og:url"
                        content={`https://theblogforeverything.com/post${post._id}`}
                    />
                    <meta
                        property="twitter:card"
                        content="summary_large_image"
                    />
                    <meta
                        property="twitter:site"
                        content="FBFE - The Blog For Everything"
                    />
                    <meta property="twitter:title" content={`${post.title}`} />
                    <meta
                        property="twitter:description"
                        content={`${post.summery[0].children[0].text}`}
                    />
                    <meta
                        property="twitter:image:src"
                        content={`${imageBuilder(post.image)}`}
                    />
                    <meta
                        property="og:url"
                        content={`https://theblogforeverything.com/post${post._id}`}
                    />
                </Head>
                <Smooth
                    className={`${
                        mode == "dark"
                            ? "post-page text-white"
                            : "post-page-light text-gray-800 bg-white"
                    }  min-h-screen `}
                >
                    {post && (
                        <article className=" px-4 md:px-10 py-4 md:py-8 flex flex-col lg:flex-row lg:gap-10">
                            <div className=" w-[100%] lg-[70%]">
                                <section
                                    className={`${
                                        mode == "dark"
                                            ? "text-orange-500"
                                            : "text-black"
                                    } flex gap-4 text-xs`}
                                >
                                    {post.tags.map((item, i) => (
                                        <Link
                                            href={`/search/${item.title}`}
                                            key={i}
                                        >
                                            <p className=" hover:scale-125 transition-all duration-200 cursor-pointer">
                                                #{item.title}
                                            </p>
                                        </Link>
                                    ))}
                                </section>
                                <h1 className=" mt-2 md:mt-8 text-3xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 text-transparent bg-clip-text">
                                    {post.title}
                                </h1>
                                <figure className=" mt-4 flex gap-2 text-xs items-center">
                                    <Avatar src="/person.webp" />
                                    <figcaption>
                                        {post.author.name} on{" "}
                                        {moment(post.publishedAt).format("ll")}
                                    </figcaption>
                                </figure>
                                <main
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
                                </main>
                                <section
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
                                                    <div className="w-[100%] sm:w-fit">
                                                        <Field
                                                            as="textarea"
                                                            name="comment"
                                                            values={
                                                                props.values
                                                                    .comment
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
                                                        <div className="flex flex-col gap-6 w-[100%]">
                                                            <div className="w-[100%] sm:w-fit relative">
                                                                <Field
                                                                    type="text"
                                                                    value={
                                                                        props
                                                                            .values
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
                                                            <div className="w-[100%] sm:w-fit relative">
                                                                <Field
                                                                    type="text"
                                                                    value={
                                                                        props
                                                                            .values
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
                                                        disabled={
                                                            !props.isValid
                                                        }
                                                        type="submit"
                                                        className="  valid:bg-gradient-to-r from-pink-500 to-orange-500 p-2 rounded-md disabled:active:scale-100 self-end active:scale-90 disabled:bg-gray-500 transition-all duration-200"
                                                    >
                                                        POST COMMENT
                                                    </button>
                                                </Form>
                                            );
                                        }}
                                    </Formik>
                                </section>
                                <section className=" mt-10 text-xs md:text-base">
                                    {comments?.length > 0 && (
                                        <article>
                                            {comments.map((item, i) => (
                                                <div
                                                    className="border-t-[1px] border-white mt-4"
                                                    key={i}
                                                >
                                                    <dov>
                                                        <h5 className=" text-2xl font-semibold">
                                                            {item.name}
                                                        </h5>
                                                        <p className=" text-xs">
                                                            #{" "}
                                                            {moment(
                                                                item.publishedAt
                                                            ).format("ll")}
                                                        </p>
                                                    </dov>
                                                    <div className=" mt-2 bg-white p-4 pr-20 rounded-md text-black">
                                                        <div className="relative">
                                                            <p>
                                                                {item.comment}
                                                            </p>
                                                            <div className=" absolute -bottom-4 -right-16 flex gap-6">
                                                                <LikeCommentIcon
                                                                    comment={
                                                                        item
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </article>
                                    )}
                                </section>
                            </div>
                            <aside className=" lg:w-[30%] mt-8 flex flex-col justify-center items-center md:justify-start md:flex-row lg:flex-col gap-2 lg:gap-8">
                                <div className=" bg-white rounded-md overflow-hidden shadow-xl w-fit h-fit">
                                    <Author author={post.author} />
                                </div>
                                <div className=" bg-white rounded-md overflow-hidden sticky top-20 shadow-xl w-fit">
                                    <RelatedPosts post={post} />
                                </div>
                            </aside>
                        </article>
                    )}
                </Smooth>
            </>
        );
    }
};

export default Post;
