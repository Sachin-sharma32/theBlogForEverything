import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

export const useGetPosts = (onSuccess, onError) => {
    return useQuery(
        "posts",
        () => {
            return axios.get(`http://localhost:8000/api/v1/posts`);
        },
        {
            onSuccess: onSuccess,
            onError: onError,
            select: (data) => {
                const posts = data.data.data.docs;
                return posts;
            },
        }
    );
};

export const useGetPost = (postId, onSuccess) => {
    console.log("getPost");
    return useQuery(
        "post",
        () => {
            return axios.get(`http://localhost:8000/api/v1/posts/${postId}`);
        },
        {
            onSuccess: onSuccess,
            enabled: !!postId,
            select: (data) => {
                const post = data.data.data.doc;
                return post;
            },
        }
    );
};

export const useGetBestPost = (onSuccess, onError) => {
    return useQuery(
        "bestPost",
        () => {
            return axios.get(
                `http://localhost:8000/api/v1/posts/bestPost/best`
            );
        },
        {
            onSuccess: onSuccess,
            onError: onError,
            select: (data) => {
                const post = data.data.data.doc[0];
                return post;
            },
        }
    );
};
