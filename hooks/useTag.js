import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

export const useGetTags = (onSuccess, onError) => {
    return useQuery(
        "tags",
        () => {
            return axios.get(`http://localhost:8000/api/v1/tags`);
        },
        {
            onSuccess: onSuccess,
            onError: onError,
            select: (data) => {
                const tags = data.data.data.docs;
                return tags;
            },
        }
    );
};

export const useGetTag = (onSuccess, onError) => {
    return useQuery(
        "tag",
        (tagId) => {
            return axios.get(`http://localhost:8000/api/v1/tags/${tagId}`);
        },
        {
            onSuccess: onSuccess,
            onError: onError,
        }
    );
};

