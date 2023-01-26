// import React from "react";
// import { useSelector } from "react-redux";
// import Link from "next/link";
// import ErrorBoundry from "../utils/ErrorBoundry";

// const TopCategories = () => {
//     const mode = useSelector((state) => state.base.mode);
//     const posts = useSelector((state) => state.base.posts);
//     let recommended = new Set();
//     posts.forEach((post) => {
//         if (post?.category?.recommended) {
//             recommended.add(post.category.title);
//         }
//         post?.tags?.map((item) => {
//             if (item.recommended) {
//                 recommended.add(item.title);
//             }
//         });
//     });
//     recommended = Array.from(recommended);

//     //? css -> "contain: paint" alternative of overflow-x-hidden, coz overflow-hidden doesn't allow sticky

//     return (
//         <section
//             className={`${
//                 mode == "dark"
//                     ? "bg-[#262626] shadow-2xl shadow-black"
//                     : "bg-white shadow-2xl"
//             } top-categories-box duration-500 gap-4 md:w-[50%] lg:w-[30%] mb-20  mt-28 justify-center items-center flex h-fit mx-6 flex-col p-10 md:p-4 rounded-md md:sticky top-16`}
//         >
//             <h4 className="font-bold text-xl bg-gradient-to-r from-[#ff7d69] to-blue-700 text-transparent bg-clip-text">
//                 RECOMMENDED
//             </h4>
//             <div className=" flex flex-wrap gap-4 text-xs justify-center ">
//                 {recommended?.map((item, i) => (
//                     <ErrorBoundry key={i}>
//                         <Link href={`/search/${item}`}>
//                             <div
//                                 key={i}
//                                 className={`${
//                                     mode == "dark"
//                                         ? "bg-gray-200 text-black"
//                                         : "bg-gray-800 text-white"
//                                 } hover:scale-110 active:scale-100 translate-all duration-200 px-4 rounded-md cursor-pointer h-6 items-center flex`}
//                             >
//                                 {item}
//                             </div>
//                         </Link>
//                     </ErrorBoundry>
//                 ))}
//             </div>
//         </section>
//     );
// };

// export default TopCategories;

import { Alert } from "@mui/material";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import TopCard from "./TopCard";
import TopCategory from "./TopCategory";

const TopCategories = () => {
    const categories = useSelector((state) => state.base.categories);
    return (
        <div className=" mt-10 flex justify-center flex-col p-2 md:p-10 md:gap-4 relative">
            <h2 className="bg-gradient-to-r from-[#ff7d69] to-blue-700 bg-clip-text text-transparent text-xl font-bold text-center md:hidden">
                TOP CATEGORIES
            </h2>
            <section className="flex overflow-x-scroll p-2 gap-4 h-96 items-center">
                <section className=" flex-col justify-end bg-gradient-to-b from-[#ff7d69] to-blue-700 p-10 rounded-md text-white min-w-[200px] md:min-w-[300px] h-80 hidden md:flex">
                    <h3>TOP CATEGORIES</h3>
                    <h4 className=" text-xs text-gray-200">Sachin Sharma</h4>
                </section>
                <section className="flex gap-4 md:gap-2">
                    {categories.map(
                        (category, i) =>
                            category.title &&
                            category.image && (
                                <TopCategory
                                    key={i}
                                    num={i}
                                    category={category}
                                />
                            )
                    )}
                </section>
            </section>
        </div>
    );
};

export default TopCategories;
