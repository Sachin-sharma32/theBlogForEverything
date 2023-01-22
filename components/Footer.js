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
import { Avatar } from "@mui/material";
import Image from "next/image";

const Footer = () => {
    const mode = useSelector((state) => state.base.mode);
    const tags = useSelector((state) => state.base.tags);
    const categories = useSelector((state) => state.base.categories);
    return (
        <footer
            className={`${
                mode == "light" ? "text-gray-800 bg-white" : "text-gray-300"
            } p-10  pb-10 text-xs border-t grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8`}
        >
            <section className=" flex flex-col gap-4 h-full border200 text-center items-center col-span-2 sm:col-span-3 lg:col-span-2">
                <Link
                    href="/"
                    className=" text-xl font-semibold flex flex-col justify-center items-center"
                >
                    {mode == "dark" ? (
                        <Image
                            src="/site-chopped-dark.jpg"
                            width="100"
                            height="20"
                            alt="Website Logo"
                        />
                    ) : (
                        <Image
                            src="/site-chopped-light.jpg"
                            width="100"
                            height="20"
                            alt="Website Logo"
                        />
                    )}
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
                        className="hover:scale-125 transition-all duration-200 cursor-pointer animation-effect"
                    >
                        <FacebookIcon />
                    </a>
                    <a
                        target="_blank"
                        className="hover:scale-125 transition-all duration-200 cursor-pointer animation-effect"
                    >
                        <TwitterIcon />
                    </a>
                    <a
                        target="_blank"
                        className="hover:scale-125 transition-all duration-200 cursor-pointer animation-effect"
                    >
                        <InstagramIcon />
                    </a>
                    <a
                        href="https://github.com/Sachin-sharma32"
                        className="hover:scale-125 transition-all duration-200 cursor-pointer animation-effect"
                    >
                        <GitHubIcon />
                    </a>
                </section>
            </section>
            <section className="flex flex-col w-full gap-2">
                {categories?.map((category, i) => (
                    <Link
                        key={i}
                        href={`/search/${category.title}`}
                        className=" hover:scale-125 transition-all duration-200 w-full text-center"
                    >
                        {category?.title?.toUpperCase()}
                    </Link>
                ))}
            </section>
            <section className="flex flex-col gap-2 text-center">
                {tags?.map((tag, i) => (
                    <Link
                        key={i}
                        href={`/search/${tag.title}`}
                        className=" hover:scale-125 transition-all duration-200 w-full"
                    >
                        {tag.title}
                    </Link>
                ))}
            </section>
            <section className="flex flex-col gap-2 col-span-2 sm:col-span-1">
                <a
                    href="tel: +91 95210 85310"
                    className=" justify-center flex gap-2 sm:w-full hover:scale-105 transition-all duration-200 cursor-pointer animation-effect"
                >
                    <PhoneIcon />
                    <p>91+ 95210 85310</p>
                </a>
                <a
                    href="tel: +916367212438"
                    className="justify-center flex gap-2 sm:w-full hover:scale-105 transition-all duration-200 cursor-pointer animation-effect"
                >
                    <PhoneIcon />
                    <p>91+ 6367212438</p>
                </a>
                <a
                    href="mailto: Rahul.noble95@gmail.com"
                    className="justify-center flex gap-2 sm:w-full hover:scale-105 transition-all duration-200 cursor-pointer animation-effect"
                >
                    <MailIcon />
                    <p>Rahul.noble95@gmail.com</p>
                </a>
                <a
                    href="mailto: sachin2sharma001@gmail.com"
                    className="justify-center flex gap-2 sm:w-full hover:scale-105 transition-all duration-200 cursor-pointer animation-effect"
                >
                    <MailIcon />
                    <p>sachin2sharma001@gmail</p>
                </a>
            </section>
        </footer>
    );
};

export default Footer;
