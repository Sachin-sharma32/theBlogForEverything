import React from "react";
import { useSelector } from "react-redux";
import Post from "../components/Post";
import Smooth from "../utils/Smooth";

const Like = () => {
    const mode = useSelector((state) => state.base.mode);
    const liked = useSelector((state) => state.base.likes);
    return (
        <Smooth
            className={`${
                mode == "light" ? "bg-white" : ""
            } p-10 flex flex-col items-center text-sm text-gray-500 min-h-screen relative`}
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
            {liked?.length === 0 && (
                <div className="bg-red-500 text-black p-4 absolute top-32 font-bold">
                    NO LIKES TO SHOW
                </div>
            )}
        </Smooth>
    );
};

export default Like;
