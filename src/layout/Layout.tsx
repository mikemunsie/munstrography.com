import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { HOME_SECTION_IMAGES } from "../data/site";
import AppRoutes from "../routes/Routes";
import Footer, { ContactBand } from "./Footer";
import Header from "./Header";

export default function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="site">
      <Header solid={!isHome} />
      <main id="main" className="site-main">
        <AppRoutes />
      </main>
      <ContactBand background={isHome ? HOME_SECTION_IMAGES.contact : undefined} />
      <Footer />
    </div>
  );
}
