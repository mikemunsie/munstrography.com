import { ProjectGrid } from "../components/ProjectCard";
import { GALLERIES } from "../data/site";
import photos from "../photos.json";
import ui from "../styles/ui.module.css";
import styles from "./Work.module.css";

const counts = Object.fromEntries(GALLERIES.map((gallery) => [gallery.slug, photos[gallery.slug]?.length ?? 0]));

export default function Work() {
  return (
    <section className={ui.pageHero}>
      <div className={ui.wrap}>
        <p className={ui.kicker}>Portfolio</p>
        <h1 className={ui.display}>Work</h1>
        <p className={ui.lede}>From cars to nature, I love capturing the art of the world around me.</p>
        <div className={styles.stack}>
          <ProjectGrid counts={counts} variant="work" />
        </div>
      </div>
    </section>
  );
}
