import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

import { HOME_SECTION_IMAGES } from "../data/site";
import AppRoutes from "../routes/Routes";
import { getScrollPosition, saveScrollPosition, scrollToY } from "../utils/scroll";
import Footer, { ContactBand } from "./Footer";
import Header from "./Header";
import styles from "./Layout.module.css";

type LocationState = {
  restoreScroll?: boolean | number;
};

function scrollTarget(
  state: LocationState | null,
  navigationType: ReturnType<typeof useNavigationType>,
  path: string,
) {
  if (typeof state?.restoreScroll === "number" && Number.isFinite(state.restoreScroll)) {
    return Math.max(0, state.restoreScroll);
  }
  if (state?.restoreScroll === true || navigationType === "POP") {
    return getScrollPosition(path) ?? 0;
  }
  return 0;
}

export default function Layout() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const isHome = location.pathname === "/";
  const pathRef = useRef(location.pathname);
  pathRef.current = location.pathname;

  useLayoutEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    if (location.hash) return;

    const y = scrollTarget(location.state as LocationState | null, navigationType, location.pathname);
    let cancelled = false;
    let userMoved = false;

    const apply = () => {
      if (cancelled || userMoved) return;
      scrollToY(y);
    };

    apply();
    const raf = requestAnimationFrame(apply);

    if (y <= 0) {
      return () => {
        cancelled = true;
        cancelAnimationFrame(raf);
      };
    }

    const stopOnUser = () => {
      userMoved = true;
    };
    window.addEventListener("wheel", stopOnUser, { passive: true });
    window.addEventListener("touchmove", stopOnUser, { passive: true });

    const ro = new ResizeObserver(() => {
      if (cancelled || userMoved) return;
      if (Math.abs(window.scrollY - y) > 2) apply();
    });
    ro.observe(document.documentElement);

    const stop = window.setTimeout(() => ro.disconnect(), 1000);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(stop);
      ro.disconnect();
      window.removeEventListener("wheel", stopOnUser);
      window.removeEventListener("touchmove", stopOnUser);
    };
  }, [location.hash, location.key, location.pathname, location.state, navigationType]);

  useEffect(() => {
    const remember = () => saveScrollPosition(pathRef.current);
    window.addEventListener("scroll", remember, { passive: true });
    document.addEventListener("click", remember, true);
    return () => {
      window.removeEventListener("scroll", remember);
      document.removeEventListener("click", remember, true);
    };
  }, []);

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
