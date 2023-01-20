import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import WestIcon from "@mui/icons-material/West";

const PageNotFound = () => {
    const router = useRouter;
    const mode = useSelector((state) => state.base.mode);
    return (
        <div
            className={`${
                mode == "dark" ? "bg-[#262626] text-white" : "bg-white"
            } flex justify-center items-center min-h-screen`}
        >
            <div className="-translate-y-10 flex flex-col items-center gap-4">
                <h1 className=" text-5xl font-bold">404</h1>
                <p>
                    <span className=" text-orange-500">http://localhost:3000{router.pathname}</span> does not exist on
                    this website
                </p>
                <div className={`${mode == "light" ? "text-black" : ""}`}>
                    <Link href="/">
                        <div className=" text-xl flex items-center gap-2 cursor-pointer hover:gap-3 transition-all duration-200 justify-center">
                            <WestIcon className="" />
                            <p>Home</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PageNotFound;
