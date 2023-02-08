import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Post from "./Post";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import ErrorBoundry from "../utils/ErrorBoundry";
import { motion } from "framer-motion";
import { useMemo } from "react";

const Posts = () => {
    let posts = useSelector((state) => state.base.posts);
    let user = useSelector((state) => state.base.user);
    console.log(posts);
    let postsCopy = [...posts];
    const containerRef = useRef(null);

    const [filter, setFilter] = useState("Newest");
    let filters;
    if (user?.preferences) {
        filters = ["Preferred", "Newest", "Oldest"];
    }else{
        filters = ["Newest","Oldest"]
    }
    if (filter == "Newest") {
        postsCopy.sort(
            (a, b) =>
                new Date(b.updatedAt ? b.updatedAt : b.publishedAt).getTime() -
                new Date(a.updatedAt ? a.updatedAt : a.publishedAt).getTime()
        );
    } else if (filter == "Oldest") {
        postsCopy.sort(
            (a, b) =>
                new Date(a.updatedAt ? a.updatedAt : a.publishedAt).getTime() -
                new Date(b.updatedAt ? b.updatedAt : b.publishedAt).getTime()
        );
    } else {
        postsCopy.filter((post) => {
            return user?.preferences?.find(
                (pref) => pref._id == post?.category?._id
            );
        });
    }
    posts = postsCopy;

    const mode = useSelector((state) => state.base.mode);

    const [page, setPage] = useState(1);
    const lastPost = page * 12;
    const firstPost = lastPost - 11;
    let pages = [];
    const pagePosts = useMemo(
        () => posts.slice(firstPost - 1, lastPost),
        [page, posts]
    );

    for (let i = 1; i <= Math.ceil(posts.length / 12); i++) {
        pages.push(i);
    }

    return (
        <section className=" p-10 md:w-[100%] flex flex-col justify-center items-center gap-2 md:gap-10">
            <div>
                <h3
                    ref={containerRef}
                    className=" text-3xl text-center mb-10 bg-gradient-to-r from-[#ff7d69] to-blue-700 bg-clip-text text-transparent font-bold"
                >
                    FEATURED POSTS
                </h3>
                <div className="flex gap-4 mb-4 justify-center">
                    {filters.map((item, i) => (
                        <p
                            key={i}
                            className={`${
                                filter == item
                                    ? "border-b border-orange-500"
                                    : ""
                            }   cursor-pointer ${
                                mode == "dark"
                                    ? "text-gray-200"
                                    : "text-gray-800"
                            }`}
                            onClick={() => {
                                setFilter(item);
                            }}
                        >
                            {item}
                        </p>
                    ))}
                </div>
            </div>
            <motion.div
                layout
                // className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10"
                className="columns-1 md:columns-2 lg:columns-3 2xl:columns-4 gap-4"
            >
                {pagePosts.map((post, i) => (
                    <ErrorBoundry key={i}>
                        <Post post={post} />
                    </ErrorBoundry>
                ))}
            </motion.div>
            <div className="flex gap-2 mt-6 md:mt-0">
                <a className=" cursor-pointer hover:-translate-x-2 transition-all duration-200">
                    <WestIcon
                        onClick={() => {
                            containerRef.current.scrollIntoView({
                                behavior: "smooth",
                            });
                            if (page > 1) {
                                setPage((cur) => cur - 1);
                            } else {
                                setPage(pages.length);
                            }
                        }}
                    />
                </a>
                {pages.map((item, i) => (
                    <div
                        key={i}
                        className={`${
                            page == item && mode == "dark"
                                ? "bg-white text-black"
                                : ""
                        } ${
                            page == item && mode == "light"
                                ? "bg-black text-white"
                                : ""
                        } ${
                            mode == "dark"
                                ? "border-white text-white"
                                : "border-black"
                        } hover:scale-110 active:scale-100 transition-all duration-200 w-6 h-6 flex justify-center items-center cursor-pointer border- rounded-full`}
                        onClick={() => {
                            containerRef.current.scrollIntoView({
                                behavior: "smooth",
                            });
                            setPage(item);
                        }}
                    >
                        {item}
                    </div>
                ))}
                <a className=" cursor-pointer hover:translate-x-2 transition-all duration-200">
                    <EastIcon
                        onClick={() => {
                            containerRef.current.scrollIntoView({
                                behavior: "smooth",
                            });
                            if (page < pages.length) {
                                setPage((cur) => cur + 1);
                            } else {
                                setPage(1);
                            }
                        }}
                    />
                </a>
            </div>
        </section>
    );
};

export default React.memo(Posts);
