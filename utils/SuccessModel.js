import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const SuccessModel = (props) => {
    const mode = useSelector((state) => state.base.mode);
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className={`${
                mode == "dark" ? "bg-white text-black" : "bg-black text-white"
            } absolute top-10 left-1/2 -translate-x-1/2 p-4 rounded-sm z-50 flex items-center justify-center`}
        >
            {props.children}
        </motion.div>
    );
};

export default SuccessModel;
