import React, { useEffect } from "react";
import { useRef } from "react";
import { ref } from "yup";

const CheckOutsideClick = ({ children, handleClose }) => {
    console.log(handleClose);
    const boxRef = useRef(null);
    const handleOutsideClick = (event) => {
        if (boxRef.current && !boxRef.current.contains(event.target)) {
            handleClose && handleClose();
        }
    };
    useEffect(() => {
        document.addEventListener("click", handleOutsideClick, true);
        return () => {
            document.removeEventListener("click", handleOutsideClick, true);
        };
    }, []);
    if (!children) {
        return;
    }
    return <div ref={boxRef}>{children}</div>;
};

export default CheckOutsideClick;
