import Head from "next/head";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Post from "../components/Post";
import { useGetMe } from "../hooks/useUser";
import ErrorBoundry from "../utils/ErrorBoundry";
import Smooth from "../utils/Smooth";

const Bookmark = () => {
    const mode = useSelector((state) => state.base.mode);
    const { data: user } = useGetMe();
    return (
        <>
            <Head>
                <title>TBFE - Bookmarks</title>
                <link
                    rel="icon"
                    type="image/png"
                    href="/site-light-chopped.jpg"
                />
            </Head>
            <Smooth
                className={`${
                    mode == "light" ? "bg-white" : ""
                } p-10 flex flex-col items-center text-sm text-gray-500 min-h-screen pb-20`}
            >
                <div>
                    <h3 className=" text-3xl text-center mb-10 bg-gradient-to-r from-[#ff7d69] to-blue-700 bg-clip-text text-transparent font-bold">
                        MY BOOKMARKS
                    </h3>
                </div>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">
                    {user?.bookmarks?.map((post, i) => (
                        <ErrorBoundry key={i}>
                            <Post post={post} />
                        </ErrorBoundry>
                    ))}
                </div>
                {user?.bookmarks?.length === 0 && (
                    <div className="bg-red-500 text-black p-4 absolute top-40 font-bold">
                        THERE ARE NO BOOKMARKS
                    </div>
                )}
            </Smooth>
        </>
    );
};

export default Bookmark;
