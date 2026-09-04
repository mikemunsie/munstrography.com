import { ShootGrid } from "../components/ProjectCard";
import { PORTFOLIO_SHOOTS } from "../data/portfolio";
import ui from "../styles/ui.module.css";
import styles from "./Portfolio.module.css";

export default function Portfolio() {
  return (
    <section className={ui.pageHero}>
      <div className={ui.wrap}>
        <h1 className={ui.display}>Recent Work</h1>
        <div className={styles.stack}>
          <ShootGrid shoots={PORTFOLIO_SHOOTS} />
        </div>
      </div>
    </section>
  );
}
