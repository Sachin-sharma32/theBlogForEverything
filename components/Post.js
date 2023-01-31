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
import { useGetPost } from "../hooks/usePost";

const Post = ({ post }) => {
    console.log(post);
    const mode = useSelector((state) => state.base.mode);
    const [bookmarkSuccess, setBookmarkSuccess] = useState(false);

    const [likeSuccess, setLikeSuccess] = useState(false);
    const [currentPost, setCurrentPost] = useState(null);
    console.log(currentPost);
    const onSuccess = (data) => {
        setCurrentPost(data);
    };
    useGetPost(post, onSuccess);
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
            } h-[530px]  w-[350px] rounded-2xl overflow-hidden relative`}
        >
            {currentPost?.image && (
                <div className=" overflow-hidden">
                    <img
                        src={currentPost.image}
                        width="400"
                        className="h-[180px] hover:scale-125 transition-all duration-700"
                        alt="currentPost"
                    />
                </div>
            )}
            <article className=" p-4">
                <div className="flex items-center justify-between text-xs flex-wrap gap-1">
                    <div className=" text-[#eb9586] flex gap-2">
                        {currentPost?.tags?.map((tag, i) => (
                            <Link href={`/search/${tag.title}`} key={i}>
                                <p className=" text-xs cursor-pointer hover:scale-110 transition-all duration-200">
                                    #{tag.title}
                                </p>
                            </Link>
                        ))}
                    </div>
                    <p
                        className={`${
                            mode == "dark" ? "text-gray-300" : "text-gray-700"
                        }`}
                    >
                        {currentPost?.readTime} minutes
                    </p>
                </div>
                <Link
                    href={`/post/${currentPost?._id}`}
                    className=" cursor-pointer"
                >
                    <h5
                        className={`${
                            mode == "dark" ? "text-white" : "text-black"
                        } mt-4 text-2xl font-bold mb-2`}
                    >
                        {currentPost?.title}
                    </h5>
                    <p className=" mb-4">{currentPost?.summery}</p>
                </Link>
                <section className="flex gap-2 items-start absolute bottom-2">
                    <div className="flex gap-2 cursor-pointer">
                        <Avatar src={currentPost?.author.image} />
                        <div>
                            <div className="flex gap-4 items-center">
                                <p
                                    className={`${
                                        mode == "dark"
                                            ? "text-white"
                                            : "text-black"
                                    }`}
                                >
                                    {currentPost?.author.name}
                                </p>
                                <div className="">
                                    {moment(currentPost?.updatedAt).format(
                                        "ll"
                                    )}
                                </div>
                            </div>
                            <p className=" text-xs">
                                {currentPost?.author.work}
                            </p>
                        </div>
                    </div>
                </section>
                <div
                    className={` absolute bottom-1 right-1 flex gap-2 ${
                        mode == "dark" ? "text-white" : "text-black"
                    }`}
                >
                    <BookmarkBtn
                        post={currentPost}
                        setSuccess={setBookmarkSuccess}
                    />
                    <div className="text-black relative">
                        <Like post={currentPost} setSuccess={setLikeSuccess} />
                    </div>
                </div>
            </article>
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
                    className="absolute top-48 left-1/2 -translate-x-1/2"
                >
                    <Link href="/bookmark">MY BOOKMARKS</Link>
                </Alert>
            )}
        </motion.div>
    );
};

export default React.memo(Post);
