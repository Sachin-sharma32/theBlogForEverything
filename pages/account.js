import { Avatar } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Smooth from "../utils/Smooth";
import * as yup from "yup";
import { Formik, Field, ErrorMessage, Form } from "formik";
import Error from "../utils/Error";
import { client } from "../sanity";
import { useUpdateAccount } from "../hooks/content";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

const Account = () => {
    const mode = useSelector((state) => state.base.mode);
    const user = useSelector((state) => state.base.user);
    const [loading, setLoading] = useState(false);
    console.log(user);
    const [image, setImage] = useState("");
    const URL_REGEX =
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    const validationObject = yup.object({
        name: yup.string().required("This field is required").min(3),
        bio: yup.string().min(50, "Bio should be atleast 50 characters long"),
        websiteURL: yup
            .string()
            .matches(URL_REGEX, "Please provide a valid URL"),
        location: yup
            .string()
            .min(3, "Location should be atleast 5 characters long"),
        work: yup.string().min(3, "Work should be atleast 5 characters long"),
        education: yup
            .string()
            .min(3, "Education should be atleast 5 characters long"),
    });
    const dispatch = useDispatch();
    const uploadImage = (e) => {
        setLoading(true);
        const file = e.target.files[0];
        const allowedTypes = [
            "image/png",
            "image/jpeg",
            "image/webp",
            "image/jpg",
        ];
        if (allowedTypes.includes(file.type)) {
            client.assets
                .upload("file", file, {
                    contentType: file.type,
                    filename: file.name,
                })
                .then((data) => {
                    setLoading(false);
                    setImage(data);
                });
        }
    };
    let img = "";
    if (image) {
        img = image.url;
    } else if (user?.image?.length > 10) {
        img = user?.image;
    } else {
        img = "/person.webp";
    }
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
    const { mutate: updateAccount, error: err } = useUpdateAccount(
        onSuccess,
        onError
    );
    const submitHandler = async (values) => {
        let data;
        if (image) {
            data = {
                values,
                userId: user._id,
                image: {
                    _type: "file",
                    asset: {
                        _type: "reference",
                        _ref: image?._id,
                    },
                },
            };
        } else {
            data = {
                values,
                userId: user._id,
            };
        }
        updateAccount(data);
    };
    const initialValues = {
        name: user?.name,
        email: user?.email,
        websiteURL: user?.websiteURL,
        location: user?.location,
        education: user?.education,
        work: user?.work,
        bio: user?.bio,
        bookmarks: user.bookmarks,
    };
    if (user) {
        return (
            <Smooth
                className={`${
                    mode == "dark" ? "text-white" : "text-black bg-white"
                }  p-10 flex flex-col items-center text-xs min-h-screen`}
            >
                {error && (
                    <div className=" sticky top-20 z-50">
                        <Alert severity="error">
                            {err.response.data.message}
                        </Alert>
                    </div>
                )}
                {success && (
                    <div className="sticky top-20 z-50">
                        <Alert severity="success">
                            Account Updated SuccessFully
                        </Alert>
                    </div>
                )}
                {loading && (
                    <div className="sticky top-1/2 -translate-x-1/2 z-50">
                        <CircularProgress />
                    </div>
                )}
                <div
                    className={`${
                        mode == "dark"
                            ? "bg-[#262626] shadow-black"
                            : "bg-white"
                    } shadow-lg  w-[90vw] md:w-fit h-fit rounded-sm p-4 sm:p-10 relative mt-10`}
                >
                    <div className=" flex items-center justify-center w-20 h-20 overflow-hidden rounded-full absolute -top-10 shadow-md shadow-black left-1/2 -translate-x-1/2">
                        <img src={`${img}`} />
                    </div>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={submitHandler}
                        validateOnBlur={true}
                        validateOnChange={true}
                        validationSchema={validationObject}
                    >
                        {(props) => {
                            return (
                                <Form className=" grid grid-col-1 md:grid-cols-2 gap-10 mt-10 w-[100%]">
                                    <div className="flex flex-col gap-8 w-[100%] items-center sm:items-stretch">
                                        <div className="flex gap-4 items-center">
                                            <p className=" w-[100px] hidden sm:flex">
                                                User Name
                                            </p>
                                            <div className="w-[300px] md:w-[500px]">
                                                <Field
                                                    type="text"
                                                    name="name"
                                                    value={props.values.name}
                                                    placeholder="User Name"
                                                    className=" border-b bg-white w-full  h-10 rounded-md px-4 text-black shadow-md outline-none"
                                                    readonly
                                                />
                                                <ErrorMessage
                                                    name="name"
                                                    component={Error}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex gap-4 items-center">
                                            <p className=" w-[100px] hidden sm:flex">
                                                Email
                                            </p>
                                            <input
                                                readOnly
                                                type="text"
                                                name="email"
                                                value={props.values.email}
                                                placeholder="Email"
                                                className=" bg-gray-200 w-[300px] md:w-[500px] h-10 rounded-md px-4 text-black shadow-md outline-none"
                                            />
                                        </div>
                                        <div className="flex gap-4 items-center">
                                            <p className=" w-[100px] hidden sm:flex">
                                                Bio
                                            </p>
                                            <div className="w-[300px] md:w-[500px]">
                                                <Field
                                                    as="textarea"
                                                    name="bio"
                                                    cols="30"
                                                    rows="5"
                                                    className=" bg-white w-full text-black p-4 mt-4 border-b-2 shadow-sm rounded-md outline-none"
                                                    placeholder="Tell us about yourself"
                                                ></Field>
                                                <ErrorMessage
                                                    name="bio"
                                                    component={Error}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex gap-4 items-center">
                                            <p className=" w-[100px] hidden sm:flex">
                                                Website URL
                                            </p>
                                            <div className="w-[300px] md:w-[500px]">
                                                <Field
                                                    type="text"
                                                    name="websiteURL"
                                                    placeholder="https://www.google.com"
                                                    className=" bg-white w-full h-10 rounded-md px-4 text-black shadow-md outline-none"
                                                />
                                                <ErrorMessage
                                                    name="websiteURL"
                                                    component={Error}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-8 items-center sm:items-stretch">
                                        <div className="flex items-center">
                                            <p className=" w-[100px] hidden sm:flex">
                                                Image
                                            </p>
                                            <div className="relative w-fit">
                                                <input
                                                    type="file"
                                                    onChange={uploadImage}
                                                    className=" absolute opacity-0 w-10 h-12 cursor-pointer"
                                                />

                                                {mode == "dark" ? (
                                                    <Image
                                                        src="/upload.png"
                                                        width="50"
                                                        height="50"
                                                    />
                                                ) : (
                                                    <Image
                                                        src="/upload-dark.png"
                                                        width="50"
                                                        height="50"
                                                    />
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex gap-4 items-center">
                                            <p className=" w-[100px] hidden sm:flex">
                                                Location
                                            </p>
                                            <div className="w-[300px] md:w-[500px]">
                                                <Field
                                                    type="text"
                                                    name="location"
                                                    placeholder="London,England"
                                                    className=" bg-white w-full h-10 rounded-md px-4 text-black shadow-md outline-none"
                                                />
                                                <ErrorMessage
                                                    name="location"
                                                    component={Error}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex gap-4 items-center">
                                            <p className=" w-[100px] hidden sm:flex">
                                                Work
                                            </p>
                                            <div className="w-[300px] md:w-[500px]">
                                                <Field
                                                    type="text"
                                                    name="work"
                                                    placeholder="Senior Software Developer @Google"
                                                    className=" bg-white w-full h-10 rounded-md px-4 text-black shadow-md outline-none"
                                                />
                                                <ErrorMessage
                                                    name="work"
                                                    component={Error}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex gap-4 item-center">
                                            <p className="w-[100px] hidden sm:flex">
                                                Education
                                            </p>
                                            <div className="w-[300px]  md:w-[500px]">
                                                <Field
                                                    type="text"
                                                    name="education"
                                                    placeholder="Bachlors In Computer Science"
                                                    className=" bg-white w-full h-10 rounded-md px-4 text-black shadow-md outline-none"
                                                />
                                                <ErrorMessage
                                                    name="education"
                                                    component={Error}
                                                />
                                            </div>
                                        </div>
                                        <button
                                            className={`${
                                                mode == "light"
                                                    ? "text-white"
                                                    : "text-black"
                                            } transition-all duration-200 bg-gradient-to-r disabled:opacity-60 disabled:hover:scale-100 disabled:active:scale-100 from-pink-500 to-orange-500 w-fit self-end rounded-md p-2 hover:scale-110 active:scale-100 font-semibold`}
                                            type="submit"
                                            disabled={!props.isValid}
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </Form>
                            );
                        }}
                    </Formik>
                </div>
            </Smooth>
        );
    } else {
        return <div className="min-h-screen"></div>;
    }
};

export default Account;
