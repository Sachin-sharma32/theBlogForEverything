import Image from "next/image";
import React, { useEffect, useState } from "react";
import Smooth from "../utils/Smooth";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useOauth, useResetPassword, useSignin } from "../hooks/content";
import { signIn, useSession } from "next-auth/react";
import { Alert, Snackbar } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import Link from "next/link";
import Head from "next/head";
import Login from "@mui/icons-material/Login";
import { useFormik, ErrorMessage, Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { setErrorPopup, setMessage, setSuccessPopup } from "../redux/slices";

const ResetPassword = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const mode = useSelector((state) => state.base.mode);
    const onSuccess = () => {
        dispatch(setSuccessPopup(true));
        dispatch(setMessage("Password reset successfully."));
    };
    const onError = (err) => {
        dispatch(setErrorPopup(true));
        dispatch(setMessage("Something went wrong."));
    };

    const { mutate: resetPassword } = useResetPassword(onSuccess, onError);
    const submitHandler = (values) => {
        const user = {
            ...values,
            email: router.query.email,
        };
        resetPassword(user);
    };

    const PASSWORD_REGEX =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    return (
        <div>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                onClose={() => {
                    setSuccess(false);
                }}
                open={success}
                autoHideDuration={5000}
            >
                <Alert
                    severity="success"
                    onClose={() => {
                        setSuccess(false);
                    }}
                >
                    {message}
                </Alert>
            </Snackbar>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                onClose={() => {
                    setError(false);
                }}
                open={error}
                autoHideDuration={5000}
            >
                <Alert
                    severity="error"
                    onClose={() => {
                        setError(false);
                    }}
                >
                    {message}
                </Alert>
            </Snackbar>
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
                                    RESET PASSWORD
                                </h1>
                            </div>
                            <Formik
                                initialValues={{
                                    password: "",
                                    passwordConfirm: "",
                                }}
                                validationSchema={Yup.object({
                                    password: Yup.string()
                                        .matches(
                                            PASSWORD_REGEX,
                                            "Provide a stronger password"
                                        )
                                        .min(8, "Must be 8 characters or more")
                                        .required("Required"),
                                    passwordConfirm: Yup.string()
                                        .oneOf(
                                            [Yup.ref("password"), null],
                                            "Passwords must match"
                                        )
                                        .required("Required"),
                                })}
                                onSubmit={(values) => {
                                    submitHandler(values);
                                }}
                                validateOnBlur={true}
                                validateOnChange={true}
                            >
                                {(props) => (
                                    <Form className="flex flex-col gap-2 items-center">
                                        <div className="flex flex-col">
                                            <Field
                                                type="password"
                                                name="password"
                                                placeholder="Password"
                                                className=" bg-white w-[100%] md:w-[500px] h-10 rounded-2xl px-4 border-b-4 text-black border-white shadow-md outline-none focus-within:border-green-500 focus:invalid:border-red-500"
                                            />
                                            <div className=" text-red-500 text-center h-6">
                                                <ErrorMessage name="password" />
                                            </div>
                                        </div>
                                        <div className="flex flex-col">
                                            <Field
                                                type="passwordConfirm"
                                                name="passwordConfirm"
                                                placeholder="Password Confirm"
                                                className=" bg-white w-[100%] md:w-[500px] h-10 rounded-2xl px-4 border-b-4 text-black border-white shadow-md outline-none focus-within:border-green-500 focus:invalid:border-red-500"
                                            />
                                            <div className=" text-red-500 text-center h-6">
                                                <ErrorMessage name="passwordConfirm" />
                                            </div>
                                        </div>
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
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </Smooth>
        </div>
    );
};

export default ResetPassword;
