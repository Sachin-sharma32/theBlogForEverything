import dynamic from "next/dynamic";
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import hljs from "highlight.js";

import ReactQuill, { Quill } from "react-quill";
import "../node_modules/react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
const BubbleTheme = Quill.import("themes/bubble");

class ExtendBubbleTheme extends BubbleTheme {
    constructor(quill, options) {
        super(quill, options);

        quill.on("selection-change", (range) => {
            if (range) {
                quill.theme.tooltip.show();
                quill.theme.tooltip.position(quill.getBounds(range));
            }
        });
    }
}
Quill.register("themes/bubble", ExtendBubbleTheme);

const TextEditor = ({ content, setContent }) => {
    return (
        <Stack
            sx={{
                backgroundColor: "black",
                paddingTop: "",
                minHeight: "",
                height: "",
                overflowX: "hidden",
                width: "100%",
                border: "20px solid white",
            }}
            className="editor-container"
        >
            <ReactQuill
                theme="bubble"
                style={{ backgroundColor: "white", textAlign: "center" }}
                placeholder="hello"
                value={content}
                modules={{
                    toolbar: [
                        [{ header: "1" }, { header: "2" }],
                        ["bold", "italic", "underline", "strike", "blockquote"],
                        [{ list: "ordered" }, { list: "bullet" }],
                        ["video", "image", "link"],
                        ["clean"],
                        ["code-block"],
                    ],
                }}
                formats={[
                    "header",
                    "font",
                    "bold",
                    "italic",
                    "underline",
                    "strike",
                    "blockquote",
                    "list",
                    "bullet",
                    "indent",
                    "link",
                    "image",
                    "code-block",
                ]}
                onChange={(e) => {
                    setContent(e);
                }}
                className="h-[90vh] border-none bg-black"
            />
        </Stack>
    );
};

export default TextEditor;