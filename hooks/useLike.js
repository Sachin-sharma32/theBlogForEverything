import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";

export const useLikes = (onSuccess, onError) => {
    return useQuery(
        "likes",
        (postId) => {
            return axios.get(
                `http://localhost:8000/api/v1/posts/likes/${postId}`
            );
        },
        {
            onSuccess: onSuccess,
            onError: onError,
            select: (data) => {
                const likes = data.data.data.docs;
                return likes;
            },
        }
    );
};

export const useHandleLike = (onSuccess, onError) => {
    const queryClient = useQueryClient();
    return useMutation(
        "addLike",
        (data) => {
            return axios.patch(
                `http://localhost:8000/api/v1/posts/likes/${data.postId}`,
                { userId: data.userId }
            );
        },
        {
            onSuccess: (data) => {
                queryClient.invalidateQueries(["likes"]);
                queryClient.invalidateQueries(["userLikes"]);
                queryClient.invalidateQueries(["post"]);
                onSuccess();
            },
            onError: onError,
        }
    );
};

export const useUserLikes = (userId, onSuccess) => {
    return useQuery(
        "userLikes",
        () => {
            return axios.get(
                `http://localhost:8000/api/v1/users/userLikes/${userId}`
            );
        },
        {
            enabled: !!userId,
            onSuccess: onSuccess,
            select: (data) => {
                const likes = data.data.data.posts;
                return likes;
            },
        }
    );
};
