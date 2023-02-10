import Image from "next/image";
import React, { useEffect, useState } from "react";
import Smooth from "../../utils/Smooth";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { Alert, Snackbar } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import Link from "next/link";
import Head from "next/head";
import { useLogIn, useResetPassword } from "../../hooks/useAuth";
import Login from "@mui/icons-material/Login";
import { Layer } from "@sanity/ui";
import Layout from "../../components/Layout";
import { setErrorPopup, setSuccessPopup } from "../../redux/slices";

const ResetPassword = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    let { token } = router.query;
    token = token[0];
    const mode = useSelector((state) => state.base.mode);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const onSuccess = () => {
        dispatch(setSuccessPopup(true));
        dispatch(setMessage("Password Reset Successfully"));
    };
    const onError = (err) => {
        dispatch(setErrorPopup(true));
        dispatch(setMessage(err.response.data.message));
    };
    const { mutate: resetPassword } = useResetPassword(onSuccess, onError);
    const submitHandler = async (e) => {
        e.preventDefault();
        const user = { email, password };
        resetPassword({ token, user });
    };

    const { data: session } = useSession();

    return (
        <Layout>
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
                    } -translate-y-6 bg-white w-[80%] h-[80vh] shadow-2xl px-10 text-white flex items-center justify-center`}
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
                                        RESET PASSWORD
                                    </button>
                                    <div className="flex justify-between w-full">
                                        <Link
                                            href="/signin"
                                            className={`${
                                                mode == "dark"
                                                    ? "text-white"
                                                    : "text-black"
                                            } flex gap-2 hover:gap-4 justify-center items-center self-end transition-all duration-200`}
                                        >
                                            <p>SIGN IN</p>
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
                    </div>
                </div>
            </Smooth>
        </Layout>
    );
};

export default ResetPassword;
