import { useQuery, useMutation } from "react-query";
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
                data.preferences
            );
        },
        {
            onSuccess,
            onError,
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
export const useHandleBookmark = (onSuccess, onError) => {
    return useMutation(
        "handleBookmark",
        (userId) => {
            return axios.patch(
                `http://localhost:8000/api/v1/users/bookmarks/${userId}`,
                data
            );
        },
        {
            onSuccess,
            onError,
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
