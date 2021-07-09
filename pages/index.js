import { motion, useMotionValue, useSpring } from "framer-motion";
import Head from "next/head";
import { useContext, useEffect } from "react";
// import Image from "next/image";
// import styles from "../styles/Home.module.css";
import { Layout } from "../components/layout/Layout";
import { Header } from "../components/ui/Header";
import { MainDescription } from "../components/ui/MainDescription";
import { MainTitle } from "../components/ui/MainTitle";
import { CursorContext } from "../context/cursor-context";

export default function Home() {
  const { cursorType, cursorChangeHandler } = useContext(CursorContext);
  console.log(cursorType);

  // cursor effect start
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <Layout>
      <motion.div
        className={"cursor " + cursorType}
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
        }}
      />
      <Head>
        <title>Nike</title>
        <meta name="description" content="Nike Hero" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <img
        src="/images/background/nike-photo-background.png"
        data-sampler="planeTexture"
        alt="Nike Move to Zero background"
      />
      <Header />
      <MainDescription />
      <MainTitle />
    </Layout>
  );
}
