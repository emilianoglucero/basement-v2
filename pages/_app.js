import { useState, useEffect } from "react";
import { DefaultSeo } from "next-seo";

import "../styles/globals.css";
import { Curtains, Plane } from "react-curtains";
import Flowmap from "../components/webgl/Flowmap";

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
      <DefaultSeo
        title="Nike Hero"
        description="Nike Hero challenge for Basement Studio."
        openGraph={{
          type: "website",
          locale: "en_IE",
          url: "https://basement-challenge-emilianoglucero.vercel.app/",
          site_name: "Nike Hero",
          description: "Nike Hero challenge for Basement Studio",
        }}
      />
      {/* <BasicPlane /> */}
      <Flowmap>
        <Component {...pageProps} />
      </Flowmap>
    </Curtains>
  );
}

export default MyApp;
