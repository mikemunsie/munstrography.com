import { Route, Routes } from "react-router-dom";

import About from "../pages/About";
import Home from "../pages/Home";
import { RoutePaths } from "./paths";

const AppRoutes = () => (
  <Routes>
    <Route path={RoutePaths.about} element={<About />} />
    <Route path={RoutePaths.home} element={<Home />} />
    <Route path={RoutePaths.gallery} element={<Home />} />
  </Routes>
);

export default AppRoutes;
