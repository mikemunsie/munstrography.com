import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Gallery from "../components/Gallery";
import Menu from "../components/Menu";
import Photos from "../photos.json";

export default function Home() {
  const galleryName = useParams().gallery as keyof typeof Photos;
  const navigate = useNavigate();
  let allSlideImages = Object.values(Photos).flat();
  const [homeSlideUrl, setHomeSlideUrl] = useState("");
  let menuCategory = galleryName || Object.keys(Photos)[0];
  if (!Photos[galleryName]) {
    menuCategory = Object.keys(Photos)[0] as any;
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
            <div className="page_content_wrapper">
              <div className="inner">
                <div>
                  {/* <div className="ppb_subtitle">Photographer / Car Enthusiast / Software Developer</div> */}
                  {/* <h2 className="ppb_title">Photography is an extension of your personality.</h2>
                  <hr className="title_break center" /> */}
                  {/* <div className="ppb_header_content" style={{ maxWidth: "600px" }}>
                    <p>Photography.</p>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="clear" />
        <div id="page_content_wrapper" className="wide">
          <div className="flex">
            <Menu onClick={setMenuCategory} items={Object.keys(Photos).sort()} selectedItem={menuCategory} />
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
