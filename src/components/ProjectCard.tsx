import { NavLink } from "react-router-dom";

import { type PortfolioShoot } from "../data/portfolio";
import { cx } from "../utils/cx";
import styles from "./ProjectCard.module.css";

type ShootCardProps = {
  to: string;
  image: string;
  title: string;
};

export function ShootCard({ to, image, title }: ShootCardProps) {
  return (
    <NavLink to={to} className={cx(styles.card, styles.shoot)}>
      <img src={image} alt={title} loading="lazy" decoding="async" />
      <div className={styles.shootCopy}>
        <h3>{title}</h3>
        <i />
        <span>Click to view</span>
      </div>
    </NavLink>
  );
}

type ShootGridProps = {
  shoots: PortfolioShoot[];
};

export function ShootGrid({ shoots }: ShootGridProps) {
  return (
    <div className={styles.grid}>
      {shoots.map((shoot) => (
        <ShootCard key={shoot.slug} to={`/portfolio/${shoot.slug}`} image={shoot.cover} title={shoot.name} />
      ))}
    </div>
  );
}
