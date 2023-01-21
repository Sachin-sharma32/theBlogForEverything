import React from "react";
import { useSelector } from "react-redux";
import TopCard from "./TopCard";

const TopPosts = () => {
    const posts = useSelector((state) => state.base.posts);
    const topPosts = posts.filter((post) => {
        return post.topPostOfTheWeek;
    });
    return (
        <section className=" mt-10 flex justify-center flex-col p-2 md:p-10 md:gap-4">
            <h2 className="bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent text-xl font-bold text-center md:hidden">
                TOP POSTS OF THE WEEK
            </h2>
            <section className="flex overflow-x-scroll p-2 gap-4 h-96 items-center">
                <section className=" flex-col justify-end bg-gradient-to-b from-pink-500 to-orange-500 p-10 rounded-md text-white min-w-[200px] md:min-w-[300px] h-80 hidden md:flex">
                    <h3>TOP POSTS OF THE WEEK</h3>
                    <h4 className=" text-xs text-gray-200">Sachin Sharma</h4>
                </section>
                <section className="flex gap-4 md:gap-2">
                    {topPosts.map((post, i) => (
                        <TopCard key={i} num={i} post={post} />
                    ))}
                </section>
            </section>
        </section>
    );
};

export default TopPosts;
