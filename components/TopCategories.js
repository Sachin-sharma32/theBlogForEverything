import { ErrorBoundary } from "@sanity/ui";
import Link from "next/link";
import React from "react";
import TopCategory from "./TopCategory";
import { useGetCategories } from "../hooks/useCategory";

const TopCategories = () => {
    const { data: categories } = useGetCategories();
    return (
        <div className=" mt-10 flex justify-center flex-col p-2 md:p-10 md:gap-4 relative">
            <h2 className=" bg-gradient-to-r from-[#ff7d69] to-blue-700 bg-clip-text text-transparent text-xl font-bold text-center md:hidden">
                TOP CATEGORIES
            </h2>
            <section className="flex overflow-x-scroll p-2 gap-4 h-96 items-center">
                <section className="card flex-col justify-center font-extrabold p-10 rounded-2xl text-white min-w-[200px] md:min-w-[300px] h-80 hidden md:flex">
                    <div className="bg-gradient-to-b card__side card__side--front rounded-2xl flex justify-center items-center from-[#ff7d69] to-blue-700 h-full w-full">
                        <h3 className="text-2xl ">TOP CATEGORIES</h3>
                    </div>
                    <div className="bg-gradient-to-b card__side card__side--back rounded-2xl flex justify-center items-center from-[#ff7d69] to-blue-700 h-full w-full">
                        <Link href="/search" className="text-2xl ">
                            ALL POSTS
                        </Link>
                    </div>
                </section>
                <section className="flex gap-4 md:gap-2">
                    {categories?.map((category, i) => (
                        <ErrorBoundary key={i}>
                            <TopCategory num={i} category={category} />
                        </ErrorBoundary>
                    ))}
                </section>
            </section>
        </div>
    );
};

// export default React.memo(TopCategories);
export default TopCategories;
