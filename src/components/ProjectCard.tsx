import { useEffect, useRef } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { type PortfolioShoot } from "../data/portfolio";
import { cx } from "../utils/cx";
import { saveScrollPosition } from "../utils/scroll";
import styles from "./ProjectCard.module.css";

type ShootCardProps = {
  to: string;
  image: string;
  title: string;
};

export function ShootCard({ to, image, title }: ShootCardProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <NavLink
      to={to}
      state={{ from: pathname }}
      className={cx(styles.card, styles.shoot)}
      data-shoot-card=""
      onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
          return;
        }
        event.preventDefault();
        saveScrollPosition(pathname);
        navigate(to, { state: { from: pathname, scrollY: window.scrollY } });
      }}
    >
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
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    let hot: Element | null = null;

    const setHot = (next: Element | null) => {
      if (hot === next) return;
      hot?.classList.remove(styles.hot);
      next?.classList.add(styles.hot);
      hot = next;
    };

    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      const node = document.elementFromPoint(touch.clientX, touch.clientY);
      const card = node?.closest("[data-shoot-card]");
      setHot(card && grid.contains(card) ? card : null);
    };

    const clear = () => setHot(null);

    grid.addEventListener("touchmove", onTouchMove, { passive: true });
    grid.addEventListener("touchend", clear);
    grid.addEventListener("touchcancel", clear);
    return () => {
      grid.removeEventListener("touchmove", onTouchMove);
      grid.removeEventListener("touchend", clear);
      grid.removeEventListener("touchcancel", clear);
      clear();
    };
  }, []);

  return (
    <div className={styles.grid} ref={gridRef}>
      {shoots.map((shoot) => (
        <ShootCard key={shoot.slug} to={`/portfolio/${shoot.slug}`} image={shoot.cover} title={shoot.name} />
      ))}
    </div>
  );
}
