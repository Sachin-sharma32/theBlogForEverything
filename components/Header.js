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
    const mode = useSelector((state) => state.base.mode);
    const posts = useSelector((state) => state.base.posts);
    let post = posts?.filter((item) => {
        return item.bestPost;
    });
    post = post[0];
    console.log(post)
    const [postDetails, setPostDetails] = useState(post);

    return (
        <header className="flex justify-center items-center mt-0 pt-8 ">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ y: [100, 0], opacity: 1 }}
                transition={{ duration: 1 }}
                className={` ${
                    mode == "light" ? "header-card-light" : "header-card-dark"
                } bg-white w-[80vw] h-[60vh] sm:h-[80vh] flex justify-end items-center shadow-2xl rounded-sm cursor-pointer"`}
            >
                {post && (
                    <section>
                        <article className=" sm:w-80 p-4 sm:p-0 w-50 flex flex-col gap-4 sm:gap-10 mr-0 sm:mr-10 cursor-pointer">
                            <Link
                                href={`/post/${post._id}`}
                                className="flex flex-col gap-4 sm:gap-10"
                            >
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
                                <figure className="flex gap-4 items-center">
                                    <Avatar
                                        src={imageBuilder(post.author.image)}
                                        className=" w-14 h-14"
                                    />
                                    <figcaption>
                                        <p
                                            className={`${
                                                mode == "light"
                                                    ? "text-black"
                                                    : "text-white"
                                            }`}
                                        >
                                            {post.author.name}
                                        </p>
                                        <p className=" text-xs">
                                            {post.author.work}
                                        </p>
                                    </figcaption>
                                </figure>
                            </Link>
                            <section
                                className={`${
                                    mode == "light"
                                        ? "text-black"
                                        : "text-white"
                                } flex justify-end gap-4 text-lg`}
                            >
                                <BookmarkBtn post={post} />
                            </section>
                        </article>
                    </section>
                )}
            </motion.div>
        </header>
    );
};

export default Header;
