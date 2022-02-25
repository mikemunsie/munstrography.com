import { Route, Routes } from "react-router-dom";

import About from "../pages/About";
import Contact from "../pages/Contact";
import Home from "../pages/Home";
import Pricing from "../pages/Pricing";
import Share from "../pages/Share";
import { RoutePaths } from "./paths";

const AppRoutes = () => (
  <Routes>
    <Route path={RoutePaths.about} element={<About />} />
    <Route path={RoutePaths.home} element={<Home />} />
    <Route path={RoutePaths.gallery} element={<Home />} />
    <Route path={RoutePaths.pricing} element={<Pricing />} />
    <Route path={RoutePaths.contact} element={<Contact />} />
    <Route path={RoutePaths.share} element={<Share />} />
  </Routes>
);

export default AppRoutes;
