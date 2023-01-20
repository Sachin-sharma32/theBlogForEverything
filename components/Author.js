import { Avatar } from "@mui/material";
import React from "react";
import EmailIcon from "@mui/icons-material/Email";
import { useSelector } from "react-redux";

const Author = ({ author }) => {
    const mode = useSelector((state) => state.base.mode);
    return (
        <div
            className={`${
                mode == "dark"
                    ? "text-white bg-[#262626]"
                    : "text-gray-800 bg-white"
            } p-4 shadow-2xl`}
        >
            <div className="flex gap-2 items-center">
                <Avatar src="/person.webp" />
                <p className=" font-semibold">{author.name}</p>
            </div>
            <p className=" text-xs mt-2">{author.bio[0].children[0].text}</p>
            <div className=" mt-4">
                <p className=" font-semibold">LOCATION</p>
                <p className=" text-xs">{author.location}</p>
            </div>
            <div className=" mt-4">
                <p className=" font-semibold">EDUCATION</p>
                <p className=" text-xs">{author.location}</p>
            </div>
            <div className=" mt-4">
                <p className=" font-semibold">WORK</p>
                <p className=" text-xs">{author.work}</p>
            </div>
            <div
                className={`${
                    mode == "dark"
                        ? "bg-white text-black"
                        : "bg-black text-white"
                }   active:scale-95
                transition-all
                mail-btn
                duration-3000
                cursor-pointer
                h-8
                flex-col
                w-full
                p-2
                justify-center
                rounded-md
                flex
                gap-2
                items-center
                mt-6`}
            >
                <div className=" mail-title flex gap-2 items-center translate-y-4 transition-all duration-200">
                    <EmailIcon />
                    <p>Contact</p>
                </div>
                <div className=" mail-address translate-y-10 flex gap-2 items-center transition-all duration-200">
                    <EmailIcon />
                    <a href="mailto:sachin2sharma001@gmail.com">
                        {author.email}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Author;
