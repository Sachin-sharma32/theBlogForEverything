import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import moment from "moment/moment";
import LikeCommentIcon from "../../utils/LikeCommentIcon";
import Smooth from "../../utils/Smooth";
import Link from "next/link";
import WestIcon from "@mui/icons-material/West";
import Head from "next/head";

const Comments = () => {
    const router = useRouter();
    const { postId } = router.query;
    const posts = useSelector((state) => state.base.posts);
    const mode = useSelector((state) => state.base.mode);
    const post = posts.filter((post) => {
        return post._id == postId;
    });
    console.log(post);

    return (
        <>
            <Head>
                <title>TBFE - {post[0]?.title}</title>
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
                        : "bg-[#262626] text-white"
                } min-h-screen flex justify-center p-10 text-xs sm:text-base`}
            >
                <div className=" w-[100%] sm:w-[80%]">
                    <div className="flex flex-col justify-center items-center text-center">
                        <p>ALL COMMENTS FOR</p>
                        <h1 className="bg-gradient-to-r from-pink-500 to-orange-500 text-transparent bg-clip-text text-2xl font-bold mb-10">
                            {post[0]?.title}
                        </h1>
                        <Link
                            href={`/post/${post[0]?._id}`}
                            className={`${
                                mode == "dark" ? "text-white" : "text-black"
                            } flex gap-2 hover:gap-4 justify-center items-center self-end duration-200 transition-all text-xs`}
                        >
                            <WestIcon />
                            <p>BACK TO POST</p>
                        </Link>
                    </div>
                    {post[0]?.comments?.map((item, i) => (
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
                                } mt-2  p-4 pr-20 rounded-md `}
                            >
                                <div className="relative">
                                    <p>{item.comment}</p>
                                    <div className=" absolute -bottom-4 -right-16 flex gap-6">
                                        <LikeCommentIcon comment={item} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Smooth>
        </>
    );
};

export default Comments;
