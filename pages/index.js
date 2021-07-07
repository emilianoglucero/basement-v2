import Head from "next/head";
// import Image from "next/image";
// import styles from "../styles/Home.module.css";
import { Layout } from "../components/layout/Layout";
import { Header } from "../components/ui/Header";
import { MainDescription } from "../components/ui/MainDescription";
import { MainTitle } from "../components/ui/MainTitle";

export default function Home() {
  return (
    <Layout>
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
