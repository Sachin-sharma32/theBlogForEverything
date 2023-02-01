import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery,
} from "react-query";
import axios from "axios";

export const useGetPosts = (pageNumber, sort) => {
    return useQuery(
        "posts",
        () => {
            console.log(pageNumber);
            return axios.get(
                `http://localhost:8000/api/v1/posts?page=${pageNumber}&limit=12&sort=${sort}`
            );
        },
        {
            onSuccess: (data) => {
                console.log(data);
            },
            select: (data) => {
                const posts = data.data.data.docs;
                return posts;
            },
        }
    );
};

export const useGetPost = (postId, onSuccess) => {
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

export const useTotalDocuments = () => {
    return useQuery(
        "totalDocuments",
        () => {
            return axios.get(`http://localhost:8000/api/v1/posts/total`);
        },
        {
            select: (data) => {
                const totalDocuments = data.data.data.total;
                return totalDocuments;
            },
        }
    );
};

