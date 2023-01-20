import { Avatar } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const RelatedPosts = ({ post }) => {
    const mode = useSelector((state) => state.base.mode);
    const posts = useSelector((state) => state.base.posts);
    const relatedPosts = posts
        .filter((item) => {
            return (
                item.category[0]._id == post.category[0]._id &&
                item._id != post._id
            );
        })
        .splice(0, 2);
    return (
        <div
            className={`${
                mode == "dark"
                    ? "bg-[#262626] text-white"
                    : " bg-white text-gray-800"
            }  p-8
            flex
            flex-col
            justify-center
            items-center shadow-xl`}
        >
            <h4 className=" text-xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 text-transparent bg-clip-text">
                RELATED POSTS
            </h4>
            <div className=" mt-4 flex flex-col gap-4">
                {relatedPosts.map((post, i) => (
                    <Link href={`/post/${post._id}`} key={i}>
                        <div className=" border-b-2 pb-2">
                            <div className="flex items-center gap-2 cursor-pointer">
                                <Avatar src="/person.webp" />
                                <p className=" text-xs font-semibold">
                                    {post.author[0].name}
                                </p>
                            </div>
                            <div className="text-xs text-orange-500 flex gap-2 mt-2">
                                {post.tag.map((item, i) => (
                                    <div key={i}>
                                        <p>#{item.title}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="font-semibold cursor-pointer text-lg lg:text-xl">
                                {post.title}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default RelatedPosts;
