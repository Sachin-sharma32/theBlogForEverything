import { Avatar, Tooltip } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useSelector } from "react-redux";
import Link from "next/link";
import moment from "moment/moment";
import { NumberInput } from "sanity";
import { motion } from "framer-motion";
import Like from "../utils/LikeIcon";
import BookmarkBtn from "../utils/BookmarkBtn";

const Post = ({ post }) => {
    const mode = useSelector((state) => state.base.mode);
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ y: [100, 0], opacity: 1 }}
            transition={{
                x: { duration: 3 },
                default: { ease: "linear" },
            }}
            className={`${
                mode == "light"
                    ? "bg-white shadow-2xl"
                    : "bg-[#262626] shadow-black shadow-2xl"
            } h-[500px] w-[350px] rounded-sm overflow-hidden relative`}
        >
            <Image src="/post-img.webp" width="400" height="10" alt="post" />
            {post && (
                <article className=" p-4">
                    <div className="flex items-center justify-between">
                        <div className=" text-orange-500 flex gap-4">
                            {post?.tags?.map((tag, i) => (
                                <Link href={`/search/${tag.title}`} key={i}>
                                    <p className=" cursor-pointer hover:scale-110 transition-all duration-200">
                                        #{tag.title}
                                    </p>
                                </Link>
                            ))}
                        </div>
                        <p
                            className={`${
                                mode == "dark"
                                    ? "text-gray-300"
                                    : "text-gray-700"
                            }`}
                        >
                            {post.readTime} minutes
                        </p>
                    </div>
                    <Link
                        href={`/post/${post._id}`}
                        className=" cursor-pointer"
                    >
                        <h5
                            className={`${
                                mode == "dark" ? "text-white" : "text-black"
                            } mt-4 text-3xl font-bold mb-2`}
                        >
                            {post.title}
                        </h5>
                        <p className=" mb-4">
                            {post?.summery[0]?.children[0]?.text}
                        </p>
                    </Link>
                    <section className="flex gap-4 items-start">
                        <div className="flex gap-2 cursor-pointer">
                            <Avatar src="/person.webp" />
                            <div>
                                <p
                                    className={`${
                                        mode == "dark"
                                            ? "text-white"
                                            : "text-black"
                                    }`}
                                >
                                    {post.author.name}
                                </p>
                                <p className=" text-xs">
                                    {post.author.work}
                                </p>
                            </div>
                        </div>
                        <div className="">
                            {moment(post.updatedAt).format("ll")}
                        </div>
                    </section>
                    <div
                        className={` absolute bottom-1 right-1 flex gap-2 ${
                            mode == "dark" ? "text-white" : "text-black"
                        }`}
                    >
                        <BookmarkBtn post={post} />
                        <div className="text-black relative">
                            <Like
                                post={post}
                            />
                        </div>
                    </div>
                </article>
            )}
        </motion.div>
    );
};

export default Post;
