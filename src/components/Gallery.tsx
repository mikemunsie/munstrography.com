import { useState } from "react";
import PhotoAlbum from "react-photo-album";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import styled from "styled-components";
import Lightbox from "yet-another-react-lightbox";
// import optional lightbox plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

const StyledGallery = styled.div`
  margin: 7.5px;
`;

type GalleryProps = {
  photos: {
    src: string;
    width: number;
    height: number;
  }[];
};

export default function Gallery(props: GalleryProps) {
  const { photos } = props;
  const [index, setIndex] = useState(-1);

  function handleClick(params: any) {
    const { index } = params;
    setIndex(index);
  }

  return (
    <StyledGallery>
      <PhotoAlbum onClick={handleClick} layout="rows" photos={photos} />
      <Lightbox
        slides={photos}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
      />
    </StyledGallery>
  );
}
