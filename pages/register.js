import Image from "next/image";
import React, { useEffect, useState } from "react";
import Smooth from "../utils/Smooth";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { useOauth } from "../hooks/content";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Error from "../utils/Error";
import EastIcon from "@mui/icons-material/East";
import Link from "next/link";
import {
    Alert,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import Head from "next/head";
import { useLogIn, useRegister } from "../routers/useAuth";
import { setErrorPopup, setMessage, setSuccessPopup } from "../redux/slices";
import { useUpdateUser } from "../routers/useUser";
import CloseIcon from "@mui/icons-material/Close";

const Register = () => {
    const router = useRouter();
    const mode = useSelector((state) => state.base.mode);
    const categories = useSelector((state) => state.base.categories);
    const user = useSelector((state) => state.base.user);
    const [preferences, setPreferences] = useState([]);
    const [showDialog, setShowDialog] = useState(false);

    const PASSWORD_REGEX =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const EMAIL_REGEX =
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const validationObject = yup.object({
        name: yup
            .string()
            .required("REQUIRED")
            .min(3, "Name should be atleast 3 characters long"),
        email: yup
            .string()
            .matches(EMAIL_REGEX, "INVALID EMAIL")
            .required("REQUIRED"),
        password: yup
            .string()
            .matches(PASSWORD_REGEX, "PROVIDE STRONGER PASSWORD")
            .required("REQUIRED"),
        passwordConfirm: yup
            .string()
            .required("REQUIRED")
            .when("password", {
                is: (val) => (val && val.length > 0 ? true : false),
                then: yup
                    .string()
                    .oneOf([yup.ref("password")], "PASSWORD MISMATCH"),
            }),
    });
    const initialValues = {
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
    };
    const dispatch = useDispatch();
    const onSuccess = () => {
        dispatch(setSuccessPopup(true));
        dispatch(setMessage("A verification link has been sent to your email"));
        setTimeout(() => {
            router.push("/signin");
        }, 2000);
    };
    const onError = (err) => {
        dispatch(setErrorPopup(true));
        dispatch(setMessage(err.response.data.message));
    };
    const { mutate: register } = useRegister(onSuccess, onError);
    const submitHandler = async (values) => {
        const user = {
            name: values.name,
            email: values.email,
            password: values.password,
        };
        register(user);
    };

    const onLogInSuccess = (data) => {
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
    const onLogInError = (err) => {
        dispatch(setErrorPopup(true));
        dispatch(setMessage(err.response.data.message));
    };

    const { data: session } = useSession();
    const { mutate: login } = useLogIn(onLogInSuccess, onLogInError);
    useEffect(() => {
        if (session) {
            const data = {
                name: session.user.name,
                email: session.user.email,
                oAuth: true,
            };
            login(data);
        }
    }, [session]);

    const onUpdateSuccess = () => {
        router.push("/");
    };
    const { mutate: updateUser } = useUpdateUser(onUpdateSuccess);
    const addPreferences = async () => {
        const userData = { data: { ...user, preferences }, userId: user._id };
        updateUser(userData);
    };

    const oAuthSignIn = async (provider) => {
        if (provider === "twitter") {
            dispatch(setErrorPopup(true));
            dispatch(setMessage("TWITTER IS NOT FUNCTIONAL CURRENTLY"));
        } else {
            await signIn(provider).then((session) => {});
        }
    };

    return (
        <>
            <Smooth
                className={`${mode == "light" ? "bg-white" : ""}   flex
            justify-center
            items-center
            text-xs
            min-h-screen`}
            >
                <Dialog open={showDialog}>
                    <DialogTitle>CHOOSE YOUR PREFERENCES</DialogTitle>
                    <DialogContent>
                        <DialogContentText className="flex gap-1 mb-10 flex-wrap">
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
                <div
                    className={`${
                        mode == "dark" ? "signin-form" : "signin-form-light"
                    } -translate-y-6 bg-white w-[80%] min-h-[80vh] py-4 shadow-2xl px-10 text-white flex items-center justify-center`}
                >
                    <div className="flex-col gap-4 mt-4 items-center justify-center">
                        <div className="flex flex-col items-center">
                            <div className=" mb-6">
                                <h1 className=" text-center text-3xl font-bold bg-gradient-to-r from-[#ff7d69] to-blue-700 text-transparent bg-clip-text">
                                    WELCOME TO TBFE
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
                                        <Form className="flex flex-col gap-2 items-center w-[100%]">
                                            <div className="relative h-12  w-[100%]">
                                                <Field
                                                    type="text"
                                                    name="name"
                                                    placeholder="Name"
                                                    className=" bg-white  w-[100%] md:w-[400px] h-10 rounded-2xl px-4 text-black shadow-md outline-none"
                                                />
                                                <ErrorMessage
                                                    name="name"
                                                    component={Error}
                                                />
                                            </div>
                                            <div className="relative h-12  w-[100%]">
                                                <Field
                                                    type="text"
                                                    name="email"
                                                    placeholder="Email"
                                                    className=" bg-white  w-[100%] md:w-[400px] h-10 rounded-2xl px-4 text-black shadow-md outline-none"
                                                />
                                                <ErrorMessage
                                                    name="email"
                                                    component={Error}
                                                />
                                            </div>
                                            <div className="relative h-12  w-[100%]">
                                                <Field
                                                    type="text"
                                                    name="password"
                                                    placeholder="Password"
                                                    className=" bg-white  w-[100%] md:w-[400px] h-10 rounded-2xl px-4 text-black shadow-md outline-none"
                                                />
                                                <ErrorMessage
                                                    name="password"
                                                    component={Error}
                                                />
                                            </div>
                                            <div className="relative h-12  w-[100%]">
                                                <Field
                                                    type="text"
                                                    name="passwordConfirm"
                                                    placeholder="passwordConfirm"
                                                    className=" bg-white  w-[100%] md:w-[400px] h-10 rounded-2xl px-4 text-black shadow-md outline-none"
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
                                                }  border w-[100%] md:w-[400px] px-4 py-2 rounded-2xl  transition-all duration-200 valid:active:scale-90 disabled:bg-gray-500`}
                                            >
                                                REGISTER
                                            </button>
                                            <Link
                                                href="/signin"
                                                className={`${
                                                    mode == "dark"
                                                        ? "text-white"
                                                        : "text-black"
                                                } flex gap-2 hover:gap-4 justify-center items-center self-end duration-200 transition-all`}
                                            >
                                                <p>SIGN IN</p>
                                                <EastIcon />
                                            </Link>
                                        </Form>
                                    );
                                }}
                            </Formik>
                        </div>
                        <div
                            className={`${
                                mode == "dark" ? "text-white" : "text-black"
                            } mt-5 text-center`}
                        >
                            OR
                        </div>
                        <div className=" mt-6 items-center grid grid-cols-1 sm:grid-cols-2 justify-center justify-items-center gap-4 w-[100%]">
                            <div
                                onClick={() => {
                                    oAuthSignIn("google");
                                }}
                                className="flex px-4 py-1 gap-2 rounded-2xl justify-center w-[100%] sm:w-[150px] items-center bg-white text-black cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200"
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
                                onClick={() => {
                                    oAuthSignIn("facebook");
                                }}
                                className="flex px-4 py-1 gap-2 rounded-2xl justify-center w-[100%] sm:w-[150px] items-center bg-blue-500 cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200"
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
                                onClick={() => {
                                    oAuthSignIn("github");
                                }}
                                className=" border-2 border-gray-500 flex px-4 py-1 gap-2 rounded-2xl justify-center w-[100%] sm:w-[150px] items-center bg-black cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200"
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
                                onClick={() => {
                                    oAuthSignIn("twitter");
                                }}
                                className="flex px-4 py-1 gap-2 rounded-2xl justify-center w-[100%] sm:w-[150px] items-center bg-blue-500 cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200"
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
        </>
    );
};

export default Register;

Register.getInitialProps = async (context) => {
    return {
        title: "Register | TEFE",
        image: "/site-light-chopped.jpg",
        summery:
            "Register to TEFE to get access to all the features of the site",
        keywords:
            "register, sign in, sign up, login, TBFE, tech, tech blog, the blog for everyone",
        type: "website",
        imageAlt: "The Blog For Everything log",
        parameter: "register",
    };
};
