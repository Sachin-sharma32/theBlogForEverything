import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Post from "../../components/Post";
import Smooth from "../../utils/Smooth";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import Head from "next/head";
import Social from "../../utils/Socials";

const Search = () => {
    const router = useRouter();
    const { search } = router.query;
    const mode = useSelector((state) => state.base.mode);
    const posts = useSelector((state) => state.base.posts);
    let filterPosts = posts.filter((post) => {
        if (post.title && post.tags && post.category) {
            return (
                post.title.toLowerCase().includes(search.toLowerCase()) ||
                post.tags.find((item) => {
                    return item.title.toLowerCase() == search.toLowerCase();
                }) ||
                post.category.title.toLowerCase().includes(search.toLowerCase())
            );
        }
    });

    const [filter, setFilter] = useState("Newest");
    const filters = ["Newest", "Oldest"];
    if (filter == "Newest") {
        filterPosts.sort(
            (a, b) =>
                new Date(b.updatedAt ? b.updatedAt : b.publishedAt).getTime() -
                new Date(a.updatedAt ? a.updatedAt : a.publishedAt).getTime()
        );
    } else if (filter == "Oldest") {
        filterPosts.sort(
            (a, b) =>
                new Date(a.updatedAt ? a.updatedAt : a.publishedAt).getTime() -
                new Date(b.updatedAt ? b.updatedAt : b.publishedAt).getTime()
        );
    }
    const postDates = filterPosts.map((post) => {
        return post.updatedAt
            ? new Date(post.updatedAt).getTime()
            : new Date(post.publishedAt).getTime();
    });

    const [page, setPage] = useState(1);
    const lastPost = page * 9;
    const firstPost = lastPost - 8;
    const pagePosts = filterPosts.slice(firstPost - 1, lastPost);
    let pages = [];
    for (let i = 1; i <= Math.ceil(filterPosts.length / 9); i++) {
        pages.push(i);
    }

    return (
        <>
            <Head>
                <title>TBFE - {search}</title>
                <link
                    rel="icon"
                    type="image/png"
                    href="/site-light-chopped.jpg"
                />
                <meta
                    name="description"
                    content='  A comprehensive blogging platform that provides readers with
                    a wide range of information on a variety of topics. From the
                    latest news and current events, to lifestyle and personal
                    development, the platform aims to be a one-stop-shop for all
                    things related to blogging. Whether you&apos;re looking to
                    stay informed, learn something new, or simply be
                    entertained, "The Blog for Everything" has
                    something for everyone.'
                />
                <meta name="keywords" content="blog" />
                <meta property="og:title" content={`TBFE - ${search}`} />
                <meta
                    property="og:description"
                    content=" A comprehensive blogging platform that provides readers with
                    a wide range of information on a variety of topics. From the
                    latest news and current events, to lifestyle and personal
                    development, the platform aims to be a one-stop-shop for all
                    things related to blogging. Whether you're looking to
                    stay informed, learn something new, or simply be
                    entertained, 'The Blog for Everything' has
                    something for everyone."
                />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="TheBlogForEverything" />
                <meta property="og:image" content="/site-light-chopped.jpg" />
                <meta
                    property="og:url"
                    content={`https://theblogforeverything.com/search/${search}`}
                />
                <meta property="twitter:card" content="summary_large_image" />
                <meta
                    property="twitter:site"
                    content="TBFE - The Blog For Everything"
                />
                <meta property="twitter:title" content={`TBFE - ${search}`} />
                <meta
                    property="twitter:description"
                    content="A comprehensive blogging platform that provides readers with
                    a wide range of information on a variety of topics. From the
                    latest news and current events, to lifestyle and personal
                    development, the platform aims to be a one-stop-shop for all
                    things related to blogging. Whether you're looking to
                    stay informed, learn something new, or simply be
                    entertained, 'The Blog for Everything' has
                    something for everyone."
                />
                <meta
                    property="twitter:image:src"
                    content="/site-light-chopped.jpg"
                />
                <meta
                    property="og:url"
                    content={`https://theblogforeverything.com/search/${search}`}
                />
            </Head>
            <Smooth
                className={`${
                    mode == "light" ? "bg-white" : ""
                } p-10 flex flex-col justify-center items-center text-sm text-gray-500 min-h-screen`}
            >
                <div>
                    {filterPosts.length > 0 ? (
                        <h3 className=" flex flex-col sm:flex-none text-xl sm:text-3xl text-center mb-10 font-bold">
                            SHOWING RESULTS FOR{" "}
                            <span className=" bg-gradient-to-r from-[#ff7d69] to-blue-700 bg-clip-text text-transparent">
                                {search?.toUpperCase()}
                            </span>
                        </h3>
                    ) : (
                        <div
                            className={`${mode == "light" ? "text-black" : ""}`}
                        >
                            <h3
                                className={`${
                                    mode == "dark"
                                        ? "text-white"
                                        : "text-[#262626]"
                                }  flex flex-col justify-center items-center text-3xl text-center mb-10 font-bold`}
                            >
                                <span>NOT RESULT FOUND FOR</span>
                                <span className=" text-red-500">
                                    {search?.toUpperCase()}
                                </span>
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
                {filterPosts.length > 0 && (
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
                {filterPosts.length > 0 && (
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
