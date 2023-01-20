import "../styles/globals.css";
import store from "../redux/store";
import { Provider } from "react-redux";
import Navbar from "../components/Navbar";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Footer from "../components/Footer";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    const queryClient = new QueryClient();
    return (
        <div>
            <SessionProvider session={session}>
                <QueryClientProvider client={queryClient}>
                    <Provider store={store}>
                        <Navbar />
                        <Component {...pageProps} />
                        <Footer />
                    </Provider>
                </QueryClientProvider>
            </SessionProvider>
        </div>
    );
}

export default MyApp;
