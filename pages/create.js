import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
const TextEditor = dynamic(() => import("../components/TextEditor"), {
    ssr: false,
});
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { useFormik } from "formik";
import * as yup from "yup";
import { useCreateTag, useCreateUserPost } from "../hooks/content";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { IconButton } from "@mui/material";
import { client } from "../sanity";

const Create = () => {
    const router = useRouter();
    const categoryId = router.query.category;
    const type = router.query.type;
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const tags = useSelector((state) => state.base.tags);
    const [showTagsDialog, setShowTagsDialog] = useState(false);
    const [showReviewDialog, setShowReviewDialog] = useState(false);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState([]);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const [image, setImage] = useState("");
    const user = useSelector((state) => state.base.user);
    console.log("user", user);
    console.log(image);
    const [imageDialog, setImageDialog] = useState(false);

    const validationObject = yup.object({
        title: yup.string().min(3).max(10),
    });

    const onError = (error) => {
        console.log(error);
        setError(true);
        setTimeout(() => {
            setError(false);
        }, 2000);
        setMessage(error.response.data.message);
    };
    const onSuccess = (data) => {
        console.log(data);
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
        }, 2000);
        setMessage("Tag created successfully");
    };
    const { mutate: createTag } = useCreateTag(onSuccess, onError);
    const tagHandler = (values) => {
        if (
            tags.findOne((tag) =>
                tag.toLowerCase().includes(values.title.toLowerCase())
            )
        ) {
            setError(true);
            setMessage("Tag already exists");
            return;
        }
        createTag(values);
    };

    const formik = useFormik({
        initialValues: {
            title: "",
        },
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: tagHandler,
        validationSchema: validationObject,
    });

    console.log(filter);
    useEffect(() => {
        if (tags) {
            if (search != "") {
                console.log(search);
                setFilter(
                    tags.filter((tag) =>
                        tag.title.toLowerCase().includes(search.toLowerCase())
                    )
                );
            } else {
                console.log("tags");
                setFilter(tags);
            }
        }
    }, [search, tags]);

    const uploadImage = (e) => {
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
                    console.log(data);
                    setImage(data.url);
                });
        }
    };

    const onPostSuccess = () => {
        console.log("success");
    };
    const onPostError = () => {
        console.log("error");
    };

    const { mutate: createUserPost } = useCreateUserPost(
        onPostSuccess,
        onPostError
    );
    const createPost = () => {
        const data = {
            title,
            type,
            content,
            image,
            tags: selectedTags,
            category: categoryId,
            userId: user._id,
        };
        createUserPost(data);
    };

    return (
        <div className=" min-h-[90vh] flex-col relative mt-2">
            {showTagsDialog && (
                <div className=" fixed left-0 top-0 h-screen z-50 w-screen backdrop-blur-sm flex justify-center items-center">
                    <div className="flex flex-col p-10  bg-white w-[500px] h-[500px] overflow-y-scroll gap-4 relative">
                        {success && (
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-green-500 text-white p-4">
                                {message}
                            </div>
                        )}
                        {error && (
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-red-500 text-white p-4">
                                {message}
                            </div>
                        )}
                        <h3 className="text-2xl font-bold">CHOOSE TAGS (3)</h3>
                        <input
                            type="text"
                            placeholder="Search"
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                            className="border-b border-black bg-white outline-none w-[70%]"
                        />
                        <div className="flex gap-2">
                            <input
                                type="text"
                                name="title"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                onBlue={formik.handleBlur}
                                placeholder="Create A Tag"
                                className="border-b border-black bg-white outline-none w-[70%]"
                            />
                            <button
                                type="submit"
                                disabled={!formik.isValid}
                                onClick={formik.handleSubmit}
                                className=" cursor-pointer bg-black text-white w-6 h-6 flex justify-center items-center transition-all duration-300 rounded-full active:scale-90"
                            >
                                <AddIcon />
                            </button>
                        </div>
                        <div className="flex flex-wrap text-sm gap-2">
                            {filter?.map((tag, i) => (
                                <div
                                    onClick={() => {
                                        if (
                                            selectedTags.find(
                                                (item) => item._id === tag._id
                                            )
                                        ) {
                                            setSelectedTags(
                                                selectedTags.filter(
                                                    (item) =>
                                                        item._id !== tag._id
                                                )
                                            );
                                        } else {
                                            if (selectedTags.length < 3) {
                                                setSelectedTags([
                                                    ...selectedTags,
                                                    { ...tag, _key: i + 1 },
                                                ]);
                                            }
                                        }
                                    }}
                                    key={i}
                                    className={`${
                                        selectedTags.find(
                                            (item) => item._id === tag._id
                                        )
                                            ? "bg-white text-black"
                                            : "bg-black text-white"
                                    } border-2 px-4 rounded-full disabled:bg-gray-500  py-1 hover:bg-white border-black hover:text-black cursor-pointer transition-all duration-300`}
                                >
                                    {tag?.title}
                                </div>
                            ))}
                        </div>
                        <button
                            disabled={selectedTags.length < 3}
                            onClick={() => {
                                setShowTagsDialog(false);
                                setImageDialog(true);
                            }}
                            className=" sticky bottom-4 left-4 w-fit bg-gradient-to-r text-white from-[#ff7d69] to-blue-700 px-6 rounded-full active:scale-90 transition-all duration-300"
                        >
                            Next
                        </button>
                        <button
                            className=" absolute top-4 right-4"
                            onClick={() => {
                                setShowTagsDialog(false);
                                if (typeof window != "undefined") {
                                    document.body.style.height = "fit-content";
                                    document.body.style.overflow = "";
                                }
                            }}
                        >
                            <CloseIcon />
                        </button>
                    </div>
                </div>
            )}
            {imageDialog && (
                <div className=" fixed left-0 top-0 h-screen z-50 w-screen backdrop-blur-sm flex justify-center items-center">
                    <div className="flex flex-col p-10 bg-white shadow-2xl h-[300px] w-[500px] gap-4 rounded-3xl relative">
                        <h3 className="text-2xl font-bold text-center">
                            CHOOSE BANNER IMAGE
                        </h3>
                        <IconButton
                            aria-label="upload picture"
                            component="label"
                            size="large"
                            sx={{
                                width: "fit-content",
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                            }}
                            className=" -translate-x-1/2 -translate-y-1/2 z-50"
                        >
                            <input
                                hidden
                                accept="image/*"
                                type="file"
                                onChange={uploadImage}
                            />
                            <CameraAltIcon size="large" className="text-5xl" />
                        </IconButton>
                        <button
                            className={`${
                                image ? "text-white" : "text-black"
                            } absolute top-4 right-4 z-50`}
                            onClick={() => {
                                setImageDialog(false);
                                if (typeof window != "undefined") {
                                    document.body.style.height = "fit-content";
                                    document.body.style.overflow = "";
                                }
                            }}
                        >
                            <CloseIcon />
                        </button>
                        <button
                            onClick={() => {
                                createPost();
                                setImageDialog(false);
                                if (typeof window != "undefined") {
                                    document.body.style.height = "fit-content";
                                    document.body.style.overflow = "";
                                }
                            }}
                            className=" absolute bottom-4 right-4 z-50 w-fit bg-gradient-to-r text-white from-[#ff7d69] to-blue-700 px-6 rounded-full active:scale-90 transition-all duration-300"
                        >
                            CREATE POST
                        </button>
                        {image && (
                            <img
                                src={image}
                                className=" absolute top-0 left-0 h-full w-full z-40"
                            />
                        )}
                    </div>
                </div>
            )}
            <div className=" w-[100%] bg-white flex flex-col gap-10 items-center pt-10">
                <input
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                    className="border-b border-black bg-white outline-none text-2xl w-[70%]"
                    placeholder="Title"
                />
                <TextEditor content={content} setContent={setContent} />
                <button
                    onClick={() => {
                        setShowTagsDialog(true);
                        if (typeof window !== "undefined") {
                            document.body.style.height = "100vh";
                            document.body.style.overflow = "hidden";
                        }
                    }}
                    className=" absolute bottom-20 right-10 bg-black text-white px-10 rounded-full hover:bg-white border-black hover:text-black border transition-all duration-300"
                >
                    Save
                </button>
            </div>
        </div>
    );
};
export default Create;
