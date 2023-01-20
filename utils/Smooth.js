import React from "react";
import { motion } from "framer-motion";

const Smooth = (props) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className={`${props.className}`}
        >
            {props.children}
        </motion.div>
    );
};

export default Smooth;
