import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/slices";

export const useUpdateUser = (onSuccess, onError) => {
    return useMutation(
        "updateUser",
        (data) => {
            console.log(data);
            return axios.patch(
                `http://localhost:8000/api/v1/users/${data.userId}`,
                data.data
            );
        },
        {
            onSuccess,
            onError,
        }
    );
};

export const useUserPosts = (userId) => {
    return useQuery(
        "userPosts",
        () => {
            return axios.get(
                `https://theblogforeverything-backend-h8fa.vercel.app/api/v1/users/posts/${userId}`
            );
        },
        {
            enabled: !!userId,
            select: (data) => {
                console.log(data);
                const posts = data.data.data.docs;
                return posts;
            },
        }
    );
};

export const useGetMe = (onSuccess, onError) => {
    const dispatch = useDispatch();
    return useQuery(
        "me",
        () => {
            return axios.get(`http://localhost:8000/getMe`);
        },
        {
            onSuccess: (data) => {
                dispatch(setUser(data.data.data.user));
            },
            onError: onError,
        }
    );
};

export const useGetAllBookmarks = () => {
    return useQuery("allBookmarks", () => {
        return axios.get(
            `http://localhost:8000/api/v1/users/bookmarks/${userId}`
        );
    });
};
export const useGetUserLikes = (userId) => {
    return useQuery("userLikes", () => {
        return axios.get(
            `http://localhost:8000/api/v1/users/userLikes/${userId}`
        );
    });
};

export const useHandleBookmark = (onSuccess, onError) => {
    const queryClient = useQueryClient();
    return useMutation(
        "handleBookmark",
        (data) => {
            return axios.patch(
                `http://localhost:8000/api/v1/users/bookmarks/${data.userId}`,
                { postId: data.postId }
            );
        },
        {
            onSuccess: (data) => {
                // queryClient.invalidateQueries(["bookmarks"]);
                // queryClient.invalidateQueries(["me"]);
                onSuccess();
            },
            onError: onError,
        }
    );
};
