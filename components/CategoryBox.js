import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const CategoryBox = ({ setToggleCategories }) => {
    const categories = useSelector((state) => state.base.categories);
    const headerCategories = categories.filter((category) => {
        return category.header;
    });
    const mode = useSelector((state) => state.base.mode);
    return (
        <motion.div
            className={`${
                mode == "light" ? "bg-white text-black" : "bg-black text-white"
            }  text-xs absolute top-8 -right-2  p-2 w-52 flex flex-col items-center justify-center gap-0 rounded-md z-50 shadow-2xl bg-gradient-to-r from-[#ff7d69] to-blue-700`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            {headerCategories.map((item, index) => {
                return (
                    <Link
                        href={`/search/${item.title}`}
                        key={index}
                        onClick={() => {
                            setToggleCategories(false);
                        }}
                    >
                        <p
                            className={`${
                                mode == "light"
                                    ? "text-white hover:bg-white hover:text-black"
                                    : "text-black hover:bg-black hover:text-white"
                            } w-48 transition-all duration-150 p-2 text-center rounded-md backdrop-opacity-50 font-semibold`}
                        >
                            {item.title.toUpperCase()}
                        </p>
                    </Link>
                );
            })}
        </motion.div>
    );
};

export default CategoryBox;
