import { useEffect, useLayoutEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

import { HOME_SECTION_IMAGES } from "../data/site";
import AppRoutes from "../routes/Routes";
import { getScrollPosition, saveScrollPosition, scrollToY } from "../utils/scroll";
import Footer, { ContactBand } from "./Footer";
import Header from "./Header";
import styles from "./Layout.module.css";

type LocationState = {
  restoreScroll?: boolean;
};

export default function Layout() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const isHome = location.pathname === "/";

  useLayoutEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    if (location.hash) return;

    const state = location.state as LocationState | null;
    const restore =
      navigationType === "POP" || state?.restoreScroll
        ? (getScrollPosition(location.pathname) ?? 0)
        : 0;

    scrollToY(restore);
    const raf = requestAnimationFrame(() => scrollToY(restore));
    return () => cancelAnimationFrame(raf);
  }, [location.hash, location.key, location.pathname, location.state, navigationType]);

  useEffect(() => {
    const path = location.pathname;
    const onScroll = () => saveScrollPosition(path);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  return (
    <div className={styles.site}>
      <Header solid={!isHome} />
      <main id="main" className={styles.main}>
        <AppRoutes />
      </main>
      <ContactBand background={isHome ? HOME_SECTION_IMAGES.contact : undefined} />
      <Footer />
    </div>
  );
}
