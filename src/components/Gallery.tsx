import { useState } from "react";
import PhotoAlbum from "react-photo-album";

import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

export type Photo = {
  src: string;
  width: number;
  height: number;
};

type GalleryProps = {
  photos: Photo[];
};

export default function Gallery({ photos }: GalleryProps) {
  const [index, setIndex] = useState(-1);

  return (
    <div className="album">
      <PhotoAlbum
        layout="rows"
        photos={photos}
        spacing={6}
        padding={0}
        targetRowHeight={(width) => (width < 600 ? 230 : width < 1000 ? 220 : 280)}
        breakpoints={[480, 768, 1200]}
        onClick={({ index: next }) => setIndex(next)}
      />
      <Lightbox
        slides={photos}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Fullscreen, Thumbnails, Zoom]}
        styles={{ root: { zIndex: 200 } }}
      />
    </div>
  );
}
