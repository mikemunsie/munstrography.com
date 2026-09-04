import { cx } from "../utils/cx";
import styles from "./PhoneShot.module.css";

type PhoneShotProps = {
  src: string;
  alt: string;
  className?: string;
};

export function PhoneShot({ src, alt, className }: PhoneShotProps) {
  return (
    <div className={cx(styles.phone, className)}>
      <img src={src} alt={alt} loading="lazy" decoding="async" />
    </div>
  );
}

export const phoneFloat = styles.float;
