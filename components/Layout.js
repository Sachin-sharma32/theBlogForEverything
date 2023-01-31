import React from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { useValidateToken } from "../hooks/useAuth";
import axios from "axios";

const Layout = ({ children }) => {
    const [open, setOpen] = React.useState(false);
    const router = useRouter();
    const [cookie, setCookie, removeCookie] = useCookies(["jwt"]);
    axios.defaults.headers.common["Authorization"] = `Bearer ${cookie.jwt}`;
    const onSuccess = () => {
        if (cookie.jwt) {
            if (router.pathname === "/signin") {
                router.push("/");
            }
        }
    };
    useValidateToken(onSuccess);
    return <div>{children}</div>;
};

export default Layout;
