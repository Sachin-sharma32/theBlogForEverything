import { Alert, Avatar } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import moment from "moment/moment";
import { motion } from "framer-motion";
import Like from "../utils/LikeIcon";
import BookmarkBtn from "../utils/BookmarkBtn";
import { imageBuilder } from "../sanity";
import { useEffect } from "react";

const Post = ({ post }) => {
    const mode = useSelector((state) => state.base.mode);
    const [bookmarkSuccess, setBookmarkSuccess] = useState(false);
    const [likeSuccess, setLikeSuccess] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            layout
            transition={{
                delay: 0.1,
            }}
            className={`${
                mode == "light"
                    ? "bg-white shadow-2xl"
                    : "bg-[#262626] shadow-black shadow-2xl"
            } h-fit  w-[350px] rounded-2xl overflow-hidden relative mb-4`}
        >
            {post.image && (
                <div className=" overflow-hidden">
                    <img
                        src={`${imageBuilder(post?.image)}`}
                        width="400"
                        className="h-[180px] hover:scale-125 transition-all duration-700"
                        alt="post"
                    />
                </div>
            )}
            {post.title && post.title && post.author && (
                <article className=" p-4">
                    <div className="flex items-center justify-between text-xs flex-wrap gap-1">
                        <div className=" text-[#eb9586] flex gap-2">
                            {post?.tags?.map((tag, i) => (
                                <Link href={`/search/${tag.title}`} key={i}>
                                    <p className=" text-xs cursor-pointer hover:scale-110 transition-all duration-200">
                                        #{tag.title}
                                    </p>
                                </Link>
                            ))}
                        </div>
                        {post.readTime && (
                            <p
                                className={`${
                                    mode == "dark"
                                        ? "text-gray-300"
                                        : "text-gray-700"
                                }`}
                            >
                                {post.readTime} minutes
                            </p>
                        )}
                    </div>
                    <Link
                        href={`/post/${post._id}`}
                        className=" cursor-pointer"
                    >
                        <h5
                            className={`${
                                mode == "dark" ? "text-white" : "text-black"
                            } mt-4 text-2xl font-bold mb-2`}
                        >
                            {post.title}
                        </h5>
                        <p className=" mb-4">
                            {post?.summery && post?.summery[0].children[0].text}
                        </p>
                    </Link>
                    <section className="flex gap-2 items-start">
                        <div className="flex gap-2 cursor-pointer">
                            <Avatar src={imageBuilder(post.author.image)} />
                            <div>
                                <div className="flex gap-4 items-center">
                                    <p
                                        className={`${
                                            mode == "dark"
                                                ? "text-white"
                                                : "text-black"
                                        }`}
                                    >
                                        {post.author.name}
                                    </p>
                                    <div className="">
                                        {moment(post.publishedAt).format("ll")}
                                    </div>
                                </div>
                                <p className=" text-xs">{post.author.work}</p>
                            </div>
                        </div>
                    </section>
                    <div
                        className={` absolute bottom-1 right-1 flex gap-2 ${
                            mode == "dark" ? "text-white" : "text-black"
                        }`}
                    >
                        <BookmarkBtn
                            post={post}
                            setSuccess={setBookmarkSuccess}
                        />
                        <div className="text-black relative">
                            <Like post={post} setSuccess={setLikeSuccess} />
                        </div>
                    </div>
                </article>
            )}
            {likeSuccess && (
                <Alert
                    security="success"
                    className="absolute top-32 left-1/2 -translate-x-1/2"
                >
                    <Link href="/like">MY LIKES</Link>
                </Alert>
            )}
            {bookmarkSuccess && (
                <Alert
                    security="success"
                    className="absolute top-48 left-1/2 -translate-x-1/2 w-48"
                >
                    <Link href="/bookmark">MY BOOKMARKS</Link>
                </Alert>
            )}
        </motion.div>
    );
};

export default React.memo(Post);
