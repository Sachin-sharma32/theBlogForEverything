import { Avatar } from "@mui/material";
import Link from "next/link";
import { useSelector } from "react-redux";
import moment from "moment/moment";
import Like from "../utils/LikeIcon";
import BookmarkBtn from "../utils/BookmarkBtn";
import { imageBuilder } from "../sanity";

const TopCard = ({ num, post, setLikeSuccess, setBookmarkSuccess }) => {
    const mode = useSelector((state) => state.base.mode);
    console.log(post);
    return (
        <section
            className={` relative p-4 md:hover:rotate-[5deg] flex justify-center items-start min-w-[200px] md:min-w-[300px] h-80 shadow-xl  rounded-md border-gray-500 border md:border-transparent top-card ${
                num != 0 && " md:-ml-[100px]"
            } ${mode == "light" ? " bg-white" : "bg-[#262626] shadow-black"}`}
        >
            <Link
                href={`/post/${post._id}`}
                className="h-full flex flex-col justify-between"
            >
                <div>
                    <p>{moment(post.updatedAt).format("ll")}</p>
                    <h5
                        className={`${
                            mode == "light" ? "text-black" : "text-white"
                        } text-xl`}
                    >
                        {post.title}
                    </h5>
                    <div className=" text-orange-500 flex gap-4">
                        {post.tags.map((item, i) => (
                            <div key={i}>
                                <p>#{item.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className=" flex gap-4">
                    <Avatar src={imageBuilder(post.author.image)} />
                    <div>
                        <p
                            className={`${
                                mode == "dark" ? "text-white" : "text-black"
                            }`}
                        >
                            {post.author.name}
                        </p>
                        <p className=" text-xs">{post.author.work}</p>
                    </div>
                </div>
            </Link>
            <div
                className={` absolute bottom-2 right-2 md:flex gap-2 hidden ${
                    mode == "dark" ? "text-white" : "text-black"
                }`}
            >
                <BookmarkBtn post={post} setSuccess={setBookmarkSuccess} />
                <Like post={post} setSuccess={setLikeSuccess} />
            </div>
        </section>
    );
};

export default TopCard;
