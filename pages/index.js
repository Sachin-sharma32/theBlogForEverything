import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Posts from "../components/Posts";
import TopCategories from "../components/TopCategories";
import TopPosts from "../components/TopPosts";
import { motion } from "framer-motion";
import Smooth from "../utils/Smooth";
import Head from "next/head";
import Social from "../utils/Socials";

export default function Home() {
    const mode = useSelector((state) => state.base.mode);
    return (
        <>
            <Head>
                <title>TBFE - Home</title>
                <link
                    rel="icon"
                    type="image/png"
                    href="/site-light-chopped.jpg"
                />
                <meta
                    name="description"
                    content='A comprehensive blogging platform that provides readers with
                    a wide range of information on a variety of topics. From the
                    latest news and current events, to lifestyle and personal
                    development, the platform aims to be a one-stop-shop for all
                    things related to blogging. Whether you&apos;re looking to
                    stay informed, learn something new, or simply be
                    entertained, "The Blog for Everything" has
                    something for everyone.'
                />
                <meta name="keywords" content="blog" />
                <meta
                    property="og:title"
                    content="TBFE -  A comprehensive blogging platform that provides readers with
                    a wide range of information on a variety of topics"
                />
                <meta
                    property="og:description"
                    content=" A comprehensive blogging platform that provides readers with
                    a wide range of information on a variety of topics. From the
                    latest news and current events, to lifestyle and personal
                    development, the platform aims to be a one-stop-shop for all
                    things related to blogging. Whether you're looking to
                    stay informed, learn something new, or simply be
                    entertained, 'The Blog for Everything' has
                    something for everyone."
                />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="TheBlogForEverything" />
                <meta property="og:image" content="/site-light-chopped.jpg" />
                <meta
                    property="og:url"
                    content="https://theblogforeverything.com/"
                />
                <meta property="twitter:card" content="summary_large_image" />
                <meta
                    property="twitter:site"
                    content="FBFE - The Blog For Everything"
                />
                <meta
                    property="twitter:title"
                    content="A comprehensive blog website"
                />
                <meta
                    property="twitter:description"
                    content="A comprehensive blogging platform that provides readers with
                    a wide range of information on a variety of topics. From the
                    latest news and current events, to lifestyle and personal
                    development, the platform aims to be a one-stop-shop for all
                    things related to blogging. Whether you're looking to
                    stay informed, learn something new, or simply be
                    entertained, 'The Blog for Everything' has
                    something for everyone."
                />
                <meta
                    property="twitter:image:src"
                    content="/site-light-chopped.jpg"
                />
                <meta
                    property="og:url"
                    content="https://theblogforeverything.com/"
                />
            </Head>
            <Smooth
                className={` text-gray-500 text-sm ${
                    mode == "light" ? "bg-white" : "bg-[#262626]"
                } relative`}
            >
                {/* <Header />
                <TopPosts />
                <div className=" hidden md:flex">
                    <Posts />
                    <TopCategories />
                </div>
                <div className=" md:hidden flex flex-col">
                    <TopCategories />
                    <Posts />
                </div> */}
                <Header />
                <TopCategories />
                <Posts />
            </Smooth>
        </>
    );
}
