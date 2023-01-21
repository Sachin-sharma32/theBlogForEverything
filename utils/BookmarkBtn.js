import React, { useEffect, useState } from "react";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useGetPosts } from "../hooks/content";
import { setPosts, setUser } from "../redux/slices";
import { Tooltip } from "@mui/material";

const BookmarkBtn = ({ post }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [bookmark, setBookmark] = useState(true);
    const mode = useSelector((state) => state.base.mode);
    const user = useSelector((state) => state.base.user);
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
            const data = { postId: post._id, userId: user._id, bookmark };
            const { data: response } = await axios.put(
                "/api/users/bookmark",
                data
            );
            dispatch(setUser({ ...user, bookmarks: response.bookmarks }));
        } else {
            router.push("/signin");
        }
    };
    return (
        <div className={`${mode == "dark" ? "text-white" : "text-black"} hover:scale-125 duration-200`}>
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
    );
};

export default BookmarkBtn;
