import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Gallery from "../components/Gallery";
import Menu from "../components/Menu";
import Photos from "../photos.json";

export default function Home() {
  const galleryName = useParams().gallery as keyof typeof Photos;
  const navigate = useNavigate();
  let allSlideImages = Object.values(Photos).flat();
  const [_, setHomeSlideUrl] = useState("");
  const photo_items = ["night", "interior", "day", "nature"];
  let menuCategory = galleryName || photo_items[0];

  if (!Photos[galleryName]) {
    menuCategory = photo_items[0] as any;
  } else {
    allSlideImages = Photos[menuCategory];
  }

  function setMenuCategory(categoryName: string) {
    navigate(`/gallery/${categoryName.toLowerCase()}`);
  }

  useEffect(() => {
    setHomeSlideUrl(allSlideImages[Math.floor(Math.random() * allSlideImages.length)].src);
  }, []);

  return (
    <>
      <div className="ppb_wrapper hasbg">
        {/* <div id="page_caption" className="hasbg parallax baseline ppb_enable">
          <div id="bg_regular" style={{ backgroundImage: `url(${homeSlideUrl})` }}></div>
        </div> */}
        <div className="one ppb_header" style={{ paddingTop: "15px" }}>
          <div className="standard_wrapper">
            <div className="page_content_wrapper"></div>
          </div>
        </div>
        <div className="clear" />
        <div id="page_content_wrapper" className="wide">
          <div className="flex">
            <Menu onClick={setMenuCategory} items={photo_items} selectedItem={menuCategory} />
          </div>
          <div className="inner">
            <div className="inner_wrapper nopadding">
              <Gallery photos={Photos[menuCategory]} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
