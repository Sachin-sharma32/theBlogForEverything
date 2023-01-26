import { Alert, Avatar, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import RelatedPosts from "../../components/RelatedPosts";
import Author from "../../components/Author";
import Smooth from "../../utils/Smooth";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import moment from "moment/moment";
import Link from "next/link";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Error from "../../utils/Error";
import axios from "axios";
import LikeCommentIcon from "../../utils/LikeCommentIcon";
import Head from "next/head";
import { imageBuilder } from "../../sanity";
import BookmarkBtn from "../../utils/BookmarkBtn";
import Like from "../../utils/LikeIcon";
import EastIcon from "@mui/icons-material/East";
import { PortableText } from "@portabletext/react";
import RichTextComponent from "../../components/RichTextComponent";
import Social from "../../utils/Socials";

const Post = () => {
    const mode = useSelector((state) => state.base.mode);
    const router = useRouter();
    const posts = useSelector((state) => state.base.posts);
    const user = useSelector((state) => state.base.user);
    const [comment, setComment] = useState("");
    const [copy, setCopy] = useState(false);

    const currentPost = posts?.filter((item) => {
        return item?._id == router.query.post;
    });
    const post = currentPost[0];
    const [comments, setComments] = useState([]);
    useEffect(() => {
        if (post?.comments) {
            let sorted = [...post.comments];
            sorted = sorted.sort(
                (a, b) =>
                    new Date(b.publishedAt).getTime() -
                    new Date(a.publishedAt).getTime()
            );
            setComments(sorted);
        }
    }, [post]);

    const initialValues = {
        name: "",
        comment: "",
        email: "",
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
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (success) {
            setTimeout(() => {
                setSuccess(false);
            }, 2000);
        }
    }, [success]);
    const submitHandler = async (values, { resetForm }) => {
        setLoading(true);
        values = {
            name: values.name,
            email: values.email,
            comment: values.comment,
        };
        const { data } = await axios.put("/api/users/comment", {
            postId: post?._id,
            values,
        });
        let sorted = [...data.comments];
        sorted = sorted.sort(
            (a, b) =>
                new Date(b.publishedAt).getTime() -
                new Date(a.publishedAt).getTime()
        );
        setComments(sorted);
        resetForm({ values: "" });
        setLoading(false);
        setSuccess(true);
    };
    const submitUserHandler = async (e) => {
        setLoading(true);
        e.preventDefault();
        const values = {
            name: user.name,
            email: user.email,
            comment,
        };
        const { data } = await axios.put("/api/users/comment", {
            postId: post?._id,
            values,
        });
        let sorted = [...data.comments];
        sorted = sorted.sort(
            (a, b) =>
                new Date(b.publishedAt).getTime() -
                new Date(a.publishedAt).getTime()
        );
        setComments(sorted);
        setComment("");
        setLoading(false);
        setSuccess(true);
    };
    const [effect, setEffect] = useState(null);
    useEffect(() => {
        if (post) {
            if (mode === "light") {
                setEffect(
                    `linear-gradient(rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0.9) 90%, rgb(255, 255, 255) 100%),url(${imageBuilder(
                        post.image
                    )})`
                );
            } else {
                setEffect(
                    `linear-gradient(rgba(0, 0, 0, 0.7) 0%, rgb(0, 0, 0,.8) 50%, rgba(0, 0, 0, 0.9) 90%, rgb(0, 0, 0) 100%),url(${imageBuilder(
                        post.image
                    )})`
                );
            }
        }
    }, [mode, post]);
    const [bookmarkSuccess, setBookmarkSuccess] = useState(false);
    const [likeSuccess, setLikeSuccess] = useState(false);
    useEffect(() => {
        if (bookmarkSuccess) {
            setTimeout(() => {
                setBookmarkSuccess(false);
            }, 5000);
        }
        if (likeSuccess) {
            setTimeout(() => {
                setLikeSuccess(false);
            }, 5000);
        }
    }, [bookmarkSuccess, likeSuccess]);
    if (post) {
        return (
            <>
                <Head>
                    <title>TBFE - {post.title}</title>
                    <link
                        rel="icon"
                        type="image/png"
                        href="/site-light-chopped.jpg"
                    />
                    <meta
                        name="description"
                        content={`${
                            post.summery
                                ? `${post.summery[0].children[0].text}`
                                : `${post.title}`
                        }`}
                    />
                    <meta
                        property="og:title"
                        content={`TBFE - ${post.title}`}
                    />
                    <meta
                        name="og:description"
                        content={`${
                            post.summery
                                ? `${post.summery[0].children[0].text}`
                                : `${post.title}`
                        }`}
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
                        content={`https://theblogforeverything.com/post${post?._id}`}
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
                        name="twitter:description"
                        content={`${
                            post.summery
                                ? `${post.summery[0].children[0].text}`
                                : `${post.title}`
                        }`}
                    />
                    <meta
                        property="twitter:image"
                        content={`${imageBuilder(post.image)}`}
                    />
                    <meta
                        property="og:url"
                        content={`https://theblogforeverything.com/post${post._id}`}
                    />
                </Head>

                <Smooth
                    className={`${
                        mode == "light" ? "text-black" : "text-white"
                    }h-[100%] bg-no-repeat bg-fixed bg-center`}
                    style={{
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundAttachment: "fixed",
                        backgroundImage: `${effect}`,
                    }}
                >
                    {bookmarkSuccess && (
                        <Alert
                            security="success"
                            className="absolute top-20 left-1/2 -translate-x-1/2"
                        >
                            <Link href="/bookmark">MY BOOKMARKS</Link>
                        </Alert>
                    )}
                    {post && (
                        <article
                            className={`${
                                mode === "light" ? "text-black" : "text-white"
                            } px-4 md:px-10 py-4 md:py-8 flex flex-col lg:flex-row lg:gap-10`}
                        >
                            <div className=" w-[100%] lg-[70%]">
                                <section
                                    className={`${
                                        mode == "dark"
                                            ? "text-[#eb9586]"
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
                                <h1 className=" mt-2 md:mt-8 text-3xl md:text-5xl font-bold bg-gradient-to-r from-[#ff7d69] to-blue-700 text-transparent bg-clip-text">
                                    {post.title}
                                </h1>
                                <div
                                    className={`${
                                        mode === "dark"
                                            ? "text-white"
                                            : "text-black"
                                    } mt-4 flex gap-2 text-xs items-center`}
                                >
                                    <Avatar
                                        src={imageBuilder(post.author.image)}
                                    />
                                    <figcaption>
                                        {post.author.name} on{" "}
                                        {moment(post.publishedAt).format("ll")}
                                    </figcaption>
                                    <BookmarkBtn
                                        post={post}
                                        setSuccess={setBookmarkSuccess}
                                    />
                                </div>
                                <main
                                    className={`${
                                        mode == "dark"
                                            ? "bg-[#262626] text-white"
                                            : "bg-white text-[#262626]"
                                    } mt-4 md:mt-10  p-4 sm:p-10 rounded-sm shadow-xl text-xs sm:text-base relative py-4`}
                                >
                                    <PortableText
                                        value={post.content}
                                        components={RichTextComponent(
                                            copy,
                                            setCopy
                                        )}
                                    />

                                    <div className="flex justify-end gap-3 relative mt-4">
                                        <BookmarkBtn
                                            post={post}
                                            setSuccess={setBookmarkSuccess}
                                        />
                                        <Like
                                            post={post}
                                            setSuccess={setLikeSuccess}
                                        />
                                        {likeSuccess && (
                                            <Alert
                                                security="success"
                                                className="absolute bottom-24 right-14 translate-x-1/2"
                                            >
                                                <Link href="/like">
                                                    MY LIKES
                                                </Link>
                                            </Alert>
                                        )}
                                        {bookmarkSuccess && (
                                            <Alert
                                                security="success"
                                                className="absolute bottom-10 right-14 translate-x-1/2 z-50"
                                            >
                                                <Link href="/bookmark">
                                                    MY BOOKMARKS
                                                </Link>
                                            </Alert>
                                        )}
                                    </div>
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
                                    <div className=" pb-1 bg-gradient-to-r from-[#ff7d69] to-blue-700 h-7">
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
                                    {!user ? (
                                        <Formik
                                            initialValues={initialValues}
                                            validateOnBlur={true}
                                            validateOnChange={true}
                                            validationSchema={validationObject}
                                            onSubmit={submitHandler}
                                        >
                                            {(props) => {
                                                {
                                                }
                                                return (
                                                    <Form className="flex flex-col justify-center items-center gap-6  w-fit ">
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
                                                                className=" bg-white  w-[350px] md:w-[500px] text-black p-4 mt-4 border-b-2 shadow-sm rounded-2xl outline-none"
                                                                placeholder="Write a comment..."
                                                            ></Field>
                                                            <ErrorMessage
                                                                name="comment"
                                                                component={
                                                                    Error
                                                                }
                                                            />
                                                        </div>
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
                                                                    className=" bg-white w-[350px] md:w-[500px] h-10 rounded-2xl px-4 text-black shadow-md outline-none"
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
                                                                    className=" bg-white w-[350px] md:w-[500px] h-10 rounded-2xl px-4 text-black shadow-md outline-none"
                                                                />
                                                                <ErrorMessage
                                                                    name="email"
                                                                    component={
                                                                        Error
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                        <button
                                                            className={`${
                                                                mode == "light"
                                                                    ? "text-white"
                                                                    : "text-black"
                                                            } transition-all duration-200 min-w-[100px] bg-gradient-to-r disabled:opacity-60 disabled:hover:scale-100 disabled:active:scale-100 from-[#ff7d69] to-blue-700 w-fit self-end rounded-2xl p-2 hover:scale-110 active:scale-100 font-semibold`}
                                                            type="submit"
                                                            disabled={
                                                                !props.isValid
                                                            }
                                                        >
                                                            {loading && (
                                                                <div className="flex gap-1 items-center justify-center">
                                                                    <CircularProgress
                                                                        size="1rem"
                                                                        color="inherit"
                                                                    />
                                                                    <p>
                                                                        Posting...
                                                                    </p>
                                                                </div>
                                                            )}
                                                            {success && (
                                                                <p>Posted</p>
                                                            )}
                                                            {!loading &&
                                                                !success && (
                                                                    <p>
                                                                        POST
                                                                        COMMENT
                                                                    </p>
                                                                )}
                                                        </button>
                                                    </Form>
                                                );
                                            }}
                                        </Formik>
                                    ) : (
                                        <form
                                            className="flex flex-col justify-center items-center gap-6  w-fit relative"
                                            onSubmit={submitUserHandler}
                                        >
                                            <textarea
                                                minLength="5"
                                                name=""
                                                id=""
                                                cols="30"
                                                value={comment}
                                                className=" bg-white  w-[350px] md:w-[500px] text-black p-4 mt-4 border-b-2 shadow-sm rounded-2xl outline-none"
                                                rows="10"
                                                onChange={(e) => {
                                                    setComment(e.target.value);
                                                }}
                                                required
                                            ></textarea>
                                            <button
                                                className={`${
                                                    mode == "light"
                                                        ? "text-white"
                                                        : "text-black"
                                                } transition-all duration-200 min-w-[120px] bg-gradient-to-r disabled:opacity-60 disabled:hover:scale-100 disabled:active:scale-100 from-[#ff7d69] to-blue-700 w-fit self-end rounded-2xl p-2 hover:scale-110 active:scale-100 font-semibold`}
                                                type="submit"
                                            >
                                                {loading && (
                                                    <div className="flex gap-1 items-center justify-center">
                                                        <CircularProgress
                                                            size="1rem"
                                                            color="inherit"
                                                        />
                                                        <p>Posting...</p>
                                                    </div>
                                                )}
                                                {success && <p>Posted</p>}
                                                {!loading && !success && (
                                                    <p>POST COMMENT</p>
                                                )}
                                            </button>
                                            {success && (
                                                <div className=" absolute top-10">
                                                    <Alert severity="success">
                                                        Comment Posted
                                                        Successfully
                                                    </Alert>
                                                </div>
                                            )}
                                        </form>
                                    )}
                                </section>
                                <section className=" mt-10 text-xs md:text-base">
                                    {comments?.length > 0 && (
                                        <article>
                                            {comments
                                                .slice(0, 3)
                                                .map((item, i) => (
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
                                                        <div className=" mt-2 bg-white p-4 pr-20 rounded-2xl text-black">
                                                            <div className="relative">
                                                                <p>
                                                                    {
                                                                        item.comment
                                                                    }
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
                                            <Link
                                                href={`/comments/${post._id}`}
                                                className={`${
                                                    mode == "dark"
                                                        ? "text-white"
                                                        : "text-black"
                                                } flex gap-2 hover:gap-4 justify-center items-center self-end duration-200 transition-all mt-6`}
                                            >
                                                <p>SEE ALL REVIEWS</p>
                                                <EastIcon />
                                            </Link>
                                        </article>
                                    )}
                                </section>
                            </div>
                            <aside className=" lg:w-[30%] mt-8 flex flex-col justify-center items-center md:justify-start md:flex-row lg:flex-col gap-2 lg:gap-8">
                                <div className=" bg-white rounded-2xl overflow-hidden shadow-xl w-fit h-fit">
                                    <Author author={post.author} />
                                </div>
                                <div className=" bg-white rounded-2xl overflow-hidden sticky top-20 shadow-xl w-fit">
                                    <RelatedPosts post={post} />
                                </div>
                            </aside>
                        </article>
                    )}
                </Smooth>
            </>
        );
    } else {
        return <div className="min-h-screen"></div>;
    }
};

export default Post;
