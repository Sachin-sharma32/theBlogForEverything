import SyntaxHighlighter from "react-syntax-highlighter";
import { CopyToClipboard } from "react-copy-to-clipboard";

const SerializerFn = (copy, setCopy) => {
    const serializers = {
        types: {
            code: (props) => (
                <div className=" relative">
                    <SyntaxHighlighter language={props.node.language} className="bg-black">
                        {props.node.code}
                    </SyntaxHighlighter>
                    <div>
                        {copy ? (
                            <CopyToClipboard text={props.node.code.toString()}>
                                <button className="bg-gray-500 px-2 py-1 rounded-bl-md copy-btn active:scale-90 transition-all duration-200">
                                    Copied
                                </button>
                            </CopyToClipboard>
                        ) : (
                            <CopyToClipboard text={props.node.code.toString()}>
                                <button
                                    onClick={() => {
                                        setCopy(true);
                                        setTimeout(() => {
                                            setCopy(false);
                                        }, 1000);
                                    }}
                                    className=" min-w-[80px] bg-gray-500 px-2 py-1 copy-btn rounded-bl-md active:scale-90 transition-all duration-200"
                                >
                                    Copy
                                </button>
                            </CopyToClipboard>
                        )}
                    </div>
                </div>
            ),
        },
    };
    return serializers;
};

export default SerializerFn;
