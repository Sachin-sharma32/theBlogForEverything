import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useGetPosts } from "../hooks/content";
import { setPosts } from "../redux/slices";
import { Tooltip } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const Like = ({ post, setPostDetails, postDetails }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [like, setLike] = useState(true);
    const mode = useSelector((state) => state.base.mode);
    const user = useSelector((state) => state.base.user);
    const [loading, setLoading] = useState(false);
    let filterLikes = [];
    if (user) {
        filterLikes = postDetails?.likes?.filter((item) => {
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
            setLoading(true);
            const data = { postId: post._id, userId: user._id, like };
            const { data: response } = await axios.put("/api/users/like", data);
            if (response) {
                setPostDetails({ ...post, likes: response.data.likes });
                dispatch(setPosts(response.posts));
                setLoading(false);
            }
        } else {
            router.push("/signin");
        }
    };

    return (
        <div
            className={`${
                mode == "dark" ? "text-white" : "text-black"
            } hover:scale-125 transition-all duration-200`}
        >
            {loading ? (
                <div className=" w-6 h-6 flex justify-center items-center">
                    <CircularProgress size="1rem" color="inherit" />
                </div>
            ) : (
                <div>
                    <Tooltip title="Like" placement="bottom">
                        {like ? (
                            <a onClick={handleLike} className="cursor-pointer">
                                <FavoriteBorderIcon />
                            </a>
                        ) : (
                            <div
                                onClick={handleLike}
                                className="cursor-pointer "
                            >
                                <FavoriteIcon />
                            </div>
                        )}
                    </Tooltip>
                    {postDetails?.likes ? (
                        <p className=" absolute top-0 -right-0 -translate-x-1/2 -translate-y-1/2 bg-gray-500 w-5 h-5 rounded-full text-xs flex items-center justify-center">
                            {postDetails.likes.length}
                        </p>
                    ) : (
                        ""
                    )}
                </div>
            )}
        </div>
    );
};

export default Like;
