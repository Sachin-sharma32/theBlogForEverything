import React, { useEffect, useMemo, useState } from "react";
import { Alert, Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { imageBuilder } from "../sanity";
import Link from "next/link";
import { motion } from "framer-motion";
import BookmarkBtn from "../utils/BookmarkBtn";
import styled from "styled-components";

const Header = () => {
    const mode = useSelector((state) => state.base.mode);
    const posts = useSelector((state) => state.base.posts);
    const [success, setSuccess] = useState(false);
    let post = useMemo(() => {
        return posts?.filter((item) => {
            return item.bestPost;
        });
    }, [posts]);
    post = post[0];

    let StyledContainer;
    if (post && mode) {
        StyledContainer = styled.div`
            @media only screen and (max-width: 768px) {
                background-image: linear-gradient(
                        90deg,
                        ${mode === "dark"
                                ? "rgba(0, 0, 0, 0.649) 25%,"
                                : "rgba(230, 230, 230, 0.8),"}
                            ${mode === "dark"
                                ? "rgba(0, 0, 0, 0.641) 50%,"
                                : "rgba(230, 230, 230, 0.897) 50%,"}
                            ${mode === "dark"
                                ? "rgba(0, 0, 0, 0.665) 100%"
                                : "rgba(230, 230, 230, 0.831) 100%"}
                    ),
                    url(${imageBuilder(post.image)});
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
            }
            @media only screen and (min-width: 769px) {
                background-image: linear-gradient(
                        90deg,
                        ${mode === "dark"
                                ? "rgba(0, 0, 0, 0.5) 25%,"
                                : "rgba(100 , 100, 100,.6) 0%,"}
                            ${mode === "dark"
                                ? "rgba(0, 0, 0, 0.7) 50%,"
                                : "rgba(250, 250, 250) 75%,"}
                            ${mode === "dark"
                                ? "rgba(0, 0, 0) 100%"
                                : "rgba(250, 250, 250) 100%"}
                    ),
                    url(${imageBuilder(post.image)});
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
            }
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: end;
            align-items: center;
            border-radius: 40px;
            overflow: hidden;
        `;
    }

    if (post && mode) {
        return (
            <>
                <header className=" flex justify-center items-center mt-0 pt-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ x: [200, 0], opacity: 1 }}
                        transition={{ duration: 1 }}
                        className={` w-[80vw] h-[60vh] sm:h-[80vh] flex justify-end items-center shadow-2xl cursor-pointer rounded-[40px] overflow-hidden"`}
                    >
                        <StyledContainer mode={mode}>
                            {post && (
                                <section>
                                    <article className=" sm:w-80 p-4 sm:p-0 w-50 flex flex-col gap-4 sm:gap-10 mr-0 sm:mr-10 cursor-pointer">
                                        <Link
                                            href={`/post/${post._id}`}
                                            className="flex flex-col gap-4 sm:gap-10"
                                        >
                                            <h1 className=" text-3xl font-bold bg-gradient-to-r from-[#ff7d69] to-blue-700 text-transparent bg-clip-text">
                                                {post.title}
                                            </h1>
                                            <p
                                                className={`${
                                                    mode == "light"
                                                        ? "text-black"
                                                        : "text-white"
                                                }`}
                                            >
                                                {
                                                    post.summery[0].children[0]
                                                        .text
                                                }
                                            </p>
                                            <figure className="flex gap-4 items-center">
                                                <Avatar
                                                    src={imageBuilder(
                                                        post.author.image
                                                    )}
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
                                        <div
                                            className={`${
                                                mode == "light"
                                                    ? "text-black"
                                                    : "text-white"
                                            } flex justify-end gap-4 text-lg h-7`}
                                        >
                                            <BookmarkBtn
                                                post={post}
                                                setSuccess={setSuccess}
                                            />
                                        </div>
                                    </article>
                                </section>
                            )}
                        </StyledContainer>
                    </motion.div>
                    {success && (
                        <Alert security="success" className="absolute top-24">
                            <Link href="/bookmark">MY BOOKMARKS</Link>
                        </Alert>
                    )}
                </header>
            </>
        );
    } else {
        return <div className=" min-h-screen"></div>;
    }
};

export default React.memo(Header);
