import { NavLink } from "react-router-dom";

import { GALLERIES } from "../data/site";
import { RoutePaths } from "../routes/paths";
import ui from "../styles/ui.module.css";
import styles from "./ProjectCard.module.css";

type ProjectCardProps = {
  to: string;
  image: string;
  kicker: string;
  title: string;
  meta?: string;
};

export function ProjectCard({ to, image, kicker, title, meta }: ProjectCardProps) {
  return (
    <NavLink to={to} className={styles.card}>
      <img src={image} alt={title} loading="lazy" decoding="async" />
      <div className={styles.copy}>
        <p className={ui.kicker}>{kicker}</p>
        <h3>{title}</h3>
        <span className={styles.view}>{meta ?? "View gallery"}</span>
      </div>
    </NavLink>
  );
}

type ProjectGridProps = {
  counts: Record<string, number>;
  variant?: "featured" | "work";
};

export function ProjectGrid({ counts: _counts, variant = "featured" }: ProjectGridProps) {
  return (
    <div className={variant === "work" ? styles.work : styles.grid}>
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
    <nav className={styles.nav} aria-label="Galleries">
      <NavLink to={RoutePaths.work} end className={({ isActive }) => (isActive ? styles.navActive : undefined)}>
        All
      </NavLink>
      {GALLERIES.map((gallery) => (
        <NavLink
          key={gallery.slug}
          to={`/gallery/${gallery.slug}`}
          className={({ isActive }) => (isActive ? styles.navActive : undefined)}
        >
          {gallery.title}
        </NavLink>
      ))}
    </nav>
  );
}
