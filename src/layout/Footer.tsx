import { Link } from "react-router-dom";

import { SectionBackdrop } from "../components/SectionBackdrop";
import { INSTAGRAM_URL, PHOTOSCOUT_APP_STORE_URL } from "../data/site";
import { RoutePaths } from "../routes/paths";
import ui from "../styles/ui.module.css";
import { cx } from "../utils/cx";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={cx(ui.wrap, styles.inner)}>
        <span>© {new Date().getFullYear()} Munstrography</span>
        <div className={styles.links}>
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href={PHOTOSCOUT_APP_STORE_URL} target="_blank" rel="noreferrer">
            PhotoScout
          </a>
          <Link to={RoutePaths.about}>About</Link>
        </div>
      </div>
    </footer>
  );
}

export function ContactBand({ background }: { background?: string }) {
  return (
    <section
      className={cx(styles.contact, background && ui.sectionPhoto, background && styles.contactPhoto)}
      id="contact"
      data-section-photo={background ? "" : undefined}
    >
      {background ? <SectionBackdrop src={background} objectPosition="center 48%" /> : null}
      <div className={ui.wrap}>
        <p className={ui.kicker}>Get in touch</p>
        <h2 className={ui.display}>Let&apos;s make art.</h2>
        <div className={styles.meta}>
          <span>Michael Munsie</span>
          <span>Automotive photographer · DFW</span>
        </div>
        <div className={ui.btnRow}>
          <a className={ui.btn} href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
            Book on Instagram
          </a>
          <a className={cx(ui.btn, ui.ghost)} href={PHOTOSCOUT_APP_STORE_URL} target="_blank" rel="noreferrer">
            PhotoScout on the App Store
          </a>
        </div>
      </div>
    </section>
  );
}
