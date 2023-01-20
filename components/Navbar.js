import Image from "next/image";
import SearchIcon from "@mui/icons-material/Search";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { Avatar, Tooltip } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import {
    setBookmarks,
    setLiked,
    setMode,
    setSession,
    setUser,
} from "../redux/slices";
import { useGetMe, useGetPosts } from "../hooks/content";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import Smooth from "../utils/Smooth";
import { signOut } from "next-auth/react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Navbar = () => {
    const [hasSession, setHasSession] = useState(false);
    const dispatch = useDispatch();
    const { data: user } = useGetMe();
    const { data } = useGetPosts();
    const [likes, setLikes] = useState(0);
    const [shown, setShown] = useState(false);

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
        router.push(`/${search}`);
    };

    let liked = [];
    useEffect(() => {
        liked = [];
        posts.map((post) => {
            post.likes?.map((item) => {
                if (item._ref == user?.data.user._id) {
                    liked.push(post);
                }
            });
        });
        dispatch(setLiked(liked));
        setLikes(liked.length);
    }, [posts]);

    useEffect(() => {
        dispatch(setMode(localStorage.getItem("mode")));
    }, []);
    return (
        <Smooth
            className={` px-5 py-1 flex text-black justify-between items-center sticky top-0 pt-2 text-xs md:text-base ${
                mode == "light" ? "bg-white" : "bg-[#262626]"
            } z-50`}
        >
            <Link href="/">
                <h2
                    className={`${
                        mode == "light" ? "text-black" : "text-white"
                    } font-bold text-xl`}
                >
                    BLOG
                </h2>
            </Link>
            <form
                onSubmit={submitHandler}
                className={`${
                    mode == "dark"
                        ? "bg-gray-500 focus-within:bg-white focus-within:shadow-gray-900"
                        : "bg-white border focus-within:bg-gray-200"
                } rounded-sm flex justify-between items-center h-7 px-2 w-60 md:w-80 md:focus-within:w-96 transition-all duration-200 focus-within:shadow-lg`}
            >
                <input
                    type="text"
                    name=""
                    id=""
                    className={`${
                        mode == "dark"
                            ? "bg-gray-500 focus-within:bg-white"
                            : " bg-white focus-within:bg-gray-200"
                    } rounded-sm h-fit outline-none w-full transition-all duration-200`}
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                />
                <button type="submit">
                    <SearchIcon className=" text-black" />
                </button>
            </form>
            {hasSession ? (
                <div className=" relative">
                    <div>
                        <button
                            className=" cursor-pointer bg-black flex md:hidden"
                            onClick={showSideBar}
                        >
                            <MenuIcon className=" mt-[4rem] absolute w-10 text-transparent h-10 -top-16 right-0 z-50" />
                        </button>
                        <div
                            ref={sideRef}
                            className=" transition-all duration-200 absolute top-0 right-0 min-h-screen mt-[4rem] w-[200px] translate-x-[500px] p-4 flex flex-col gap-4 z-50"
                        >
                            <ul
                                className={`${
                                    mode == "dark"
                                        ? "bg-[#262626] text-white"
                                        : " bg-white text-black"
                                } shadow-2xl shadow-black flex-col text-sm user-links font-normal  z-50`}
                            >
                                <li className="bg-gradient-to-r from-pink-500 to-orange-500 p-4">
                                    Hi, {user?.data.user.name.toUpperCase()}
                                </li>
                                <Link href="/account">
                                    <li className=" hover:bg-gray-200 hover:text-black w-full p-4">
                                        My Account
                                    </li>
                                </Link>
                                <Link href="/bookmark">
                                    <li className=" hover:bg-gray-200 hover:text-black w-full p-4">
                                        My Bookmarks
                                    </li>
                                </Link>
                                <Link href="/like">
                                    <li className=" hover:bg-gray-200 hover:text-black w-full p-4">
                                        Liked Posts
                                    </li>
                                </Link>
                                <Link href="http://localhost:3333">
                                    <li className=" hover:bg-gray-200 hover:text-black w-full p-4">
                                        Dashboard
                                    </li>
                                </Link>
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
                            {/* {!user?.isAdmin && (
                                <ul className=" absolute top-10 -left-36 -translate-x-1/2 bg-[#262626] shadow-2xl shadow-black flex-col text-sm user-links font-normal text-white z-50 hidden drop-down">
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
                            )} */}
                            <button
                                className=" mt-[4rem] absolute w-10 text-transparent h-10 -top-32 right-0 z-50"
                                onClick={hideSideBar}
                            >
                                <MenuIcon className="" />
                            </button>
                        </div>
                    </div>
                    <div className=" flex gap-2 sm:gap-4 items-center justify-center">
                        <Link
                            href="/bookmark"
                            className="relative md:flex hidden"
                        >
                            <BookmarkBorderIcon
                                className={` ${
                                    mode == "light"
                                        ? "text-black"
                                        : "text-white"
                                } cursor-pointer hover:scale-125 transition-all duration-200`}
                            />
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
                            <FavoriteBorderIcon
                                className={` ${
                                    mode == "light"
                                        ? "text-black"
                                        : "text-white"
                                } cursor-pointer hover:scale-125 transition-all duration-200`}
                            />
                            <p
                                className={`${
                                    mode == "dark"
                                        ? "bg-white text-black"
                                        : "bg-black text-white"
                                } absolute -top-2 -right-2 w-5 h-5 rounded-full flex justify-center items-center`}
                            >
                                {likes}
                            </p>
                        </Link>
                        <button
                            onClick={() => {
                                mode == "dark"
                                    ? dispatch(setMode("light"))
                                    : dispatch(setMode("dark"));
                            }}
                        >
                            <Brightness4Icon
                                className={` ${
                                    mode == "light"
                                        ? "text-black"
                                        : "text-white"
                                } cursor-pointer hover:scale-125 transition-all duration-200`}
                            />
                        </button>
                        <div className=" relative profile-icon">
                            {siteUser?.image?.length > 0 && (
                                <img
                                    src={`${siteUser?.image}`}
                                    className=" cursor-pointer w-10 rounded-full h-10"
                                />
                            )}
                            {!siteUser?.image && (
                                <Avatar
                                    src="/person.webp"
                                    className=" cursor-pointer"
                                />
                            )}
                            <ul className=" absolute top-10 -left-36 -translate-x-1/2 bg-[#262626] shadow-2xl shadow-black flex-col text-sm user-links font-normal text-white z-50 hidden drop-down">
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
                                    <Link href="http://localhost:3333">
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
                    <button
                        onClick={() => {
                            mode == "dark"
                                ? dispatch(setMode("light"))
                                : dispatch(setMode("dark"));
                        }}
                    >
                        <Brightness4Icon
                            className={` ${
                                mode == "light" ? "text-black" : "text-white"
                            } cursor-pointer hover:scale-125 transition-all duration-200`}
                        />
                    </button>
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
            )}
        </Smooth>
    );
};

export default Navbar;
