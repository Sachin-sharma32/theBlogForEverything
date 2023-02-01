import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { setCategories, setPosts, setTags, setUser } from "../redux/slices";
import { client } from "../sanity";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import query from "../queries/getAllPosts";

export const useGetPosts = () => {
    const dispatch = useDispatch();
    return useQuery("posts", () => {
        client.fetch(query).then((data) => {
            dispatch(setPosts(data));
        });
    });
};

export const useSignin = (onSuccess, onError) => {
    const session = useSelector((state) => state.base.session);
    const queryClient = useQueryClient();
    const [cookie, setCookie] = useCookies(["user"]);
    return useMutation(
        "userSignIn",
        (data) => {
            return axios.post("/api/users/signin", data, {
                headers: {
                    authorization: `Bearer ${session}`,
                },
            });
        },
        {
            onSuccess: (data) => {
                queryClient.invalidateQueries({ queryKey: ["getMe"] });
                if (data.data.cookie) {
                    setCookie("user", JSON.stringify(data.data.cookie), {
                        path: "/",
                        maxAge: 3600,
                        sameSite: true,
                    });
                }
                onSuccess();
            },
            onError: onError,
        }
    );
};
export const useRegister = (onSuccess, onError) => {
    const session = useSelector((state) => state.base.session);
    const queryClient = useQueryClient();
    return useMutation(
        "userSignIn",
        (user) => {
            return axios.post("/api/users/register", user);
        },
        {
            onSuccess: onSuccess,
            onError: onError,
        }
    );
};

export const useGetMe = () => {
    const session = useSelector((state) => state.base.session);
    const posts = useSelector((state) => state.base.posts);
    const dispatch = useDispatch();
    return useQuery(
        "getMe",
        () => {
            return axios.get("/api/users/getMe", {
                headers: {
                    authorization: `Bearer ${session}`,
                },
            });
        },
        {
            enabled: !!session,
            onSuccess: (data) => {
                dispatch(setUser(data.data.user));
            },
        }
    );
};

export const useUpdateAccount = (onSuccess, onError) => {
    const queryClient = useQueryClient();
    return useMutation(
        "updateAccount",
        (data) => {
            return axios.put("/api/users/updateuser", data);
        },
        {
            onSuccess: (data) => {
                queryClient.invalidateQueries("getMe");
                onSuccess();
            },
            onError: onError,
        }
    );
};

export const useOauth = () => {
    const queryClient = useQueryClient();
    const router = useRouter();
    const [cookie, setCookie] = useCookies(["user"]);
    return useMutation(
        "oauth",
        (data) => {
            return axios.post("/api/users/oauth", data);
        },
        {
            onSuccess: (data) => {
                queryClient.invalidateQueries("getMe");
                if (data.data.token) {
                    setCookie("user", JSON.stringify(data.data.token), {
                        path: "/",
                        maxAge: 3600,
                        sameSite: true,
                    });
                }
            },
        }
    );
};

export const useGetTags = () => {
    const dispatch = useDispatch();
    return useQuery(
        "getTags",
        () => {
            return axios.post("/api/users/tags");
        },
        {
            onSuccess: (data) => {
                dispatch(setTags(data.data));
            },
        }
    );
};
