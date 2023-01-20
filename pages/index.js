import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Posts from "../components/Posts";
import TopCategories from "../components/TopCategories";
import TopPosts from "../components/TopPosts";
import {motion} from 'framer-motion'
import Smooth from "../utils/Smooth";

export default function Home() {
    const mode = useSelector((state) => state.base.mode);
    return (
        <Smooth
            className={` text-gray-500 text-sm ${
                mode == "light" ? "bg-white" : "bg-[#262626]"
            }`}
        >
            <Header />
            <TopPosts />
            <div className=" hidden md:flex">
                <Posts />
                <TopCategories />
            </div>
            <div className=" md:hidden flex flex-col">
                <TopCategories />
                <Posts />
            </div>
        </Smooth>
    );
}
