import { INSTAGRAM_URL, PHOTOSCOUT_APP_STORE_URL } from "../data/site";
import ui from "../styles/ui.module.css";
import styles from "./Social.module.css";

const LINKS = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "PhotoScout", href: PHOTOSCOUT_APP_STORE_URL },
  { label: "Instagram", href: INSTAGRAM_URL },
  { label: "Venmo", href: "https://account.venmo.com/u/munstrography" },
] as const;

export default function Social() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <img src="/img/instagram-profile.jpg" alt="Munstrography" />
        <h1>Munstrography</h1>
        <p>Car photographer & enthusiast. DFW-based. Available for shoots.</p>
        {LINKS.map(({ label, href }) => (
          <a
            key={label}
            className={ui.btn}
            href={href}
            target={href.startsWith("/") ? undefined : "_blank"}
            rel="noreferrer"
          >
            {label}
          </a>
        ))}
        <p className={styles.fine}>© {new Date().getFullYear()} Munstrography</p>
      </div>
    </div>
  );
}
