import React from "react";
import { useSelector } from "react-redux";
import Post from "../components/Post";
import { useUserPosts } from "../routers/useUser";
import { motion } from "framer-motion";
import ErrorBoundry from "../utils/ErrorBoundry";

const MyPosts = () => {
    const user = useSelector((state) => state.base.user);
    const { data: posts, isLoading } = useUserPosts(user?._id);
    if (isLoading) {
        return (
            <div className=" text-white h-screen w-screen flex justify-center items-center">
                <div>Loading....</div>
            </div>
        );
    }
    return (
        <section className=" p-10 md:w-[100%] flex flex-col justify-center items-center gap-2 md:gap-10">
            <div>
                <h3 className=" text-3xl text-center mb-10 bg-gradient-to-r from-[#ff7d69] to-blue-700 bg-clip-text text-transparent font-bold">
                    MY POSTS
                </h3>
            </div>
            <motion.div
                layout
                className="columns-1 md:columns-2 lg:columns-3 2xl:columns-4 gap-4"
            >
                {posts?.map((post, i) => (
                    <ErrorBoundry key={i}>
                        <Post post={post} />
                    </ErrorBoundry>
                ))}
            </motion.div>
        </section>
    );
};

export default MyPosts;
