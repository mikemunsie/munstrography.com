import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Menu from "../components/Menu";
import TwoColumnGallery from "../components/TwoColumnGallery";

export default function Home() {
  const { gallery: galleryName } = useParams();
  const navigate = useNavigate();

  const gallery: Record<string, string[]> = {
    day: [
      require("../images/gallery/day/1.jpg").default,
      require("../images/gallery/day/2.jpg").default,
      require("../images/gallery/day/3.jpg").default,
      require("../images/gallery/day/4.jpg").default,
      require("../images/gallery/day/5.jpg").default,
      require("../images/gallery/day/6.jpg").default,
    ],
    night: [
      require("../images/gallery/night/1.jpg").default,
      require("../images/gallery/night/2.jpg").default,
      require("../images/gallery/night/3.jpg").default,
      require("../images/gallery/night/4.jpg").default,
      require("../images/gallery/night/5.jpg").default,
      require("../images/gallery/night/6.jpg").default,
    ],
    interior: [
      require("../images/gallery/interior/7.jpg").default,
      require("../images/gallery/interior/3.jpg").default,
      require("../images/gallery/interior/1.jpg").default,
      require("../images/gallery/interior/2.jpg").default,
      require("../images/gallery/interior/6.jpg").default,
    ],
    dreamy: [
      require("../images/gallery/dreamy/1.jpg").default,
      require("../images/gallery/dreamy/2.jpg").default,
      require("../images/gallery/dreamy/4.jpg").default,
      require("../images/gallery/dreamy/3.jpg").default,
      require("../images/gallery/dreamy/5.jpg").default,
      require("../images/gallery/dreamy/6.jpg").default,
      require("../images/gallery/dreamy/7.jpg").default,
    ],
    composite: [
      require("../images/gallery/composite/6.jpg").default,
      require("../images/gallery/composite/5.jpg").default,
      require("../images/gallery/composite/4.jpg").default,
      require("../images/gallery/composite/3.jpg").default,
      require("../images/gallery/composite/2.jpg").default,
      require("../images/gallery/composite/1.jpg").default,
    ],
  };
  let allSlideImages = Object.values(gallery).flat();
  const [homeSlideUrl, setHomeSlideUrl] = useState("");
  let menuCategory = galleryName || Object.keys(gallery)[0];
  if (!gallery[galleryName as any]) {
    menuCategory = Object.keys(gallery)[0];
  } else {
    allSlideImages = gallery[menuCategory];
  }

  function setMenuCategory(categoryName: string) {
    navigate(`/gallery/${categoryName.toLowerCase()}`);
  }

  useEffect(() => {
    setHomeSlideUrl(allSlideImages[Math.floor(Math.random() * allSlideImages.length)]);
  }, []);

  return (
    <>
      <div className="ppb_wrapper hasbg">
        <div id="page_caption" className="hasbg parallax baseline ppb_enable">
          <div id="bg_regular" style={{ backgroundImage: `url(${homeSlideUrl})` }}></div>
        </div>
        <div className="one withsmallpadding ppb_header">
          <div className="standard_wrapper">
            <div className="page_content_wrapper">
              <div className="inner">
                <div>
                  <div className="ppb_subtitle">photographer / Car Enthusiast / Software Developer</div>
                  <h2 className="ppb_title">Your car is an extension of your personality.</h2>
                  <hr className="title_break center" />
                  <div className="ppb_header_content" style={{ maxWidth: "600px" }}>
                    <p>
                      I firmly believe that what you drive should reflect a part of who you are. That's why in every
                      photo I make sure that the environment matches the car as well as the personality behind it. Car
                      photos shouldn't be boring, they should commemorate who you are and the hard work you've put in to
                      make your ride incredibly unique - just like yourself.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*2215x1587*/}
        <div className="clear" />
        <div id="page_content_wrapper" className="wide">
          <div className="flex" style={{ marginBottom: 30 }}>
            <Menu onClick={setMenuCategory} items={Object.keys(gallery)} selectedItem={menuCategory} />
          </div>
          <div className="inner">
            <div className="inner_wrapper nopadding">
              <TwoColumnGallery urls={gallery[menuCategory]} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
