import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Post from "./Post";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import ErrorBoundry from "../utils/ErrorBoundry";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { useTotalDocuments } from "../hooks/usePost";
import axios from "axios";
import { useQuery } from "react-query";

const Posts = () => {
    const mode = useSelector((state) => state.base.mode);
    const { data: total } = useTotalDocuments();
    const [pages, setPages] = useState([1]);

    const [filter, setFilter] = useState({});
    const filters = [
        { title: "Newest", value: "createdAt" },
        { title: "Older", value: "-createdAt" },
    ];
    const [page, setPage] = useState(1);
    console.log(page);
    const { data: posts } = useQuery(
        ["posts", page, filter],
        () => {
            console.log(filter);
            return axios.get(
                `http://localhost:8000/api/v1/posts?page=${page}&limit=12&sort=${filter}`
            );
        },
        {
            select: (data) => {
                const posts = data.data.data.docs;
                return posts;
            },
        }
    );

    const containerRef = useRef();

    useEffect(() => {
        if (total > 0) {
            const postPages = [];
            for (let i = 1; i <= Math.ceil(total / 12); i++) {
                postPages.push(i);
            }
            setPages(postPages);
        }
    }, [total]);

    return (
        <section
            className=" p-10 md:w-[100%] flex flex-col justify-center items-center gap-2 md:gap-10"
            ref={containerRef}
        >
            <div>
                <h3 className=" text-3xl text-center mb-10 bg-gradient-to-r from-[#ff7d69] to-blue-700 bg-clip-text text-transparent font-bold">
                    FEATURED POSTS
                </h3>
                <div className="flex gap-4 mb-4 justify-center">
                    {filters.map((item, i) => (
                        <p
                            key={i}
                            className={`${
                                filter == item.value
                                    ? "border-b border-orange-500"
                                    : ""
                            }   cursor-pointer ${
                                mode == "dark"
                                    ? "text-gray-200"
                                    : "text-gray-800"
                            }`}
                            onClick={() => {
                                setFilter(item.value);
                            }}
                        >
                            {item.title}
                        </p>
                    ))}
                </div>
            </div>
            <motion.div
                layout
                className="columns-1 md:columns-2 xl:columns-3 gap-10"
            >
                {posts?.map((post, i) => (
                    <ErrorBoundry key={i}>
                        <Post post={post} />
                    </ErrorBoundry>
                ))}
            </motion.div>
            <div className="flex gap-2 mt-6 md:mt-0">
                <a className=" cursor-pointer hover:-translate-x-2 transition-all duration-200">
                    <WestIcon
                        onClick={() => {
                            if (page > 1) {
                                setPage((cur) => cur - 1);
                                containerRef.current.scrollIntoView({
                                    behavior: "smooth",
                                });
                            } else {
                                setPage(pages.length);
                                containerRef.current.scrollIntoView({
                                    behavior: "smooth",
                                });
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
                            setPage(item);
                            containerRef.current.scrollIntoView({
                                behavior: "smooth",
                            });
                        }}
                    >
                        {item}
                    </div>
                ))}
                <a className=" cursor-pointer hover:translate-x-2 transition-all duration-200">
                    <EastIcon
                        onClick={() => {
                            if (page < pages.length) {
                                setPage((cur) => cur + 1);
                                containerRef.current.scrollIntoView({
                                    behavior: "smooth",
                                });
                            } else {
                                setPage(1);
                                containerRef.current.scrollIntoView({
                                    behavior: "smooth",
                                });
                            }
                        }}
                    />
                </a>
            </div>
        </section>
    );
};

export default React.memo(Posts);
