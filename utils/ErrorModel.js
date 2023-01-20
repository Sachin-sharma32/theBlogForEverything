import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const ErrorModel = (props) => {
    const mode = useSelector((state) => state.base.mode);
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className={`${mode == 'dark' ? 'bg-white' : 'bg-black '} absolute top-10 left-1/2 -translate-x-1/2 text-red-500 p-4 rounded-sm z-50`}
        >
            {props.children}
        </motion.div>
    );
};

export default ErrorModel;
