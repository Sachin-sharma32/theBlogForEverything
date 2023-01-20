import SyntaxHighlighter from "react-syntax-highlighter";

const serializerFn = () => {
    const serializers = {
        types: {
            code: (props) => (
                <div className=" relative">
                    <SyntaxHighlighter language={props.node.language}>
                        {props.node.code}
                    </SyntaxHighlighter>
                </div>
            ),
        },
    };
    return serializers;
};

export default serializerFn;
