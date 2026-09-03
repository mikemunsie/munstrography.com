import { Route, Routes } from "react-router-dom";

import About from "../pages/About";
import GalleryPage from "../pages/GalleryPage";
import Home from "../pages/Home";
import PhotoScout from "../pages/PhotoScout";
import Work from "../pages/Work";
import { RoutePaths } from "./paths";

const AppRoutes = () => (
  <Routes>
    <Route path={RoutePaths.home} element={<Home />} />
    <Route path={RoutePaths.work} element={<Work />} />
    <Route path={RoutePaths.gallery} element={<GalleryPage />} />
    <Route path={RoutePaths.photoscout} element={<PhotoScout />} />
    <Route path={RoutePaths.about} element={<About />} />
    <Route path="*" element={<Work />} />
  </Routes>
);

export default AppRoutes;
