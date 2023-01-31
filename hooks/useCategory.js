import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

export const useGetCategories = (onSuccess, onError) => {
    return useQuery(
        "getCategories",
        () => {
            return axios.get(`http://localhost:8000/api/v1/categories`);
        },
        {
            onSuccess: onSuccess,
            onError: onError,
            select: (data) => {
                const categories = data.data.data.docs;
                return categories;
            },
        }
    );
};

export const useGetCategory = (onSuccess, onError) => {
    return useQuery(
        "getCategory",
        (categoryId) => {
            return axios.get(
                `http://localhost:8000/api/v1/categories/${categoryId}`
            );
        },
        {
            onSuccess: onSuccess,
            onError: onError,
        }
    );
};
