import React, { useState } from "react";
import { useSelector } from "react-redux";
import Post from "./Post";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";

const Posts = () => {
    let posts = useSelector((state) => state.base.posts);
    let postsCopy = [...posts];

    const [filter, setFilter] = useState("");
    const filters = ["Relevant", "Newest", "Oldest"];
    if (filter == "Newest") {
        postsCopy.sort(
            (a, b) =>
                new Date(b.updatedAt ? b.updatedAt : b.publishedAt).getTime() -
                new Date(a.updatedAt ? a.updatedAt : a.publishedAt).getTime()
        );
    } else if (filter == "Older") {
        postsCopy.sort(
            (a, b) =>
                new Date(a.updatedAt ? a.updatedAt : a.publishedAt).getTime() -
                new Date(b.updatedAt ? b.updatedAt : b.publishedAt).getTime()
        );
    }
    posts = postsCopy;

    const mode = useSelector((state) => state.base.mode);

    const [page, setPage] = useState(1);
    const lastPost = page * 4;
    const firstPost = lastPost - 3;
    const pagePosts = posts.slice(firstPost - 1, lastPost);
    let pages = [];
    for (let i = 1; i <= Math.ceil(posts.length / 4); i++) {
        pages.push(i);
    }

    return (
        <div className=" p-10 md:w-[70%] flex flex-col justify-center items-center gap-2 md:gap-10">
            <div>
                <h3 className=" text-3xl text-center mb-10 bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent font-bold">
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
            <div className="grid lg:grid-cols-2 gap-10">
                {pagePosts.map((post, i) => (
                    <Post key={i} post={post} />
                ))}
            </div>
            <div className="flex gap-2 mt-6 md:mt-0">
                <WestIcon
                    className=" cursor-pointer hover:-translate-x-2 transition-all duration-200"
                    onClick={() => {
                        if (page > 1) {
                            setPage((cur) => cur - 1);
                        } else {
                            setPage(pages.length);
                        }
                    }}
                />
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
                        } hover:scale-110 active:scale-100 transition-all duration-200 w-6 h-6 flex justify-center items-center rounded-sm cursor-pointer border`}
                        onClick={() => {
                            setPage(item);
                        }}
                    >
                        {item}
                    </div>
                ))}
                <EastIcon
                    className=" cursor-pointer hover:translate-x-2 transition-all duration-200"
                    onClick={() => {
                        if (page < pages.length) {
                            setPage((cur) => cur + 1);
                        } else {
                            setPage(1);
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default Posts;
