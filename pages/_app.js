import "../styles/globals.css";
import store from "../redux/store";
import { Provider } from "react-redux";
import Navbar from "../components/Navbar";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Footer from "../components/Footer";
import { SessionProvider } from "next-auth/react";
import Social from "../utils/Socials";
import Script from "next/script";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    const queryClient = new QueryClient();

    return (
        <div className=" w-[100%] h-[100%]">
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=G-PKPENVER0M"
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-PKPENVER0M');
                `}
            </Script>
            <SessionProvider session={session}>
                <QueryClientProvider client={queryClient}>
                    <Provider store={store}>
                        <Navbar />
                        <Component {...pageProps} />
                        <ReactQueryDevtools />
                        <Footer />
                        <Social />
                    </Provider>
                </QueryClientProvider>
            </SessionProvider>
        </div>
    );
}

export default MyApp;
