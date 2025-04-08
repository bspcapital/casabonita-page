import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/Header";
import Footer from "@/components/Footer"
import TransitionOverlay from "@/components/TransitionOverlay"
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <TransitionOverlay/>
      <Header />
      <AnimatePresence mode='wait'>   
        <Component key={router.route} {...pageProps} />
      </AnimatePresence>
      <Footer />
    </>
  );
}
