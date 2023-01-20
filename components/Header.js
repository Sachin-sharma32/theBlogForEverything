import React, { useState } from "react";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import { imageBuilder } from "../sanity";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useAddToBookmark } from "../hooks/content";
import BookmarkBtn from "../utils/BookmarkBtn";

const Header = () => {
    const router = useRouter();
    const session = useSelector((state) => state.base.session);
    const mode = useSelector((state) => state.base.mode);
    const posts = useSelector((state) => state.base.posts);
    let post = posts?.filter((item) => {
        return item.bestPost;
    });
    post = post[0];
    const [postDetails, setPostDetails] = useState(post);

    return (
        <div className="flex justify-center items-center mt-0 pt-8 ">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ y: [100, 0], opacity: 1 }}
                transition={{ duration: 1 }}
                className={` ${
                    mode == "light" ? "md:header-card-light header-card-light-sm" : "md:header-card-dark header-card-dark-sm"
                } bg-white w-[80vw] h-[80vh] flex justify-end items-center shadow-2xl rounded-sm cursor-pointer"`}
            >
                {post && (
                    <Link href={`/post/${post._id}`}>
                        <div className=" w-80 flex flex-col gap-10 mr-10 cursor-pointer">
                            <h1 className=" text-3xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 text-transparent bg-clip-text">
                                {post.title}
                            </h1>
                            <p
                                className={`${
                                    mode == "light"
                                        ? "text-black"
                                        : "text-white"
                                }`}
                            >
                                {post.summery[0].children[0].text}
                            </p>
                            <div className="flex gap-4 items-center">
                                <Avatar
                                    src={imageBuilder(post.author[0].image)}
                                    className=" w-14 h-14"
                                />
                                <div>
                                    <p
                                        className={`${
                                            mode == "light"
                                                ? "text-black"
                                                : "text-white"
                                        }`}
                                    >
                                        {post.author[0].name}
                                    </p>
                                    <p className=" text-xs">
                                        {post.author[0].work}
                                    </p>
                                </div>
                            </div>
                            <div
                                className={`${
                                    mode == "light"
                                        ? "text-black"
                                        : "text-white"
                                } flex justify-end gap-4 text-lg`}
                            >
                                <BookmarkBtn post={post} />
                            </div>
                        </div>
                    </Link>
                )}
            </motion.div>
        </div>
    );
};

export default Header;
