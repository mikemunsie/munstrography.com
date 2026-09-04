import { type PortfolioPhoto } from "../data/portfolio";
import styles from "./ShootAlbum.module.css";

type ShootAlbumProps = {
  photos: PortfolioPhoto[];
  title: string;
};

function isPortrait(photo: PortfolioPhoto) {
  return photo.height >= photo.width;
}

function groupPhotos(photos: PortfolioPhoto[]): PortfolioPhoto[][] {
  const rows: PortfolioPhoto[][] = [];
  for (let i = 0; i < photos.length; ) {
    const current = photos[i];
    const next = photos[i + 1];
    if (isPortrait(current) && next && isPortrait(next)) {
      rows.push([current, next]);
      i += 2;
    } else {
      rows.push([current]);
      i += 1;
    }
  }
  return rows;
}

export default function ShootAlbum({ photos, title }: ShootAlbumProps) {
  const rows = groupPhotos(photos);

  return (
    <div className={styles.album}>
      {rows.map((row, rowIndex) => {
        const start = rows.slice(0, rowIndex).reduce((count, item) => count + item.length, 0);
        return (
          <div key={row.map((photo) => photo.src).join("-")} className={row.length > 1 ? styles.pair : styles.single}>
            {row.map((photo, index) => (
              <img
                key={photo.src}
                src={photo.src}
                alt={`${title}, photo ${start + index + 1}`}
                width={photo.width}
                height={photo.height}
                loading={rowIndex === 0 ? "eager" : "lazy"}
                decoding="async"
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}
