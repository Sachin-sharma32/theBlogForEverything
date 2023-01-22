import Image from "next/image";
import SearchIcon from "@mui/icons-material/Search";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { Avatar } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { setLiked, setMode, setSession, setUser } from "../redux/slices";
import {
    useGetCategories,
    useGetMe,
    useGetPosts,
    useGetTags,
} from "../hooks/content";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { signOut } from "next-auth/react";
import MenuIcon from "@mui/icons-material/Menu";
import CategoryIcon from "@mui/icons-material/Category";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import CategoryBox from "./CategoryBox";
import LoginIcon from "@mui/icons-material/Login";
import CheckOutsideClick from "../utils/CheckOutsideClick";

const Navbar = () => {
    const [hasSession, setHasSession] = useState(false);
    const dispatch = useDispatch();
    const { data: user } = useGetMe();
    const { data } = useGetPosts();
    const [shown, setShown] = useState(false);

    const [toggleCategories, setToggleCategories] = useState(false);

    useGetTags();
    useGetCategories();

    const sideRef = useRef();

    const showSideBar = () => {
        sideRef.current.classList.remove("translate-x-[500px]");
        setShown(true);
    };
    const hideSideBar = () => {
        sideRef.current.classList.add("translate-x-[500px]");
        setShown(false);
    };

    const siteUser = useSelector((state) => state.base.user);

    const session = useSelector((state) => state.base.session);
    const posts = useSelector((state) => state.base.posts);
    const likes = useSelector((state) => state.base.likes);

    useEffect(() => {
        if (session) {
            setHasSession(true);
        }
    }, [session]);
    const [cookie, setCookie] = useCookies(["user"]);
    if (cookie) {
        dispatch(setSession(cookie.user));
    }
    const mode = useSelector((state) => state.base.mode);
    const router = useRouter();

    const [search, setSearch] = useState("");
    const submitHandler = (e) => {
        e.preventDefault();
        router.push(`/search/${search}`);
    };

    let liked = [];
    useEffect(() => {
        if (siteUser) {
            posts.map((post) => {
                post.likes?.map((item) => {
                    if (item._id === siteUser._id) {
                        liked.push(post);
                    }
                });
            });
            dispatch(setLiked(liked));
        }
    }, [posts, siteUser]);

    useEffect(() => {
        const md = localStorage.getItem("mode");
        if (md === null) {
            dispatch(setMode("dark"));
        } else {
            dispatch(setMode(localStorage.getItem("mode")));
        }
    }, []);
    return (
        <nav
            className={` px-2 sm:px-5 py-1 flex text-black justify-between items-center sticky top-0 pt-2 text-xs md:text-base ${
                mode == "light" ? "bg-white" : "bg-[#262626]"
            } z-50`}
        >
            <Link href="/">
                <h2
                    className={`${
                        mode == "light" ? "text-black" : "text-white"
                    } font-bold text-xl hidden lg:flex`}
                >
                    THE BLOG FOR EVERYTHING
                </h2>
                <h2
                    className={`${
                        mode == "light" ? "text-black" : "text-white"
                    } font-bold text-xl lg:hidden`}
                >
                    TBFE
                </h2>
            </Link>
            <div className="flex items-center justify-between gap-4">
                <form
                    onSubmit={submitHandler}
                    className={`${
                        mode == "dark"
                            ? "bg-gray-500 focus-within:bg-white focus-within:shadow-gray-900"
                            : "bg-white border focus-within:bg-gray-200"
                    } rounded-sm flex justify-between items-center h-7 px-1 md:px-2 w-52 sm:w-60 md:w-80 md:focus-within:w-96 transition-scale duration-200 focus-within:shadow-lg`}
                >
                    <input
                        type="text"
                        name=""
                        id=""
                        className={`${
                            mode == "dark"
                                ? " bg-inherit focus-within:bg-inherit"
                                : " bg-inherit focus-within:bg-inherit"
                        } rounded-sm h-fit outline-none w-full`}
                        onChange={(e) => {
                            setSearch(e.target.value);
                        }}
                    />
                    <button
                        type="submit"
                        className=" active:scale-90 transition-all duration-200"
                    >
                        <SearchIcon className=" text-black text-lg sm:text-2xl" />
                    </button>
                </form>
                <CheckOutsideClick setToggleCategories={setToggleCategories}>
                    <section
                        className={`${
                            mode == "dark" ? "text-white" : "text-black"
                        } relative`}
                    >
                        <a
                            className="flex items-center cursor-pointer"
                            onClick={() => {
                                setToggleCategories((current) => !current);
                            }}
                        >
                            <CategoryIcon className="text-lg sm:text-2xl" />
                            <div className=" hidden sm:flex">
                                {toggleCategories ? (
                                    <ArrowDropUpIcon />
                                ) : (
                                    <ArrowDropDownIcon />
                                )}
                            </div>
                        </a>
                        {toggleCategories && (
                            <CategoryBox
                                setToggleCategories={setToggleCategories}
                            />
                        )}
                    </section>
                </CheckOutsideClick>
            </div>
            {hasSession ? (
                <div className=" relative">
                    <div>
                        <button
                            className=" cursor-pointer flex md:hidden"
                            onClick={showSideBar}
                        >
                            <MenuIcon className="mt-[4rem] absolute w-5 text-transparent h-5 -top-16 right-0 z-50" />
                        </button>
                        <CheckOutsideClick handleClose={hideSideBar}>
                            <div
                                ref={sideRef}
                                className=" transition-all duration-200 absolute -top-8 -right-6 min-h-screen mt-[4rem] w-[200px] translate-x-[500px] p-4 flex flex-col gap-4 z-50"
                            >
                                <ul
                                    className={`${
                                        mode == "dark"
                                            ? "bg-[#262626] text-white"
                                            : " bg-white text-black"
                                    } shadow-2xl shadow-black flex-col text-sm user-links font-normal z-50`}
                                >
                                    <li className="bg-gradient-to-r from-pink-500 to-orange-500 p-4">
                                        Hi, {user?.data?.user?.name}
                                    </li>
                                    <Link href="/account" onClick={hideSideBar}>
                                        <li className=" hover:bg-gray-200 hover:text-black w-full p-4">
                                            My Account
                                        </li>
                                    </Link>
                                    <Link
                                        href="/bookmark"
                                        onClick={hideSideBar}
                                    >
                                        <li className=" hover:bg-gray-200 hover:text-black w-full p-4">
                                            My Bookmarks
                                        </li>
                                    </Link>
                                    <Link href="/like" onClick={hideSideBar}>
                                        <li className=" hover:bg-gray-200 hover:text-black w-full p-4">
                                            Liked Posts
                                        </li>
                                    </Link>
                                    {siteUser?.isAdmin && (
                                        <Link
                                            href="http://localhost:3333"
                                            onClick={hideSideBar}
                                        >
                                            <li className=" hover:bg-gray-200 hover:text-black w-full p-4">
                                                Dashboard
                                            </li>
                                        </Link>
                                    )}
                                    <li
                                        className=" hover:bg-gray-200 hover:text-black w-full p-4 flex flex-col text-center cursor-pointer"
                                        onClick={() => {
                                            setCookie("user", "logout", {
                                                path: "/",
                                                maxAge: 0,
                                                sameSite: true,
                                            });
                                            setHasSession(false);
                                            dispatch(setUser({}));
                                            dispatch(setSession(null));
                                            signOut();
                                        }}
                                    >
                                        <p>LOGOUT</p>
                                    </li>
                                </ul>
                                <button
                                    className=" mt-[4rem] absolute w-8 text-transparent h-8 -top-24 right-6 z-50"
                                    onClick={hideSideBar}
                                >
                                    <MenuIcon className="" />
                                </button>
                            </div>
                        </CheckOutsideClick>
                    </div>
                    <div className=" flex gap-2 sm:gap-4 items-center justify-center">
                        <Link
                            href="/bookmark"
                            className="relative md:flex hidden"
                        >
                            <button
                                className={` ${
                                    mode == "light"
                                        ? "text-black"
                                        : "text-white"
                                } cursor-pointer hover:scale-125 transition-all duration-200 animation-effect`}
                            >
                                <BookmarkBorderIcon />
                            </button>
                            <p
                                className={`${
                                    mode == "dark"
                                        ? "bg-white text-black"
                                        : "bg-black text-white"
                                } rounded-full p-2 flex justify-center items-center w-5 h-5 absolute -top-2 -right-2`}
                            >
                                {siteUser?.bookmarks?.length}
                            </p>
                        </Link>
                        <Link href="/like" className="relative hidden md:flex">
                            <div
                                className={` ${
                                    mode == "light"
                                        ? "text-black"
                                        : "text-white"
                                } cursor-pointer hover:scale-125 animation-effect`}
                            >
                                <FavoriteBorderIcon />
                            </div>
                            <p
                                className={`${
                                    mode == "dark"
                                        ? "bg-white text-black"
                                        : "bg-black text-white"
                                } absolute -top-2 -right-2 w-5 h-5 rounded-full flex justify-center items-center`}
                            >
                                {likes.length}
                            </p>
                        </Link>
                        <button
                            onClick={() => {
                                mode == "dark"
                                    ? dispatch(setMode("light"))
                                    : dispatch(setMode("dark"));
                            }}
                        >
                            <a
                                className={` ${
                                    mode == "light"
                                        ? "text-black"
                                        : "text-white"
                                } cursor-pointer hover:scale-125 text-lg sm:text-2xl animation-effect`}
                            >
                                <Brightness4Icon className="text-lg sm:text-2xl" />
                            </a>
                        </button>
                        <div className=" relative profile-icon">
                            <div className="">
                                {siteUser?.image?.length > 0 && (
                                    <img
                                        src={`${siteUser?.image}`}
                                        className=" cursor-pointer w-7 rounded-full h-7 sm:w-10 sm:h-10 border border-inherit"
                                        alt="user image"
                                    />
                                )}
                                {!siteUser?.image && (
                                    <Avatar
                                        src="/user-lg.png"
                                        className=" cursor-pointer w-7 h-7 sm:w-10 sm:h-10"
                                    />
                                )}
                            </div>
                            <ul
                                className={`${
                                    mode === "dark"
                                        ? "bg-[#262626] text-white"
                                        : "bg-white text-black"
                                } absolute top-10 -left-36 -translate-x-1/2 shadow-2xl shadow-black flex-col text-sm user-links font-normal z-50 hidden drop-down`}
                            >
                                <li className="bg-gradient-to-r from-pink-500 to-orange-500 p-4">
                                    Hi, {user?.data.user.name.toUpperCase()}
                                </li>
                                <Link href="/account">
                                    <li className=" hover:bg-gray-200 hover:text-black w-96 p-4">
                                        My Account
                                    </li>
                                </Link>
                                <Link href="/bookmark">
                                    <li className=" hover:bg-gray-200 hover:text-black w-96 p-4">
                                        My Bookmarks
                                    </li>
                                </Link>
                                <Link href="/like">
                                    <li className=" hover:bg-gray-200 hover:text-black w-96 p-4">
                                        Liked Posts
                                    </li>
                                </Link>
                                {siteUser?.isAdmin && (
                                    <Link href="https://theblogforeverything.sanity.studio">
                                        <li className=" hover:bg-gray-200 hover:text-black w-96 p-4">
                                            Dashboard
                                        </li>
                                    </Link>
                                )}
                                <li
                                    className=" hover:bg-gray-200 hover:text-black w-96 p-4 flex flex-col text-center cursor-pointer"
                                    onClick={() => {
                                        setCookie("user", "logout", {
                                            path: "/",
                                            maxAge: 0,
                                            sameSite: true,
                                        });
                                        setHasSession(false);
                                        dispatch(setUser(null));
                                        dispatch(setSession(null));
                                        signOut();
                                    }}
                                >
                                    <p>LOGOUT</p>
                                    <p className=" text-xs">
                                        {user?.data.user.email}
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            ) : (
                <div
                    className={`${
                        mode == "dark" ? "text-white" : "text-black "
                    } flex gap-2 sm:gap-4 text-xs items-center`}
                >
                    <a
                        onClick={() => {
                            mode == "dark"
                                ? dispatch(setMode("light"))
                                : dispatch(setMode("dark"));
                        }}
                        className={` ${
                            mode == "light" ? "text-black" : "text-white"
                        } cursor-pointer hover:scale-125 animation-effect transition-all duration-200 text-lg sm:text-2xl`}
                    >
                        <Brightness4Icon />
                    </a>
                    <div className="hidden md:flex gap-4">
                        <Link
                            href="/signin"
                            className=" hover:scale-110 active:scale-100 transition-all duration-200"
                        >
                            SIGN IN
                        </Link>
                        <Link
                            href="/register"
                            className=" hover:scale-110 active:scale-100 transition-all duration-200"
                        >
                            REGISTER
                        </Link>
                    </div>
                    <Link
                        href="/signin"
                        className={` ${
                            mode == "light" ? "text-black" : "text-white"
                        } cursor-pointer hover:scale-125 transition-all duration-200 md:hidden`}
                    >
                        <LoginIcon />
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
