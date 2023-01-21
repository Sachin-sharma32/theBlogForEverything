import { Avatar, Tooltip } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment/moment";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import Like from "../utils/LikeIcon";
import BookmarkBtn from "../utils/BookmarkBtn";

const TopCard = ({ num, post }) => {
    const mode = useSelector((state) => state.base.mode);
    return (
        <section
            className={` relative p-4 md:hover:rotate-[5deg] flex justify-center items-start min-w-[200px] md:min-w-[300px] h-80 shadow-xl  rounded-md border-gray-500 border md:border-transparent top-card ${
                num != 0 && " md:-ml-[100px]"
            } ${mode == "light" ? " bg-white" : "bg-[#262626] shadow-black"}`}
        >
            <Link
                href={`/post/${post._id}`}
                className="h-full flex flex-col justify-between"
            >
                <div>
                    <p>{moment(post.updatedAt).format("ll")}</p>
                    <h5
                        className={`${
                            mode == "light" ? "text-black" : "text-white"
                        } text-xl`}
                    >
                        {post.title}
                    </h5>
                    <div className=" text-orange-500 flex gap-4">
                        {post.tags.map((item, i) => (
                            <div key={i}>
                                <p>#{item.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className=" flex gap-4">
                    <Avatar src="/person.webp" />
                    <div>
                    <p>{post.author.name}</p>
                        <p className=" text-xs">{post.author.work}</p>
                    </div>
                </div>
            </Link>
            <div
                className={` absolute bottom-2 right-2 md:flex gap-2 hidden ${
                    mode == "dark" ? "text-white" : "text-black"
                }`}
            >
                <BookmarkBtn post={post} />
                <Like post={post} />
            </div>
    </section>
    );
};

export default TopCard;
