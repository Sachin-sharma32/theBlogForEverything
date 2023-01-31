import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { useGetBestPost } from "./usePost";

export const useLogIn = (onSuccess, onError) => {
    const [cookie, setCookie] = useCookies(["jwt"]);
    const queryClient = useQueryClient();
    return useMutation(
        "login",
        (data) => {
            return axios.post(`http://localhost:8000/api/v1/auth/login`, data);
        },
        {
            onSuccess: (data) => {
                queryClient.invalidateQueries("getMe");
                setCookie("jwt", JSON.stringify(data.data.data.token), {
                    path: "/",
                    maxAge: 60 * 60 * 24 * 7,
                    sameSite: true,
                });
                onSuccess();
            },
            onError: onError,
        }
    );
};

export const useLogOut = (onSuccess, onError) => {
    const [cookie, setCookie, removeCookie] = useCookies(["jwt"]);
    const router = useRouter();
    const queryClient = useQueryClient();
    return useMutation(
        "logout",
        () => {
            setCookie("jwt", null, {
                path: "/",
                maxAge: 0,
                sameSite: true,
            });
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries("getMe");
                router.push("/");
                queryClient.invalidateQueries("validateToken");
                onSuccess();
            },
            onError: onError,
        }
    );
};

export const useValidateToken = (onSuccess, onError) => {
    const router = useRouter();
    const [cookie, setCookie] = useCookies(["jwt"]);
    return useQuery(
        "validateToken",
        () => {
            if (cookie.jwt) {
                return true;
            } else {
                // router.push("/signin");
            }
        },
        {
            onError: onError,
            onSuccess: onSuccess,
        }
    );
};
