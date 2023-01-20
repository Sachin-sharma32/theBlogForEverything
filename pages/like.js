import React from "react";
import { useSelector } from "react-redux";
import Post from "../components/Post";
import Smooth from "../utils/Smooth";

const bookmark = () => {
    const mode = useSelector((state) => state.base.mode);
    const liked = useSelector((state) => state.base.likes);
    return (
        <Smooth
            className={`${
                mode == "light" ? "bg-white" : ""
            } p-10 flex flex-col justify-center items-center text-sm text-gray-500 min-h-screen`}
        >
            <div>
                <h3 className=" text-3xl text-center mb-10 bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent font-bold">
                    LIKED BY ME
                </h3>
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">
                {liked?.map((post, i) => (
                    <Post key={i} post={post} />
                ))}
            </div>
        </Smooth>
    );
};

export default bookmark;
