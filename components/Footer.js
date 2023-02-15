/* eslint-disable @next/next/no-img-element */
import React, { useMemo } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import Link from "next/link";
import { useSelector } from "react-redux";
import Image from "next/image";
import TelegramIcon from "@mui/icons-material/Telegram";

const Footer = () => {
    const mode = useSelector((state) => state.base.mode);
    const tags = useSelector((state) => state.base.tags);
    const categories = useSelector((state) => state.base.categories);
    const footerCategories = useMemo(() => {
        return categories?.filter((category) => {
            return category.footer;
        });
    }, [categories]);
    const footerTags = useMemo(() => {
        return tags?.filter((tag) => {
            return tag.footer;
        });
    }, [tags]);
    return (
        <footer
            className={`${
                mode == "light" ? "text-gray-800 bg-[#f8f8f8]" : "text-gray-300"
            }  px-10 text-xs border-t-4 border-dotted flex justify-between pb-14 pt-4`}
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
                <section className=" cursor-pointer flex gap-2"></section>
            </section>
            <section className="flex gap-2 ">
                <p className="font-bold">Connect:</p>
                <div className="flex gap-2">
                    <a
                        href="https://www.facebook.com/profile.php?id=100089863353239&mibextid=LQQJ4d"
                        className="hover:text-gray-400 transition-all duration-200 cursor-pointer animation-effect"
                    >
                        <p>Facebook</p>
                    </a>
                    <a
                        href="https://twitter.com/parallelquotes/status/1059298596196114433?s=12&t=Qx1DqWgqxc1LNBztel4doA"
                        className="hover:text-gray-400 transition-all duration-200 cursor-pointer animation-effect"
                    >
                        <p>Twitter</p>
                    </a>
                    <a
                        href="https://instagram.com/the.blogforeverything?igshid=YmMyMTA2M2Y="
                        className="hover:text-gray-400 transition-all duration-200 cursor-pointer animation-effect"
                    >
                        <p>Instagram</p>
                    </a>
                    <a
                        href="https://t.me/+PFpcobYVHjU4NjZl"
                        className="hover:text-gray-400 transition-all duration-200 cursor-pointer animation-effect"
                    >
                        <p>Telegram</p>
                    </a>
                </div>
            </section>
        </footer>
    );
};

export default Footer;
