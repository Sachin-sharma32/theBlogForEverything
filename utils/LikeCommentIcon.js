import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Tooltip } from "@mui/material";

const LikeCommentIcon = ({ comment }) => {
    console.log(comment);
    const router = useRouter();
    const mode = useSelector((state) => state.base.mode);
    const user = useSelector((state) => state.base.user);
    const [like, setLike] = useState(true);
    const [likes, setLikes] = useState(comment.likes ? comment.likes : []);
    console.log(likes);
    let filterLikes = [];
    if (user && likes?.length > 0) {
        filterLikes = likes?.filter((item) => {
            return item._ref === user._id;
        });
    }
    useEffect(() => {
        if (filterLikes?.length > 0) {
            setLike(false);
        } else {
            setLike(true);
        }
    }, [filterLikes]);
    const handleLike = async () => {
        if (user) {
            const data = { commentId: comment._id, userId: user._id, like };
            const { data: response } = await axios.put(
                "/api/users/likecomment",
                data
            );
            setLikes(response.likes);
        } else {
            router.push("/signin");
        }
    };
    return (
        <div className={`${mode == "dark" ? "text-black" : "text-black"}`}>
            <Tooltip title="Like" placement="bottom">
                {like ? (
                    <FavoriteBorderIcon
                        className=" hover:scale-125 transition-all duration-200 cursor-pointer"
                        onClick={handleLike}
                    />
                ) : (
                    <FavoriteIcon
                        className=" hover:scale-125 transition-all duration-200 cursor-pointer"
                        onClick={handleLike}
                    />
                )}
            </Tooltip>
            <p className=" bg-gray-500 text-white absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 white w-5 h-5 rounded-full text-xs flex items-center justify-center">
                {likes.length}
            </p>
        </div>
    );
};

export default LikeCommentIcon;
