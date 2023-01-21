import { Avatar, Tooltip } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useSelector } from "react-redux";
import Link from "next/link";
import moment from "moment/moment";
import { NumberInput } from "sanity";
import { motion } from "framer-motion";
import Like from "../utils/LikeIcon";
import BookmarkBtn from "../utils/BookmarkBtn";

const Post = ({ post }) => {
    const [postDetails, setPostDetails] = useState(post);
    const mode = useSelector((state) => state.base.mode);
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ y: [100, 0], opacity: 1 }}
            transition={{
                x: { duration: 3 },
                default: { ease: "linear" },
            }}
            className={`${
                mode == "light"
                    ? "bg-white shadow-2xl"
                    : "bg-[#262626] shadow-black shadow-2xl"
            } h-[500px] w-[350px] rounded-sm overflow-hidden relative`}
        >
            <Image src="/post-img.webp" width="400" height="10" alt="post" />
            {postDetails && (
                <div className=" p-4">
                    <div className="flex items-center justify-between">
                        <div className=" text-orange-500 flex gap-4">
                            {postDetails?.tag?.map((tag, i) => (
                                <Link href={`/search/${tag.title}`} key={i}>
                                    <p className=" cursor-pointer hover:scale-110 transition-all duration-200">
                                        #{tag.title}
                                    </p>
                                </Link>
                            ))}
                        </div>
                        <p
                            className={`${
                                mode == "dark"
                                    ? "text-gray-300"
                                    : "text-gray-700"
                            }`}
                        >
                            {postDetails.readTime} minutes
                        </p>
                    </div>
                    <Link
                        href={`/post/${postDetails._id}`}
                        className=" cursor-pointer"
                    >
                        <h5
                            className={`${
                                mode == "dark" ? "text-white" : "text-black"
                            } mt-4 text-3xl font-bold mb-2`}
                        >
                            {postDetails.title}
                        </h5>
                        <p className=" mb-4">
                            {postDetails?.summery[0]?.children[0]?.text}
                        </p>
                    </Link>
                    <div className="flex gap-4 items-start">
                        <div className="flex gap-2 cursor-pointer">
                            <Avatar src="/person.webp" />
                            <div>
                                <p
                                    className={`${
                                        mode == "dark"
                                            ? "text-white"
                                            : "text-black"
                                    }`}
                                >
                                    {postDetails.author[0].name}
                                </p>
                                <p className=" text-xs">
                                    {postDetails.author[0].work}
                                </p>
                            </div>
                        </div>
                        <div className="">
                            {moment(postDetails.updatedAt).format("ll")}
                        </div>
                    </div>
                    <div
                        className={` absolute bottom-1 right-1 flex gap-2 ${
                            mode == "dark" ? "text-white" : "text-black"
                        }`}
                    >
                        <BookmarkBtn post={post} />
                        <div className="text-black relative">
                            <Like
                                post={post}
                                setPostDetails={setPostDetails}
                                postDetails={postDetails}
                            />
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default Post;
