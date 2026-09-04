import { Link, Navigate, useParams } from "react-router-dom";

import ShootAlbum from "../components/ShootAlbum";
import { formatShootDate, getShoot } from "../data/portfolio";
import { RoutePaths } from "../routes/paths";
import ui from "../styles/ui.module.css";
import styles from "./ShootPage.module.css";

export default function ShootPage() {
  const { shoot: slug } = useParams();
  const shoot = getShoot(slug);

  if (!shoot) {
    return <Navigate to={RoutePaths.portfolio} replace />;
  }

  const dateLabel = formatShootDate(shoot.date);

  return (
    <>
      <section className={ui.pageHero}>
        <div className={ui.wrap}>
          <Link to={RoutePaths.portfolio} className={styles.back} aria-label="Back to portfolio">
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path
                d="M10.25 2.75 4.75 8l5.5 5.25"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back
          </Link>
          <p className={ui.kicker}>{dateLabel || "Shoot"}</p>
          <h1 className={ui.display}>{shoot.name}</h1>
          {shoot.description ? <p className={ui.lede}>{shoot.description}</p> : null}
          {shoot.ig ? (
            <div className={styles.meta}>
              <a href={shoot.ig} target="_blank" rel="noreferrer">
                Instagram
              </a>
            </div>
          ) : null}
        </div>
      </section>
      <ShootAlbum photos={shoot.photos} title={shoot.name} />
      <Link className={styles.toPortfolio} to={RoutePaths.portfolio}>
        Back to portfolio
      </Link>
      <a className={styles.toTop} href="#main">
        Back to top
      </a>
    </>
  );
}
