/* eslint-disable @next/next/no-img-element */
import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import Link from "next/link";
import { useSelector } from "react-redux";

const Footer = () => {
    const mode = useSelector((state) => state.base.mode);
    const tags = useSelector((state) => state.base.tags);
    const categories = useSelector((state) => state.base.categories);
    return (
        <div
            className={`${
                mode == "light" ? "text-gray-800 bg-white" : "text-gray-300"
            } p-10 flex lg:items-start lg:flex-row flex-col items-center justify-center gap-8 justify-items-center pb-10 text-xs  border-t-2 `}
        >
            <div className=" flex flex-col gap-2 p-4 h-full border200 text-center items-center">
                <Link href="/" className=" text-xl font-semibold">
                    <p className="bg-gradient-to-r from-pink-500 to-orange-500 text-transparent bg-clip-text">
                        THE BLOG FOR EVERYTHING
                    </p>
                </Link>
                <p>
                    A comprehensive blogging platform that provides readers with
                    a wide range of information on a variety of topics. From the
                    latest news and current events, to lifestyle and personal
                    development, the platform aims to be a one-stop-shop for all
                    things related to blogging. Whether you&apos;re looking to
                    stay informed, learn something new, or simply be
                    entertained, &quot;The Blog for Everything&quot; has
                    something for everyone.
                </p>
                <div className=" cursor-pointer flex gap-2">
                    <a href="https://www.facebook.com/profile.php?id=100026014650461">
                        <FacebookIcon />
                    </a>
                    <a href="https://twitter.com/Sachins27374929">
                        <TwitterIcon />
                    </a>
                    <a href="https://www.instagram.com/sachinn._.sharmaa">
                        <InstagramIcon />
                    </a>
                    <a href="https://github.com/Sachin-sharma32">
                        <GitHubIcon />
                    </a>
                </div>
            </div>
            <div className="flex justify-evenly w-full items-center flex-col sm:flex-row gap-8">
                <div className="  flex flex-col gap-2 items-center border200 text-left p-4 min-w-[300px] h-full">
                    <div className="flex gap-8  w-full sm:justify-end justify-center">
                        <div className="flex flex-col gap-2">
                            {categories?.map((category, i) => (
                                <Link
                                    key={i}
                                    href={`/${category.title}`}
                                    className=" hover:scale-125 transition-all duration-200"
                                >
                                    {category.title.toUpperCase()}
                                </Link>
                            ))}
                        </div>
                        <div className="flex flex-col gap-2">
                            {tags?.map((tag, i) => (
                                <Link
                                    key={i}
                                    href={`/${tag.title}`}
                                    className=" hover:scale-125 transition-all duration-200"
                                >
                                    {tag.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                <div className=" flex flex-col gap-2 text-left sm:justify-center h-full p-4 min-w-[300px] items-center">
                    <div className="flex gap-2 sm:w-full">
                        <LocationOnIcon />
                        <p>A-24, Bal Nagar, Kartarpura</p>
                    </div>
                    <a
                        href="tel: +916367212438"
                        className="flex gap-2 sm:w-full"
                    >
                        <PhoneIcon />
                        <p>91+ 6367212438</p>
                    </a>
                    <a
                        href="mailto: sachin2sharma001@gmail.com"
                        className="flex gap-2 sm:w-full"
                    >
                        <MailIcon />
                        <p>sachin2sharma001@gmail</p>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Footer;
