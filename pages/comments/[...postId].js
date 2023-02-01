import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import moment from "moment/moment";
import LikeCommentIcon from "../../utils/LikeCommentIcon";
import Smooth from "../../utils/Smooth";
import Link from "next/link";
import WestIcon from "@mui/icons-material/West";
import Head from "next/head";
import App from "next/app";
import { useGetComments } from "../../hooks/useComment";
import axios from "axios";

const Comments = ({ comments }) => {
    const router = useRouter();
    const mode = useSelector((state) => state.base.mode);

    return (
        <div>
            <Head>
                <title>TBFE - {comments?.postId?.title}</title>
                <link
                    rel="icon"
                    type="image/png"
                    href="/site-light-chopped.jpg"
                />
                link
            </Head>
            <Smooth
                className={`${
                    mode === "light"
                        ? "bg-white text-black"
                        : "bg-[#262626] text-gray-400"
                } min-h-screen flex justify-center p-10 text-xs sm:text-base`}
            >
                <div className=" w-[100%] sm:w-[80%]">
                    <div className="flex flex-col justify-center items-center text-center">
                        <p>ALL COMMENTS FOR</p>
                        <h1 className="bg-gradient-to-r from-[#ff7d69] to-blue-700 text-transparent bg-clip-text text-2xl font-bold mb-10">
                            {comments.postId.title}
                        </h1>
                        <Link
                            href={`/post/${comments.postId._id}`}
                            className={`${
                                mode == "dark" ? "text-white" : "text-black"
                            } flex gap-2 hover:gap-4 justify-center items-center self-end duration-200 transition-all text-xs`}
                        >
                            <WestIcon />
                            <p>BACK TO POST</p>
                        </Link>
                    </div>
                    {comments?.comments?.map((item, i) => (
                        <div
                            className={`${
                                mode == "dark" ? "border-white" : "border-black"
                            } border-t-[1px] mt-4`}
                            key={i}
                        >
                            <div>
                                <h5 className=" text-lg sm:text-xl md:text-2xl font-semibold">
                                    {item.name}
                                </h5>
                                <p className=" text-xs">
                                    # {moment(item.publishedAt).format("ll")}
                                </p>
                            </div>
                            <div
                                className={`${
                                    mode == "dark"
                                        ? " text-black bg-white"
                                        : " text-white bg-gray-300"
                                } mt-2  p-4 pr-20 rounded-2xl `}
                            >
                                <div className="relative">
                                    <p>{item.message}</p>
                                    <div className=" absolute -bottom-4 -right-16 flex gap-6">
                                        <LikeCommentIcon
                                            comments={comments}
                                            comment={item}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Smooth>
        </div>
    );
};

export default Comments;

export async function getServerSideProps(context) {
    const comments = await axios.get(
        `http://localhost:8000/api/v1/comments/${context.params.postId}`,
        {
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDQwMTAxYzk0MGUxZWVkMTlmMmVmMiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3NTA3ODYyMSwiZXhwIjoxNjc1NjgzNDIxfQ.m78XjAVnusQbvTUnbowBRNQOt88iGd6YmfIxFYKAZts`,
            },
        }
    );
    return {
        props: {
            comments: comments.data.data.docs,
        },
    };
}
