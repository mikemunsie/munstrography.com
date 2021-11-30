import { Route, Routes } from "react-router-dom";

import Contact from "../pages/Contact";
import GalleryCommercial from "../pages/GalleryCommerical";
import GalleryComposite from "../pages/GalleryComposite";
import GalleryDaytime from "../pages/GalleryDaytime";
import GalleryInterior from "../pages/GalleryInterior";
import GalleryNight from "../pages/GalleryNight";
import Home from "../pages/Home";
import Pricing from "../pages/Pricing";
import { RoutePaths } from "./paths";

const AppRoutes = () => (
  <Routes>
    <Route path={RoutePaths.home} element={<Home />} />
    <Route path={RoutePaths.galleryCommercial} element={<GalleryCommercial />} />
    <Route path={RoutePaths.galleryComposite} element={<GalleryComposite />} />
    <Route path={RoutePaths.galleryDay} element={<GalleryDaytime />} />
    <Route path={RoutePaths.galleryNight} element={<GalleryNight />} />
    <Route path={RoutePaths.galleryInterior} element={<GalleryInterior />} />
    <Route path={RoutePaths.pricing} element={<Pricing />} />
    <Route path={RoutePaths.contact} element={<Contact />} />
  </Routes>
);

export default AppRoutes;
