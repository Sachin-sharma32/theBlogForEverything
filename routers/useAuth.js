import { useQuery, useMutation } from "react-query";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices";

export const useRegister = (onSuccess, onError) => {
    return useMutation(
        "register",
        (data) => {
            return axios.post(
                "http://localhost:8000/api/v1/auth/verifyEmail",
                data
            );
        },
        {
            onSuccess: onSuccess,
            onError: onError,
        }
    );
};

export const useLogIn = (onSuccess, onError) => {
    const [cookie, setCookie] = useCookies(["jwt"]);
    const dispatch = useDispatch();
    return useMutation(
        "login",
        (data) => {
            return axios.post("http://localhost:8000/api/v1/auth/login", data);
        },
        {
            onSuccess: (data) => {
                console.log(data);
                dispatch(setUser(data.data.data.user));
                setCookie("jwt", JSON.stringify(data.data.data.token), {
                    path: "/",
                    maxAge: 60 * 60 * 24 * 7 * 1000,
                    sameSite: true,
                });
                onSuccess(data);
            },
            onError: onError,
        }
    );
};
export const useLogOut = (onSuccess, onError) => {
    return useMutation(
        "logout",
        (data) => {
            return axios.post("http://localhost:8000/api/v1/auth/logout");
        },
        {
            onSuccess: onSuccess,
            onError: onError,
        }
    );
};
export const useRefresh = (onSuccess, onError) => {
    return useQuery(
        "refresh",
        () => {
            return axios.get("http://localhost:8000/api/v1/auth/refresh");
        },
        {
            onSuccess: onSuccess,
            onError: onError,
        }
    );
};
export const useForgotPassword = (onSuccess, onError) => {
    return useMutation(
        "forgotPassword",
        (data) => {
            return axios.post(
                "http://localhost:8000/api/v1/auth/forgotPassword",
                data
            );
        },
        {
            onSuccess: onSuccess,
            onError: onError,
        }
    );
};
export const useResetPassword = (onSuccess, onError) => {
    return useMutation(
        "resetPassword,",
        (resetToken) => {
            return axios.post(
                `http://localhost:8000/api/v1/auth/resetPassword/${resetToken}`
            );
        },
        {
            onSuccess,
            onError,
        }
    );
};
