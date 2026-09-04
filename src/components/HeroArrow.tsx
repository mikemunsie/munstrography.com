import type { MouseEvent } from "react";

import { scrollToId } from "../utils/scroll";
import styles from "./HeroArrow.module.css";

export function HeroArrow() {
  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    scrollToId("intro", "smooth");
  };

  return (
    <a className={styles.arrow} href="#intro" aria-label="Continue to the next section" onClick={onClick}>
      <svg className={styles.icon} viewBox="0 0 40 48" aria-hidden>
        <path d="M8 8 L20 22 L32 8" />
        <path d="M8 22 L20 36 L32 22" />
      </svg>
    </a>
  );
}
