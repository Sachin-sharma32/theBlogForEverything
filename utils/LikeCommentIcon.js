import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { CircularProgress, Tooltip } from "@mui/material";
import { useHandleCommentLike } from "../hooks/useComment";
import { useGetMe } from "../hooks/useUser";
import { useGetComment } from "../hooks/useComment";

const LikeCommentIcon = ({ comments, comment }) => {
    const router = useRouter();
    const mode = useSelector((state) => state.base.mode);
    const [loading, setLoading] = useState(false);
    const [like, setLike] = useState(true);
    const { mutate: handleLike } = useHandleCommentLike();
    const { data: user } = useGetMe();
    let filterLikes = [];
    if (user && comment?.likes?.length > 0) {
        filterLikes = comment?.likes?.filter((item) => {
            return item == user._id;
        });
    }
    useEffect(() => {
        if (filterLikes?.length > 0) {
            setLike(false);
        } else {
            setLike(true);
        }
    }, [filterLikes]);
    return (
        <div
            className={`${
                mode == "dark" ? "text-black" : "text-black"
            } hover:scale-125 duration-200`}
        >
            <div
                onClick={() => {
                    user
                        ? handleLike({
                              commentsId: comments._id,
                              commentId: comment?._id,
                              userId: user?._id,
                          })
                        : router.push("/signin");
                }}
            >
                <Tooltip title="Like" placement="bottom">
                    {like ? (
                        <a className=" text-lg sm:text-2xl hover:scale-125 cursor-pointer animation-effect">
                            <FavoriteBorderIcon />
                        </a>
                    ) : (
                        <a className=" text-lg sm:text-2xl cursor-pointer animation-effect">
                            <FavoriteIcon />
                        </a>
                    )}
                </Tooltip>
                <p
                    style={{ top: "10px" }}
                    className="absolute -right-0 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full text-xs flex items-center justify-center bg-black text-white"
                >
                    {comment?.likes?.length}
                </p>
            </div>
        </div>
    );
};

export default LikeCommentIcon;
