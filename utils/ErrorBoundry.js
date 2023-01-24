import { Component } from "react";
import Error from "./error";

class ErrorBoundry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
        };
    }

    static getDerivedStateFromError() {
        return {
            hasError: true,
        };
    }

    render() {
        if (this.state.hasError) {
            return <Error>something went wrong</Error>;
        }
        return this.props.children;
    }
}

export default ErrorBoundry;
