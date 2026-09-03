import { NavLink } from "react-router-dom";

import { GALLERIES } from "../data/site";
import { RoutePaths } from "../routes/paths";

type ProjectCardProps = {
  to: string;
  image: string;
  kicker: string;
  title: string;
  meta?: string;
};

export function ProjectCard({ to, image, kicker, title, meta }: ProjectCardProps) {
  return (
    <NavLink to={to} className="project-card">
      <img src={image} alt={title} loading="lazy" decoding="async" />
      <div className="project-card-copy">
        <p className="kicker">{kicker}</p>
        <h3>{title}</h3>
        <span className="view">{meta ?? "View gallery"}</span>
      </div>
    </NavLink>
  );
}

type ProjectGridProps = {
  counts: Record<string, number>;
  variant?: "featured" | "work";
};

export function ProjectGrid({ counts, variant = "featured" }: ProjectGridProps) {
  return (
    <div className={variant === "work" ? "work-grid" : "project-grid"}>
      {GALLERIES.map((gallery) => {
        return (
          <ProjectCard
            key={gallery.slug}
            to={`/gallery/${gallery.slug}`}
            image={gallery.cover}
            kicker={gallery.kicker}
            title={gallery.title}
          />
        );
      })}
    </div>
  );
}

export function GalleryFilter() {
  return (
    <nav className="gallery-nav" aria-label="Galleries">
      <NavLink to={RoutePaths.work} end>
        All
      </NavLink>
      {GALLERIES.map((gallery) => (
        <NavLink key={gallery.slug} to={`/gallery/${gallery.slug}`}>
          {gallery.title}
        </NavLink>
      ))}
    </nav>
  );
}
