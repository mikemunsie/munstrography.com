import { Navigate, useParams } from "react-router-dom";

import Gallery from "../components/Gallery";
import { GalleryFilter } from "../components/ProjectCard";
import { getGallery } from "../data/site";
import photos from "../photos.json";
import { RoutePaths } from "../routes/paths";
import ui from "../styles/ui.module.css";

export default function GalleryPage() {
  const { gallery: slug } = useParams();
  const meta = getGallery(slug);
  const items = slug ? photos[slug as keyof typeof photos] : undefined;

  if (!meta || !items) {
    return <Navigate to={RoutePaths.work} replace />;
  }

  return (
    <>
      <section className={ui.pageHero}>
        <div className={ui.wrap}>
          <p className={ui.kicker}>{meta.kicker}</p>
          <h1 className={ui.display}>{meta.title}</h1>
          <p className={ui.lede}>{meta.description}</p>
          <GalleryFilter />
        </div>
      </section>
      <Gallery photos={items} />
    </>
  );
}
