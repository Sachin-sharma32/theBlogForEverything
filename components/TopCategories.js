import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Link from "next/link";

const TopCategories = () => {
    const mode = useSelector((state) => state.base.mode);
    const posts = useSelector((state) => state.base.posts);
    let recommended = new Set();
    posts.forEach((post) => {
        if (post.category[0].recommended) {
            recommended.add(post.category[0].title);
        }
        post.tag.map((item) => {
            if (item.recommended) {
                recommended.add(item.title);
            }
        });
    });
    recommended = Array.from(recommended);

    //? css -> "contain: paint" alternative of overflow-x-hidden, coz overflow-hidden doesn't allow sticky

    return (
        <div
            className={`${
                mode == "dark"
                    ? "bg-[#262626] shadow-2xl shadow-black"
                    : "bg-white shadow-2xl"
            } top-categories-box duration-500 gap-4 md:w-[50%] lg:w-[30%] mb-20  mt-28 justify-center items-center flex h-fit mx-6 flex-col p-10 md:p-4 rounded-md md:sticky top-16`}
        >
            <h4 className="font-bold text-xl bg-gradient-to-r from-pink-500 to-orange-500 text-transparent bg-clip-text">
                RECOMMENDED
            </h4>
            <div className=" flex flex-wrap gap-4 text-xs justify-center ">
                {recommended.map((item, i) => (
                    <Link href={`/search/${item}`} key={i}>
                        <div
                            key={i}
                            className={`${
                                mode == "dark"
                                    ? "bg-gray-200 text-black"
                                    : "bg-gray-800 text-white"
                            } hover:scale-110 active:scale-100 translate-all duration-200 px-4 rounded-md cursor-pointer h-6 items-center flex`}
                        >
                            {item}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default TopCategories;
