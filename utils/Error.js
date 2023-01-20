const Error = (props) => {
    return (
        <p className="text-red-500 mt-1 mx-auto w-fit h-6 absolute bottom-10 right-0 text-xs">
            {props.children.toUpperCase()}
        </p>
    );
};

export default Error;
