import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

export const useGetAuthors = (onSuccess, onError) => {
    return useQuery(
        "allAuthors",
        () => {
            return axios.get(`http://localhost:8000/api/v1/users`);
        },
        {
            onSuccess: onSuccess,
            onError: onError,
            select: (data) => {
                const users = data.data.data.docs;
                const authors = users.filter((user) => user.isAdmin);
                return authors;
            },
        }
    );
};

export const useGetUsers = (onSuccess, onError) => {
    return useQuery(
        "allUsers",
        () => {
            return axios.get(`http://localhost:8000/api/v1/users`);
        },
        {
            onSuccess: onSuccess,
            onError: onError,
            select: (data) => {
                const users = data.data.data.docs.filter(
                    (user) => !user.isAdmin
                );
                return users;
            },
        }
    );
};

export const useGetUser = (onSuccess, onError) => {
    return useQuery(
        "user",
        (userId) => {
            return axios.get(`http://localhost:8000/api/v1/users/${userId}`);
        },
        {
            onSuccess: onSuccess,
            onError: onError,
        }
    );
};

export const useDeleteUser = (onSuccess, onError) => {
    const queryClient = useQueryClient();
    return useMutation(
        "deleteUser",
        (userId) => {
            return axios.delete(`http://localhost:8000/api/v1/users/${userId}`);
        },
        {
            onError: onError,
            onSuccess: (data) => {
                queryClient.invalidateQueries(["allUsers"]);
                queryClient.invalidateQueries(["allAuthors"]);
                queryClient.invalidateQueries(["user"]);
                onSuccess();
            },
        }
    );
};

export const useUpdateUser = (onSuccess, onError) => {
    const queryClient = useQueryClient();
    return useMutation(
        "updateUser",
        (data) => {
            return axios.patch(
                `http://localhost:8000/api/v1/users/${data.userId}`,
                data.data
            );
        },
        {
            onError: onError,
            onSuccess: (data) => {
                queryClient.invalidateQueries(["allUsers"]);
                queryClient.invalidateQueries(["allAuthors"]);
                queryClient.invalidateQueries(["user"]);
                onSuccess();
            },
        }
    );
};

export const useGetMe = (onSuccess, onError) => {
    return useQuery(
        "me",
        () => {
            return axios.get(`http://localhost:8000/getMe`);
        },
        {
            select: (data) => {
                const user = data.data.data.user;
                return user;
            },
            onSuccess: onSuccess,
            onError: onError,
        }
    );
};

export const useUserLikes = (onSuccess, onError) => {
    return useQuery(
        "userLikes",
        (userId) => {
            return axios.get(
                `http://localhost:8000/api/v1/users/userLikes/${userId}`
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
