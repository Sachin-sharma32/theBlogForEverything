import React, { useEffect, useState } from "react";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useGetPosts } from "../hooks/content";
import { setPosts, setUser } from "../redux/slices";
import { Tooltip } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const BookmarkBtn = ({ post, setSuccess }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [bookmark, setBookmark] = useState(true);
    const mode = useSelector((state) => state.base.mode);
    const user = useSelector((state) => state.base.user);
    const [loading, setLoading] = useState(false);
    let filterBookmark = [];
    if (user) {
        filterBookmark = user?.bookmarks?.filter((item) => {
            return item._ref === post?._id;
        });
    }
    useEffect(() => {
        if (filterBookmark?.length > 0) {
            setBookmark(false);
        } else {
            setBookmark(true);
        }
    }, [filterBookmark]);
    const handleBookmark = async () => {
        if (user) {
            setLoading(true);
            const data = { postId: post._id, userId: user._id, bookmark };
            const { data: response } = await axios.put(
                "/api/users/bookmark",
                data
            );
            if (response) {
                dispatch(setUser({ ...user, bookmarks: response.bookmarks }));
                setLoading(false);
                setSuccess(true);
            }
        } else {
            router.push("/signin");
        }
    };
    return (
        <div
            className={`${
                mode == "dark" ? "text-white" : "text-black"
            } hover:scale-125 duration-200 flex justify-center items-center`}
        >
            {loading ? (
                <div className=" w-6 h-6 flex justify-center items-center">
                    <CircularProgress size="1rem" color="inherit" />
                </div>
            ) : (
                <div>
                    <Tooltip title="Bookmark" placement="bottom">
                        {bookmark ? (
                            <a
                                onClick={handleBookmark}
                                className=" hover:scale-125 transition-all duration-200 cursor-pointer animation-effect"
                            >
                                <BookmarkBorderIcon />
                            </a>
                        ) : (
                            <a
                                onClick={handleBookmark}
                                className="hover:scale-125 transition-all duration-200 cursor-pointer animation-effect"
                            >
                                <BookmarkIcon />
                            </a>
                        )}
                    </Tooltip>
                </div>
            )}
        </div>
    );
};

export default BookmarkBtn;
