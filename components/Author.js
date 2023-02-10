import { Avatar } from "@mui/material";
import React from "react";
import EmailIcon from "@mui/icons-material/Email";
import { useSelector } from "react-redux";
import { imageBuilder } from "../sanity";

const Author = ({ author }) => {
    const mode = useSelector((state) => state.base.mode);
    return (
        <section
            className={`${
                mode == "dark"
                    ? "text-white bg-[#262626]"
                    : "text-gray-800 bg-white"
            } p-4 shadow-2xl`}
        >
            <figure className="flex gap-2 items-center">
                <Avatar src={author.image} alt="user profile" />
                <figcaption className=" font-semibold">
                    {author.name}
                </figcaption>
            </figure>
            <p className=" text-xs mt-2">{author.bio}</p>
            <section className=" mt-4">
                <h4 className=" font-semibold">LOCATION</h4>
                <p className=" text-xs">{author.location}</p>
            </section>
            <section className=" mt-4">
                <h4 className=" font-semibold">EDUCATION</h4>
                <p className=" text-xs">{author.education}</p>
            </section>
            <section className=" mt-4">
                <h4 className=" font-semibold">WORK</h4>
                <p className=" text-xs">{author.work}</p>
            </section>
            <section
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
                rounded-2xl
                flex
                gap-2
                items-center
                mt-6`}
            >
                <section className=" mail-title flex gap-2 items-center translate-y-4 transition-all duration-200">
                    <EmailIcon />
                    <p>Contact</p>
                </section>
                <section className=" mail-address translate-y-10 flex gap-2 items-center transition-all duration-200">
                    <EmailIcon />
                    <a href="mailto:sachin2sharma001@gmail.com">
                        {author.email}
                    </a>
                </section>
            </section>
        </section>
    );
};

export default React.memo(Author);
