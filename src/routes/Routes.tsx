import { Navigate, Route, Routes } from "react-router-dom";

import About from "../pages/About";
import Home from "../pages/Home";
import PhotoScout from "../pages/PhotoScout";
import Portfolio from "../pages/Portfolio";
import ShootPage from "../pages/ShootPage";
import { RoutePaths } from "./paths";

const AppRoutes = () => (
  <Routes>
    <Route path={RoutePaths.home} element={<Home />} />
    <Route path={RoutePaths.portfolio} element={<Portfolio />} />
    <Route path={RoutePaths.shoot} element={<ShootPage />} />
    <Route path={RoutePaths.photoscout} element={<PhotoScout />} />
    <Route path={RoutePaths.about} element={<About />} />
    <Route path="/work" element={<Navigate to={RoutePaths.portfolio} replace />} />
    <Route path="/gallery/:gallery" element={<Navigate to={RoutePaths.portfolio} replace />} />
    <Route path="*" element={<Portfolio />} />
  </Routes>
);

export default AppRoutes;
