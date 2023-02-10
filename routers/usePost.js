import { useQuery, useMutation } from "react-query";
import axios from "axios";
import { setPosts } from "../redux/slices";
import { useDispatch } from "react-redux";

export const useGetBestPost = () => {
    return useQuery(
        "bestPost",
        () => {
            return axios.get("http://localhost:8000/api/v1/posts/bestPost");
        },
        {
            select: (data) => {
                const post = data.data.data.doc;
                return post;
            },
        }
    );
};
export const useGetAllPosts = () => {
    const dispatch = useDispatch();
    return useQuery(
        "allPosts",
        () => {
            return axios.get("http://localhost:8000/api/v1/posts");
        },
        {
            onSuccess: (data) => {
                dispatch(setPosts(data.data.data.docs));
            },
        }
    );
};
export const useCreatePost = (onSuccess, onError) => {
    return useMutation(
        "createPost",
        () => {
            return axios.post("http://localhost:8000/api/v1/posts", data);
        },
        {
            onSuccess,
            onError,
        }
    );
};
export const useHandlePostLike = (onSuccess, onError) => {
    return useMutation("likePost", (postId) => {
        return axios.patch(
            `http://localhost:8000/api/v1/posts/likes/${postId}`
        );
    });
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
