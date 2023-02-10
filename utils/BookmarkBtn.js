import React, { useEffect, useState } from "react";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "@mui/material";
import { useHandleBookmark } from "../routers/useUser";

const BookmarkBtn = ({ post, setSuccess }) => {
    const mode = useSelector((state) => state.base.mode);
    const [exist, setExist] = useState(false);
    const user = useSelector((state) => state.base.user);

    useEffect(() => {
        if (user && post) {
            user.bookmarks.map((bookmark) => {
                if (bookmark == post._id) {
                    setExist(true);
                }
            });
        }
    }, [post, user]);

    const onSuccess = (data) => {
        setExist((current) => !current);
    };
    const onError = (error) => {};
    const { mutate: toggleBookmark } = useHandleBookmark(onSuccess, onError);
    return (
        <div
            className={`${
                mode == "dark" ? "text-white" : "text-black"
            } hover:scale-125 duration-200 flex justify-center items-center`}
        >
            <div
                onClick={() => {
                    user
                        ? toggleBookmark({ postId: post._id, userId: user._id })
                        : router.push("/signin");
                }}
            >
                <Tooltip title="Bookmark" placement="bottom">
                    {exist ? (
                        <a className=" hover:scale-125 transition-all duration-200 cursor-pointer animation-effect">
                            <BookmarkIcon style={{ color: "#15c39a" }} />
                        </a>
                    ) : (
                        <a className="hover:scale-125 transition-all duration-200 cursor-pointer animation-effect">
                            <BookmarkBorderIcon />
                        </a>
                    )}
                </Tooltip>
            </div>
        </div>
    );
};

export default BookmarkBtn;
