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
import BookmarkBtn from "../../utils/BookmarkBtn";
import Like from "../../utils/LikeIcon";
import EastIcon from "@mui/icons-material/East";
import { PortableText } from "@portabletext/react";
import RichTextComponent from "../../components/RichTextComponent";
import { useMemo } from "react";
import ErrorBoundry from "../../utils/ErrorBoundry";
import Editor from "rich-markdown-editor";

const Post = ({ post }) => {
    const [editor, setEditor] = useState(null);
    const mode = useSelector((state) => state.base.mode);
    const router = useRouter();
    // const posts = useSelector((state) => state.base.posts);
    const user = useSelector((state) => state.base.user);
    const [comment, setComment] = useState("");
    const [copy, setCopy] = useState(false);

    // const currentPost = useMemo(() => {
    //     return posts?.filter((item) => {
    //         return item?._id == router.query.post;
    //     });
    // }, [posts]);
    // const post = currentPost[0];
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
                    `linear-gradient(rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0.9) 90%, rgb(255, 255, 255) 100%),url("${post.image}")`
                );
            } else {
                setEffect(
                    `linear-gradient(rgba(0, 0, 0, 0.7) 0%, rgb(0, 0, 0,.8) 50%, rgba(0, 0, 0, 0.9) 90%, rgb(0, 0, 0) 100%),url("${post.image}")`
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
    const postCentent = post.content
        .replaceAll("<h1>", '<h1 class="text-5xl font-bold mb-6">')
        .replaceAll("<h2>", '<h2 class="text-4xl font-bold mb-6">')
        .replaceAll("<h3>", '<h3 class="text-3xl font-bold mb-6">')
        .replaceAll("<h4>", '<h4 class="text-2xl font-bold mb-6">')
        .replaceAll("<h5>", '<h5 class="text-xl font-bold mb-6">')
        .replaceAll("<h6>", '<h6 class="text-lg font-bold mb-6">')
        .replaceAll("<ul>", '<ul class="list-disc font-normal">')
        .replaceAll("<ol>", '<ol class="list-decimal font-normal">')
        .replaceAll("<ul>", "<ul>")
        .replaceAll("<li>", '<li class="mb-4">')
        .replaceAll(
            "<pre",
            '<pre class="bg-gray-100 p-4 rounded-md text-black overflow-scroll max-w-[500px] max-h-[300;x] mb-4 m-auto'
        )
        .replaceAll("<img", "<img class='h-[300px] m-auto w-[500px] mb-4'")
        .replaceAll(
            "<blockquote>",
            '<blockquote class="p-4 pl-2 h-fit border-l-4 border-orange-500 bg-orange-100 text-gray-500 rounded-lg font-bold mb-4 text-center quote">'
        )
        .replaceAll("<a", '<a class="text-blue-500 hover:border-b pb-1"')
        .replaceAll("<p>", '<p class="mb-4 font-normal">');
    if (post) {
        return (
            <div>
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
                                    <Avatar src={post.author.image} />
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
                                    } mt-4 md:mt-10  p-4 sm:p-10 rounded-sm shadow-xl text-xs sm:text-base relative py-4 rounded-2xl`}
                                    style={{ fontFamily: "Inter" }}
                                >
                                    {/* <PortableText
                                        value={post.content}
                                        components={RichTextComponent(
                                            copy,
                                            setCopy
                                        )}
                                    /> */}
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: postCentent,
                                        }}
                                    />
                                    {/* <Editor /> */}
                                    {/* <Editor
                                        onSave={(
                                            editorData,
                                            title,
                                            description
                                        ) =>
                                            onSaveHandler(
                                                editorData,
                                                title,
                                                description
                                            )
                                        }
                                    /> */}
                                    <div className="flex justify-end gap-3 relative mt-4">
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
                                    p-4
                                    flex
                                    flex-col
                                    items-center shadow-xl text-xs md:text-base rounded-2xl`}
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
                                    <ErrorBoundry>
                                        <Author author={post.author} />
                                    </ErrorBoundry>
                                </div>
                                <div className=" bg-white rounded-2xl overflow-hidden sticky top-20 shadow-xl w-fit">
                                    <ErrorBoundry>
                                        <RelatedPosts post={post} />
                                    </ErrorBoundry>
                                </div>
                            </aside>
                        </article>
                    )}
                </Smooth>
            </div>
        );
    } else {
        return <div className="min-h-screen"></div>;
    }
};

export default Post;

// Post.getInitialProps = async (context) => {
//     const { query } = context;
//     const headerPost = await client.fetch(
//         `*[_type == "post" && _id == $id][0]{title, image, summery, tags[]->, summery,_id}`,
//         {
//             id: query.post,
//         }
//     );
//     const tags = headerPost.tags.map((tag) => tag.title);
//     return {
//         title: headerPost.title,
//         image: imageBuilder(headerPost.image),
//         summery: headerPost.summery[0].children[0].text,
//         keywords: tags.toString(),
//         type: "website",
//         imageAlt: headerPost.title,
//         id: headerPost._id,
//     };
// };

export async function getServerSideProps(context) {
    const post = await axios.get(
        `http://localhost:8000/api/v1/posts/${context.params.post}`,
        {
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDQwMTAxYzk0MGUxZWVkMTlmMmVmMiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3NTA3ODYyMSwiZXhwIjoxNjc1NjgzNDIxfQ.m78XjAVnusQbvTUnbowBRNQOt88iGd6YmfIxFYKAZts`,
            },
        }
    );
    // const tags = post?.tags?.map((tag) => tag.title);
    return {
        props: {
            post: post.data.data.doc,
            // title: post.title,
            // image: post.image,
            // summery: post.summery,
            // keywords: tags.toString(),
            // type: "website",
            // imageAlt: post.title,
            // id: post._id,
        },
    };
}
