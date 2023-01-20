import Image from "next/image";
import React, { useEffect, useState } from "react";
import Smooth from "../utils/Smooth";
import axios from "axios";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { useOauth, useRegister } from "../hooks/content";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Error from "../utils/Error";
import { PropaneSharp } from "@mui/icons-material";
import ErrorModel from "../utils/ErrorModel";

const register = () => {
    const router = useRouter();
    const mode = useSelector((state) => state.base.mode);

    const PASSWORD_REGEX =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const EMAIL_REGEX =
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const validationObject = yup.object({
        name: yup
            .string()
            .required("This field is required")
            .min(3, "Name should be atleast 3 characters long"),
        email: yup
            .string()
            .matches(EMAIL_REGEX, "Please provide a valid email address")
            .required("This field is required"),
        password: yup
            .string()
            .matches(PASSWORD_REGEX, "Please provide a stronger password")
            .required("This field is required"),
        passwordConfirm: yup
            .string()
            .required()
            .when("password", {
                is: (val) => (val && val.length > 0 ? true : false),
                then: yup
                    .string()
                    .oneOf([yup.ref("password")], "passwords does not match"),
            }),
    });
    const initialValues = {
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
    };
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const onSuccess = () => {
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
        }, 2000);
    };
    const onError = () => {
        setError(true);
        setTimeout(() => {
            setError(false);
        }, 2000);
    };
    const { mutate: register, error: err } = useRegister(onSuccess, onError);
    const submitHandler = async (values) => {
        const user = {
            name: values.name,
            email: values.email,
            password: values.password,
        };
        register(user);
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
            min-h-screen`}
        >
            {error && <ErrorModel>{err.response.data.message}</ErrorModel>}
            <div
                className={`${
                    mode == "dark" ? "signin-form" : "signin-form-light"
                } -translate-y-6 bg-white w-[80%] h-[80vh] shadow-2xl px-10 text-white flex items-center justify-center`}
            >
                <div className="flex-col gap-4 mt-4 items-center justify-center">
                    <div className="flex flex-col items-center">
                        <div className=" mb-6">
                            <h1 className=" text-3xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 text-transparent bg-clip-text">
                                WELCOME TO BLOG
                            </h1>
                        </div>
                        <Formik
                            onSubmit={submitHandler}
                            initialValues={initialValues}
                            validationSchema={validationObject}
                            validateOnBlur={true}
                            validateOnChange={true}
                            className="w-[100%]"
                        >
                            {(props) => {
                                return (
                                    <Form className="flex flex-col gap-2 items-center">
                                        <div className="relative h-12">
                                            <Field
                                                type="text"
                                                name="name"
                                                placeholder="Name"
                                                className=" bg-white  w-[100%] md:w-[400px] h-10 rounded-md px-4 text-black shadow-md outline-none"
                                            />
                                            <ErrorMessage
                                                name="name"
                                                component={Error}
                                            />
                                        </div>
                                        <div className="relative h-12">
                                            <Field
                                                type="text"
                                                name="email"
                                                placeholder="Email"
                                                className=" bg-white  w-[100%] md:w-[400px] h-10 rounded-md px-4 text-black shadow-md outline-none"
                                            />
                                            <ErrorMessage
                                                name="email"
                                                component={Error}
                                            />
                                        </div>
                                        <div className="relative h-12">
                                            <Field
                                                type="text"
                                                name="password"
                                                placeholder="Password"
                                                className=" bg-white  w-[100%] md:w-[400px] h-10 rounded-md px-4 text-black shadow-md outline-none"
                                            />
                                            <ErrorMessage
                                                name="password"
                                                component={Error}
                                            />
                                        </div>
                                        <div className="relative h-12">
                                            <Field
                                                type="text"
                                                name="passwordConfirm"
                                                placeholder="passwordConfirm"
                                                className=" bg-white  w-[100%] md:w-[400px] h-10 rounded-md px-4 text-black shadow-md outline-none"
                                            />
                                            <ErrorMessage
                                                name="passwordConfirm"
                                                component={Error}
                                            />
                                        </div>
                                        <button
                                            disabled={!props.isValid}
                                            type="submit"
                                            className={`${
                                                mode == "dark"
                                                    ? " border-white valid:hover:border-black valid:hover:bg-black hover:text-white"
                                                    : " border-black text-black hover:bg-black hover:text-white"
                                            }  border w-[100%] md:w-[400px] px-4 py-2 rounded-md  transition-all duration-200 valid:active:scale-90 disabled:bg-gray-500`}
                                        >
                                            SIGN IN
                                        </button>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </div>
                    <div className="mt-5 text-center">OR</div>
                    <div className=" mt-6 items-center grid grid-cols-2 justify-center justify-items-center gap-4 w-full">
                        <div
                            onClick={() => {
                                oAuthSignIn("google");
                            }}
                            className="flex px-4 py-1 gap-2 rounded-md justify-center w-[150px] items-center bg-white text-black cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200"
                        >
                            <Image src="/google.png" width="30" height="50" />
                            <p>GOOGLE</p>
                        </div>
                        <div
                            onClick={() => {
                                oAuthSignIn("facebook");
                            }}
                            className="flex px-4 py-1 gap-2 rounded-md justify-center w-[150px] items-center bg-blue-500 cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200"
                        >
                            <Image src="/facebook.png" width="30" height="50" />
                            <p>FACEBOOK</p>
                        </div>
                        <div
                            onClick={() => {
                                oAuthSignIn("github");
                            }}
                            className="flex px-4 py-1 gap-2 rounded-md justify-center w-[150px] items-center bg-black cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200"
                        >
                            <Image
                                src="/github-dark.png"
                                width="30"
                                height="50"
                            />
                            <p>GITHUB</p>
                        </div>
                        <div
                            onClick={() => {
                                oAuthSignIn("twitter");
                            }}
                            className="flex px-4 py-1 gap-2 rounded-md justify-center w-[150px] items-center bg-blue-500 cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200"
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

export default register;
