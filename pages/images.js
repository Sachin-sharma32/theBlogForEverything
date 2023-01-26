import * as React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";
import { useSelector } from "react-redux";
import { imageBuilder } from "../sanity";
import { saveAs } from "file-saver";
import Backdrop from "@mui/material/Backdrop";
import CloseIcon from "@mui/icons-material/Close";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { useState } from "react";

const heights = [
    150, 200, 130, 180, 210, 250, 230, 180, 150, 190, 100, 150, 130, 150, 180,
];

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(0.5),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

export default function BasicMasonry() {
    const posts = useSelector((state) => state.base.posts);
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [col, setCol] = useState(4);
    const images = posts.map((post) => {
        return post.image;
    });
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };
    if (typeof window !== "undefined") {
        let width = screen.width;
        if (width < 500) {
            setCol(2);
        } else if (width >= 500 && width <= 1000) {
            setCol(3);
        }
    }
    const mode = useSelector((state) => state.base.mode);
    return (
        <div>
            <p
                className={`${
                    mode === "light" ? "text-black" : "text-white"
                } sm:hidden w-[100%] mt-10 text-center`}
            >
                Not Avaiable on mobile phone
            </p>
            <Box className=" mt-2 max-h-screen overflow-y-scroll image-scrollbar min-h-screen opacity-0 sm:opacity-100">
                <Masonry columns={col} spacing={2}>
                    {images.map(
                        (image, index) =>
                            image != undefined && (
                                <Item
                                    key={index}
                                    sx={{ height: heights[index] }}
                                >
                                    <img
                                        src={imageBuilder(image)}
                                        alt="post image"
                                        className=" h-full w-full rounded-2xl"
                                        onClick={() => {
                                            setSelectedImage(image);
                                            handleToggle();
                                        }}
                                    />
                                </Item>
                            )
                    )}
                </Masonry>
                {images.length > 0 && selectedImage && (
                    <div>
                        <Backdrop
                            sx={{
                                color: "#fff",
                                zIndex: (theme) => theme.zIndex.drawer + 1,
                            }}
                            open={open}
                            onClick={handleClose}
                            className=""
                        >
                            <div className="w-[100%] h-[100%] flex justify-center items-center">
                                <div className=" w-[90%] lg:w-[50%] relative bg-white -translate-y-1/2">
                                    <img
                                        src={imageBuilder(selectedImage)}
                                        alt=""
                                        className=" w-[100%] h-96"
                                    />
                                    <CloseIcon
                                        className=" absolute top-2 right-2 cursor-pointer"
                                        onClick={() => {
                                            handleClose();
                                            setSelectedImage(null);
                                        }}
                                    />
                                    <CloudDownloadIcon
                                        className=" absolute bottom-2 right-2 text-5xl cursor-pointer text-white"
                                        onClick={() => {
                                            saveAs(
                                                `${imageBuilder(
                                                    selectedImage
                                                )}`,
                                                "image.jpg"
                                            );
                                        }}
                                    />
                                </div>
                            </div>
                        </Backdrop>
                    </div>
                )}
            </Box>
        </div>
    );
}
