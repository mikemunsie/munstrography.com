import styles from "./Share.module.css";

export default function Share() {
  return (
    <div
      className={styles.page}
      role="img"
      aria-label="Munstrography share card"
      style={{ background: "#fff url(/img/share.png) center / contain no-repeat" }}
    />
  );
}
