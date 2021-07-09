import { useState, useEffect, useContext } from "react";
import { DefaultSeo } from "next-seo";

import { motion } from "framer-motion";

import { Curtains, Plane } from "react-curtains";
import Flowmap from "../components/webgl/Flowmap";
import CursorContextProvider from "../context/cursor-context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [showChild, setShowChild] = useState(false);

  // Wait until after client-side hydration to show
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    // You can show some kind of placeholder UI here
    return null;
  }

  return (
    <Curtains>
      <CursorContextProvider>
        <DefaultSeo
          title="Nike Hero"
          description="Nike Hero challenge for Basement Studio."
          openGraph={{
            type: "website",
            locale: "en_IE",
            url: "https://basement-v2-emilianoglucero.vercel.app/",
            site_name: "Nike Hero",
            description: "Nike Hero challenge for Basement Studio",
          }}
        />
        <Flowmap>
          <Component {...pageProps} />
        </Flowmap>
      </CursorContextProvider>
    </Curtains>
  );
}

export default MyApp;
