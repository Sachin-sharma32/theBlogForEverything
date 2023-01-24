import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Post from "../../components/Post";
import Smooth from "../../utils/Smooth";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import Head from "next/head";

const Search = () => {
    const mode = useSelector((state) => state.base.mode);
    const posts = useSelector((state) => state.base.posts);

    const [filter, setFilter] = useState("");
    const filters = ["Newest", "Oldest"];
    let filterPosts = [...posts];
    if (filter == "Newest") {
        filterPosts.sort(
            (a, b) =>
                new Date(b.updatedAt ? b.updatedAt : b.publishedAt).getTime() -
                new Date(a.updatedAt ? a.updatedAt : a.publishedAt).getTime()
        );
    } else if (filter == "Older") {
        filterPosts.sort(
            (a, b) =>
                new Date(a.updatedAt ? a.updatedAt : a.publishedAt).getTime() -
                new Date(b.updatedAt ? b.updatedAt : b.publishedAt).getTime()
        );
    }
    const selectedPosts = posts;

    const [page, setPage] = useState(1);
    const lastPost = page * 9;
    const firstPost = lastPost - 8;
    const pagePosts = selectedPosts.slice(firstPost - 1, lastPost);
    let pages = [];
    for (let i = 1; i <= Math.ceil(selectedPosts.length / 9); i++) {
        pages.push(i);
    }

    return (
        <>
            <Head>
                <title>TBFE - All posts</title>
                <link
                    rel="icon"
                    type="image/png"
                    href="/site-light-chopped.jpg"
                />
            </Head>
            <Smooth
                className={`${
                    mode == "light" ? "bg-white" : ""
                } p-10 flex flex-col justify-center items-center text-sm text-gray-500 min-h-screen`}
            >
                <div>
                    {selectedPosts.length > 0 ? (
                        <h3 className=" flex flex-col sm:flex-none text-xl sm:text-3xl text-center mb-10 font-bold">
                            <span className=" bg-gradient-to-r from-[#ff7d69] to-blue-700 bg-clip-text text-transparent">
                                ALL POSTS
                            </span>
                        </h3>
                    ) : (
                        <div
                            className={`${mode == "light" ? "text-black" : ""}`}
                        >
                            <h3 className=" text-3xl text-center mb-10 font-bold text-red-500">
                                NO POSTS FOUND
                            </h3>
                            <Link href="/">
                                <div className=" text-xl flex items-center gap-2 cursor-pointer hover:gap-3 transition-all duration-200 justify-center">
                                    <WestIcon className="" />
                                    <p>Home</p>
                                </div>
                            </Link>
                        </div>
                    )}
                </div>
                {selectedPosts.length > 0 && (
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
                )}
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">
                    {pagePosts.map((post, i) => (
                        <Post key={i} post={post} />
                    ))}
                </div>
                {selectedPosts.length > 0 && (
                    <div className="flex gap-2 mt-6 md:mt-10 w-full justify-center">
                        <a className=" cursor-pointer hover:-translate-x-2 transition-all duration-200">
                            <WestIcon
                                onClick={() => {
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
                                } hover:scale-110 active:scale-100 transition-all duration-200 w-6 h-6 flex justify-center items-center rounded-sm cursor-pointer border`}
                                onClick={() => {
                                    setPage(item);
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
                                    } else {
                                        setPage(1);
                                    }
                                }}
                            />
                        </a>
                    </div>
                )}
            </Smooth>
        </>
    );
};

export default Search;
