import Image from "next/image";
import React, { useEffect, useState } from "react";
import Smooth from "../utils/Smooth";
import axios from "axios";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useOauth, useSignin } from "../hooks/content";
import { signIn, useSession } from "next-auth/react";
import ErrorModel from "../utils/ErrorModel";
import { RouterRounded } from "@mui/icons-material";
import SuccessModel from "../utils/SuccessModel";
import { Alert } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import Link from "next/link";

const SignIn = () => {
    const router = useRouter();
    const mode = useSelector((state) => state.base.mode);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const onSuccess = () => {
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
            router.push("/");
        }, 2000);
    };
    const onError = () => {
        setError(true);
        setTimeout(() => {
            setError(false);
        }, 2000);
    };
    const { mutate: userSignIn, error: err } = useSignin(onSuccess, onError);
    console.log(err);
    const submitHandler = async (e) => {
        e.preventDefault();
        const user = { email, password };
        userSignIn(user);
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
            router.push("/");
        }
    }, [session]);

    const oAuthSignIn = async (provider) => {
        await signIn(provider).then((session) => {});
    };

    return (
        <Smooth
            className={`${mode == "light" ? "bg-white" : ""}   flex
            justify-center
            items-center
            text-xs
            min-h-screen relative`}
        >
            {error && (
                <Alert severity="error" className=" fixed top-20 z-50">
                    {err.response.data.message}
                </Alert>
            )}
            {success && (
                <Alert severity="success" className=" fixed top-20 z-50">
                    Logged In Successfully
                </Alert>
            )}
            <div
                className={`${
                    mode == "dark" ? "signin-form" : "signin-form-light"
                } -translate-y-6 bg-white w-[80%] h-[80vh] shadow-2xl px-10 text-white flex items-center justify-center`}
            >
                <div className=" w-[100%] flex-col gap-4 mt-4">
                    <div className="flex flex-col items-center">
                        <div className=" mb-6">
                            <h1 className=" text-3xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 text-transparent bg-clip-text">
                                WELCOME TO BLOG
                            </h1>
                        </div>
                        <form onSubmit={submitHandler} className=" w-[100%]">
                            <div className="flex flex-col gap-2 items-center">
                                <input
                                    type="email"
                                    name=""
                                    id=""
                                    placeholder="Email"
                                    className=" bg-white w-[100%] md:w-[500px] h-10 rounded-md px-4 border-b-4 text-black border-white shadow-md outline-none focus-within:border-green-500 focus:invalid:border-red-500"
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                />
                                <input
                                    type="password"
                                    name=""
                                    id=""
                                    placeholder="Password"
                                    className=" bg-white w-[100%] md:w-[500px] h-10 rounded-md px-4 text-black shadow-md outline-none"
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
                                    } border w-[100%] md:w-[500px] px-4 py-2 rounded-md  transition-all duration-200 active:scale-90`}
                                >
                                    SIGN IN
                                </button>
                                <Link
                                    href="/register"
                                    className={`${
                                        mode == "dark"
                                            ? "text-white"
                                            : "text-black"
                                    } flex gap-2 hover:gap-4 justify-center items-center self-end`}
                                >
                                    <p>REGISTER</p>
                                    <EastIcon />
                                </Link>
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
                            className="flex px-4 py-1 gap-2 rounded-md justify-center w-[100%] md:w-[400px] items-center bg-white text-black cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200"
                            onClick={() => {
                                oAuthSignIn("google");
                            }}
                        >
                            <Image src="/google.png" width="30" height="50" />
                            <p>GOOGLE</p>
                        </div>
                        <div
                            className="flex px-4 py-1 gap-2 rounded-md justify-center  w-[100%] md:w-[400px] items-center bg-blue-500 cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200"
                            onClick={() => {
                                oAuthSignIn("facebook");
                            }}
                        >
                            <Image src="/facebook.png" width="30" height="50" />
                            <p>FACEBOOK</p>
                        </div>
                        <div
                            className="flex px-4 py-1 gap-2 rounded-md justify-center  w-[100%] md:w-[400px] items-center bg-black cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200"
                            onClick={() => {
                                oAuthSignIn("github");
                            }}
                        >
                            <Image
                                src="/github-dark.png"
                                width="30"
                                height="50"
                            />
                            <p>GITHUB</p>
                        </div>
                        <div
                            className="flex px-4 py-1 gap-2 rounded-md justify-center  w-[100%] md:w-[400px] items-center bg-blue-500 cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200"
                            onClick={() => {
                                oAuthSignIn("twitter");
                            }}
                        >
                            <Image src="/twitter.png" width="30" height="50" />
                            <p>TWITTER</p>
                        </div>
                    </div>
                </div>
            </div>
        </Smooth>
    );
};

export default SignIn;
