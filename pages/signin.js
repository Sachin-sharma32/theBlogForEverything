import Image from "next/image";
import React, { useEffect, useState } from "react";
import Smooth from "../utils/Smooth";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useGetCategories, useOauth, useSignin } from "../hooks/content";
import { signIn, useSession } from "next-auth/react";
import {
    Alert,
    Dialog,
    DialogContent,
    Stack,
    DialogTitle,
    DialogActions,
    DialogContentText,
    Button,
} from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import Link from "next/link";
import Head from "next/head";
import { client } from "../sanity";
import axios from "axios";
import { setErrorPopup, setMessage, setSuccessPopup } from "../redux/slices";
import CloseIcon from "@mui/icons-material/Close";
import { useLogIn } from "../routers/useAuth";
import { useUpdateUser } from "../routers/useUser";

const SignIn = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const mode = useSelector((state) => state.base.mode);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [showDialog, setShowDialog] = useState(false);
    const categories = useSelector((state) => state.base.categories);
    const user = useSelector((state) => state.base.user);
    user;
    const [preferences, setPreferences] = useState([]);
    categories;

    const onSuccess = (data) => {
        dispatch(setSuccessPopup(true));
        dispatch(setMessage("Signed In successfully"));
        setTimeout(() => {
            if (
                !data.data.data.user.preferences ||
                data.data.data.user.preferences.length === 0
            ) {
                setShowDialog(true);
            } else {
                router.push("/");
            }
        }, 2000);
    };
    const onError = (err) => {
        dispatch(setErrorPopup(true));
        dispatch(setMessage(err.response.data.message));
    };
    const { mutate: login, error: err } = useLogIn(onSuccess, onError);
    const submitHandler = async (e) => {
        e.preventDefault();
        const user = { email, password };
        login(user);
    };

    const onUpdateSuccess = () => {
        router.push("/");
    };

    const { mutate: updateUser } = useUpdateUser(onUpdateSuccess);
    const addPreferences = async () => {
        const userData = { preferences, userId: user._id };
        updateUser(userData);
    };

    const { data: session } = useSession();
    const { mutate: oAuthLogIn } = useOauth();
    useEffect(() => {
        if (session) {
            const data = {
                name: session.user.name,
                email: session.user.email,
            };
            oAuthLogIn(data);
            if (
                !data.data.data.preferences ||
                data.data.data.preferences.length === 0
            ) {
                setShowDialog(true);
            } else {
                router.push("/");
            }
        }
    }, [session]);

    const oAuthSignIn = async (provider) => {
        if (provider === "twitter") {
            setError(true);
            setErrorMsg("TWITTER IS NOT FUNCTIONAL CURRENTLY");
            setTimeout(() => {
                setError(false);
            }, 2000);
        } else {
            await signIn(provider).then((session) => {});
        }
    };

    return (
        <div className="relative">
            <Dialog open={showDialog}>
                <DialogTitle>CHOOSE YOUR PREFERENCES</DialogTitle>
                <DialogContent>
                    <DialogContentText className="flex gap-1 mb-10 flex-wrap">
                        {categories?.map((category, i) => (
                            <div
                                onClick={() => {
                                    if (
                                        preferences.find(
                                            (item) => item._id === category._id
                                        )
                                    ) {
                                        setPreferences(
                                            preferences.filter(
                                                (item) =>
                                                    item._id !== category._id
                                            )
                                        );
                                    } else {
                                        setPreferences([
                                            ...preferences,
                                            { ...category, _key: i },
                                        ]);
                                    }
                                }}
                                key={i}
                                className={`${
                                    preferences.find(
                                        (item) => item._id === category._id
                                    )
                                        ? "bg-white text-black"
                                        : "bg-black text-white"
                                } border-2 px-4 rounded-full  py-1 hover:bg-white border-black hover:text-black cursor-pointer transition-all duration-300`}
                            >
                                {category?.title}
                            </div>
                        ))}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button
                        onClick={addPreferences}
                        className=" absolute bottom-4 right-6 bg-gradient-to-r text-white from-[#ff7d69] to-blue-700 px-6 rounded-full active:scale-90 transition-all duration-300"
                    >
                        Save
                    </button>
                    <button
                        className=" absolute top-4 right-4"
                        onClick={() => {
                            setShowDialog(false);
                        }}
                    >
                        <CloseIcon />
                    </button>
                </DialogActions>
            </Dialog>
            {/* {showDialog && (
                <div className=" fixed left-0 top-0 h-screen z-50 w-screen backdrop-blur-sm flex justify-center items-center">
                    <div className="flex flex-col p-10 bg-white w-[500px] gap-4 rounded-3xl relative">
                        <h3 className="text-2xl font-bold">
                            CHOOSE YOUR PREFERENCES
                        </h3>
                        <div className="flex flex-wrap text-sm gap-2">
                            {categories?.map((category, i) => (
                                <div
                                    onClick={() => {
                                        if (
                                            preferences.find(
                                                (item) =>
                                                    item._id === category._id
                                            )
                                        ) {
                                            setPreferences(
                                                preferences.filter(
                                                    (item) =>
                                                        item._id !==
                                                        category._id
                                                )
                                            );
                                        } else {
                                            setPreferences([
                                                ...preferences,
                                                { ...category, _key: i },
                                            ]);
                                        }
                                    }}
                                    key={i}
                                    className={`${
                                        preferences.find(
                                            (item) => item._id === category._id
                                        )
                                            ? "bg-white text-black"
                                            : "bg-black text-white"
                                    } border-2 px-4 rounded-full  py-1 hover:bg-white border-black hover:text-black cursor-pointer transition-all duration-300`}
                                >
                                    {category?.title}
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={addPreferences}
                            className=" absolute bottom-4 right-6 bg-gradient-to-r text-white from-[#ff7d69] to-blue-700 px-6 rounded-full active:scale-90 transition-all duration-300"
                        >
                            Save
                        </button>
                    </div>
                </div>
            )} */}
            <Head>
                <title>TBFE - Sign In</title>
                <link
                    rel="icon"
                    type="image/png"
                    href="/site-light-chopped.jpg"
                />
            </Head>
            <Smooth
                className={`${mode == "light" ? "bg-white" : ""}   flex
            justify-center
            items-center
            text-xs
            min-h-screen relative`}
            >
                <div
                    className={`${
                        mode == "dark"
                            ? "signin-form bg-[#262626]"
                            : "signin-form-light"
                    } -translate-y-6 bg-white w-[80%] p-10 shadow-2xl px-10 text-white flex items-center justify-center`}
                >
                    <div className=" w-[100 flex-col gap-4 mt-4 items-center">
                        <div className="flex flex-col w-fit items-center">
                            <div className=" mb-6">
                                <h1 className=" text-3xl font-bold bg-gradient-to-r from-[#ff7d69] to-blue-700 text-transparent bg-clip-text">
                                    WELCOME TO TBFE
                                </h1>
                            </div>
                            <form
                                onSubmit={submitHandler}
                                className=" w-[100%]"
                            >
                                <div className="flex flex-col gap-2 items-center">
                                    <input
                                        type="email"
                                        name=""
                                        id=""
                                        placeholder="Email"
                                        className=" bg-white w-[100%] md:w-[500px] h-10 rounded-2xl px-4 border-b-4 text-black border-white shadow-md outline-none focus-within:border-green-500 focus:invalid:border-red-500"
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                    />
                                    <input
                                        type="password"
                                        name=""
                                        id=""
                                        placeholder="Password"
                                        className=" bg-white w-[100%] md:w-[500px] h-10 rounded-2xl px-4 text-black shadow-md outline-none"
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                    />
                                    <button
                                        type="submit"
                                        className={`${
                                            mode == "dark"
                                                ? " border-white hover:border-black hover:bg-black hover:text-white"
                                                : " border-black text-black hover:bg-black hover:text-white"
                                        } border w-[100%] md:w-[500px] px-4 py-2 rounded-2xl  transition-all duration-200 active:scale-90`}
                                    >
                                        SIGN IN
                                    </button>
                                    <div className="flex justify-between w-full">
                                        <Link
                                            href="/forgotPassword"
                                            className={`${
                                                mode == "dark"
                                                    ? "text-white"
                                                    : "text-black"
                                            } flex gap-2 hover:gap-4 justify-center items-center self-end transition-all duration-200`}
                                        >
                                            <p>FORGOT PASSWORD</p>
                                            <EastIcon />
                                        </Link>
                                        <Link
                                            href="/register"
                                            className={`${
                                                mode == "dark"
                                                    ? "text-white"
                                                    : "text-black"
                                            } flex gap-2 hover:gap-4 justify-center items-center self-end transition-all duration-200`}
                                        >
                                            <p>REGISTER</p>
                                            <EastIcon />
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div
                            className={`${
                                mode == "dark" ? "text-white" : "text-black"
                            } mt-5 text-center`}
                        >
                            OR
                        </div>
                        <div className=" mt-6 items-center grid grid-cols-1 justify-center justify-items-center gap-4">
                            <div
                                className="flex px-4 py-1 gap-2 rounded-2xl justify-center w-[100%] md:w-[500px] items-center bg-white text-black cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200"
                                onClick={() => {
                                    oAuthSignIn("google");
                                }}
                            >
                                <Image
                                    src="/google.png"
                                    width="30"
                                    height="50"
                                    alt="google icon"
                                />
                                <p>GOOGLE</p>
                            </div>
                            <div
                                className="flex px-4 py-1 gap-2 rounded-2xl justify-center  w-[100%] md:w-[500px] items-center bg-blue-500 cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200"
                                onClick={() => {
                                    oAuthSignIn("facebook");
                                }}
                            >
                                <Image
                                    src="/facebook.png"
                                    width="30"
                                    height="50"
                                    alt="facebook icon"
                                />
                                <p>FACEBOOK</p>
                            </div>
                            <div
                                className="flex px-4 py-1 gap-2 rounded-2xl justify-center  w-[100%] md:w-[500px] items-center bg-black cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200"
                                onClick={() => {
                                    oAuthSignIn("github");
                                }}
                            >
                                <Image
                                    src="/github-dark.png"
                                    width="30"
                                    height="50"
                                    alt="github icon"
                                />
                                <p>GITHUB</p>
                            </div>
                            <div
                                className="flex px-4 py-1 gap-2 rounded-2xl justify-center  w-[100%] md:w-[500px] items-center bg-blue-500 cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200"
                                onClick={() => {
                                    oAuthSignIn("twitter");
                                }}
                            >
                                <Image
                                    src="/twitter.png"
                                    width="30"
                                    height="50"
                                    alt="twitter icon"
                                />
                                <p>TWITTER</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Smooth>
        </div>
    );
};

export default SignIn;

SignIn.getInitialProps = async (context) => {
    return {
        title: "Sign In | TBFE",
        image: "/site-light-chopped.jpg",
        summery:
            "Sign In to TEFE to get access to all the features of the site",
        keywords:
            "register, sign in, sign up, login, tefe, tech, tech blog, tech blog for everyone",
        type: "website",
        imageAlt: "The Blog For Everything log",
        parameter: "signin",
    };
};
