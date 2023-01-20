import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import Post from "../components/Post";
import Smooth from "../utils/Smooth";
import WestIcon from "@mui/icons-material/West";

const search = () => {
    const router = useRouter();
    const { search } = router.query;
    const mode = useSelector((state) => state.base.mode);
    const posts = useSelector((state) => state.base.posts);
    const filterPosts = posts.filter((post) => {
        return (
            post.title.includes(search) ||
            post.content.includes(search) ||
            post.tag.find((item) => {
                return item.title.toLowerCase() == search.toLowerCase();
            }) ||
            post.category[0].title.includes(search)
        );
    });
    return (
        <Smooth
            className={`${
                mode == "light" ? "bg-white" : ""
            } p-10 flex flex-col justify-center items-center text-sm text-gray-500 min-h-screen`}
        >
            <div>
                {filterPosts.length > 0 ? (
                    <h3 className=" text-3xl text-center mb-10 font-bold">
                        SHOWING RESULTS FOR{" "}
                        <span className=" bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
                            {search?.toUpperCase()}
                        </span>
                    </h3>
                ) : (
                    <div className={`${mode == "light" ? "text-black" : ""}`}>
                        <h3 className=" text-3xl text-center mb-10 font-bold text-red-500">
                            NOT RESULT FOUND FOR {search?.toUpperCase()}
                        </h3>
                        <Link href="/">
                            <div className=" text-xl flex items-center gap-2 cursor-pointer hover:gap-3 transition-all duration-200 justify-center">
                                <WestIcon className="" />
                                <p>Home</p>
                            </div>
                        </Link>
                    </div>
                )}
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">
                {filterPosts.map((post, i) => (
                    <Post key={i} post={post} />
                ))}
            </div>
        </Smooth>
    );
};

export default search;
