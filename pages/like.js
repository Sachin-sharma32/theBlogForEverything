import Head from "next/head";
import React from "react";
import { useSelector } from "react-redux";
import Post from "../components/Post";
import { useUserLikes } from "../hooks/useLike";
import { useGetMe } from "../hooks/useUser";
import ErrorBoundry from "../utils/ErrorBoundry";
import Smooth from "../utils/Smooth";

const Like = () => {
    const mode = useSelector((state) => state.base.mode);
    const { data: user } = useGetMe();
    const { data: likes } = useUserLikes(user?._id);
    console.log(likes);
    return (
        <>
            <Head>
                <title>TBFE - Liked Posts</title>
                <link
                    rel="icon"
                    type="image/png"
                    href="/site-light-chopped.jpg"
                />
            </Head>
            <Smooth
                className={`${
                    mode == "light" ? "bg-white" : ""
                } p-10 flex flex-col items-center text-sm text-gray-500 min-h-screen relative`}
            >
                <div>
                    <h3 className=" text-3xl text-center mb-10 bg-gradient-to-r from-[#ff7d69] to-blue-700 bg-clip-text text-transparent font-bold">
                        LIKED BY ME
                    </h3>
                </div>

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">
                    {likes?.map((post, i) => (
                        <ErrorBoundry key={i}>
                            <Post post={post._id} />
                        </ErrorBoundry>
                    ))}
                </div>
                {likes?.length === 0 && (
                    <div className="bg-red-500 text-black p-4 absolute top-32 font-bold">
                        NO LIKES TO SHOW
                    </div>
                )}
            </Smooth>
        </>
    );
};

export default Like;
