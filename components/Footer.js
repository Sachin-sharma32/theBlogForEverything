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
        <footer
            className={`${
                mode == "light" ? "text-gray-800 bg-white" : "text-gray-300"
            } p-10 flex lg:items-start lg:flex-row flex-col items-center justify-center gap-8 justify-items-center pb-10 text-xs  border-t-2 `}
        >
            <section className=" flex flex-col gap-2 p-4 h-full border200 text-center items-center">
                <Link href="/" className=" text-xl font-semibold">
                    <h5 className="bg-gradient-to-r from-pink-500 to-orange-500 text-transparent bg-clip-text">
                        THE BLOG FOR EVERYTHING
                    </h5>
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
                <section className=" cursor-pointer flex gap-2">
                    <a
                        href="https://www.facebook.com/profile.php?id=100026014650461"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:scale-125 transition-all duration-200 cursor-pointer animation-effect"
                    >
                        <FacebookIcon />
                    </a>
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://twitter.com/Sachins27374929"
                        className="hover:scale-125 transition-all duration-200 cursor-pointer animation-effect"
                    >
                        <TwitterIcon />
                    </a>
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://www.instagram.com/sachinn._.sharmaa"
                        className="hover:scale-125 transition-all duration-200 cursor-pointer animation-effect"
                    >
                        <InstagramIcon />
                    </a>
                    <a
                        href="https://github.com/Sachin-sharma32"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:scale-125 transition-all duration-200 cursor-pointer animation-effect"
                    >
                        <GitHubIcon />
                    </a>
                </section>
            </section>
            <section className="flex justify-evenly w-full items-center flex-col sm:flex-row gap-8">
                <section className="  flex flex-col gap-2 items-center border200 text-left p-4 min-w-[300px] h-full">
                    <section className="flex gap-8  w-full sm:justify-end justify-center">
                        <section className="flex flex-col gap-2">
                            {categories?.map((category, i) => (
                                <Link
                                    key={i}
                                    href={`/search/${category.title}`}
                                    className=" hover:scale-125 transition-all duration-200"
                                >
                                    {category.title.toUpperCase()}
                                </Link>
                            ))}
                        </section>
                        <div className="flex flex-col gap-2">
                            {tags?.map((tag, i) => (
                                <Link
                                    key={i}
                                    href={`/search/${tag.title}`}
                                    className=" hover:scale-125 transition-all duration-200"
                                >
                                    {tag.title}
                                </Link>
                            ))}
                        </div>
                    </section>
                </section>
                <section className=" flex flex-col gap-2 text-left sm:justify-center h-full p-4 min-w-[300px] items-center">
                    <section className="flex gap-2 sm:w-full hover:scale-105 transition-all duration-200 cursor-pointer animation-effect">
                        <LocationOnIcon />
                        <p>A-24, Bal Nagar, Kartarpura</p>
                    </section>
                    <a
                        href="tel: +916367212438"
                        className="flex gap-2 sm:w-full hover:scale-105 transition-all duration-200 cursor-pointer animation-effect"
                    >
                        <PhoneIcon />
                        <p>91+ 6367212438</p>
                    </a>
                    <a
                        href="mailto: sachin2sharma001@gmail.com"
                        className="flex gap-2 sm:w-full hover:scale-105 transition-all duration-200 cursor-pointer animation-effect"
                    >
                        <MailIcon />
                        <p>sachin2sharma001@gmail</p>
                    </a>
                </section>
            </section>
        </footer>
    );
};

export default Footer;
