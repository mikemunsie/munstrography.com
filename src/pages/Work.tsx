import { ProjectGrid } from "../components/ProjectCard";
import { GALLERIES } from "../data/site";
import photos from "../photos.json";

const counts = Object.fromEntries(GALLERIES.map((gallery) => [gallery.slug, photos[gallery.slug]?.length ?? 0]));

export default function Work() {
  return (
    <section className="page-hero">
      <div className="wrap">
        <p className="kicker">Portfolio</p>
        <h1 className="display">Work</h1>
        <p className="lede">From cars to nature, I love capturing the art of the world around me.</p>
        <div className="work-stack">
          <ProjectGrid counts={counts} variant="work" />
        </div>
      </div>
    </section>
  );
}
