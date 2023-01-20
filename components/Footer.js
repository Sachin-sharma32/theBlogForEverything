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
    return (
        <div className={`${mode == 'light'?'text-gray-800 bg-white':'text-gray-300'} p-10 grid grid-cols-1 gap-8 justify-items-center pb-10 text-xs items-center sm:grid-cols-2 md:grid-cols-3 border-t-2 `} >
            <div className=" flex flex-col gap-2 p-4 h-full border200 text-center items-center">
                <Link href="/" className=" text-xl font-semibold">
                    BLOG
                </Link>
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Quaerat, expedita neque illum totam quibusdam, repudiandae
                    maiores nisi vel quidem porro id. Ex explicabo soluta
                    provident consequatur mollitia amet deserunt eligendi!
                </p>
                <div className=" cursor-pointer flex gap-2">
                    <FacebookIcon />
                    <TwitterIcon />
                    <InstagramIcon />
                    <GitHubIcon />
                </div>
            </div>
            <div className="flex flex-col gap-2 items-center border200 text-left p-4 w-full h-full">
                <div className="flex gap-8">
                    <div className="flex flex-col gap-2">
                        <Link href="/" className=" hover:scale-125 transition-all duration-200">Home</Link>
                        <Link href="/" className=" hover:scale-125 transition-all duration-200">Business</Link>
                        <Link href="/" className=" hover:scale-125 transition-all duration-200">Programming</Link>
                        <Link href="/" className=" hover:scale-125 transition-all duration-200">Lifestyle</Link>
                        <Link href="/" className=" hover:scale-125 transition-all duration-200">Fitness</Link>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Link href="/"className=" hover:scale-125 transition-all duration-200">Bookmarks</Link>
                        <Link href="/"className=" hover:scale-125 transition-all duration-200">Liked</Link>
                        <Link href="/"className=" hover:scale-125 transition-all duration-200">Company Policy</Link>
                        <Link href="/"className=" hover:scale-125 transition-all duration-200">Licencing</Link>
                        <Link href="/"className=" hover:scale-125 transition-all duration-200">Terms</Link>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-2 text-left  items-center h-full p-4 border200">
                <div className="flex gap-2">
                    <LocationOnIcon />
                    <p>A-24, Bal Nagar, Kartarpura</p>
                </div>
                <a href="tel: +916367212438" className="flex gap-2 w-full">
                    <PhoneIcon />
                    <p>91+ 6367212438</p>
                </a>
                <a href="mailto: sachin2sharma001@gmail.com" className="flex gap-2 w-full">
                    <MailIcon />
                    <p>sachin2sharma001@gmail</p>
                </a>
            </div>
        </div>
    );
};

export default Footer;
