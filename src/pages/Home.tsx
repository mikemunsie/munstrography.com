import { useState } from "react";

import Menu from "../components/Menu";
import TwoColumnGallery from "../components/TwoColumnGallery";

export default function Home() {
  const gallery: Record<string, string[]> = {
    Day: [
      "gallery/day/5.jpg",
      "gallery/day/4.jpg",
      "gallery/day/2.jpg",
      "gallery/day/3.jpg",
      "gallery/day/1.jpg",
      "gallery/day/6.jpg",
    ],
    Night: [
      "gallery/night/3.jpg",
      "gallery/night/2.jpg",
      "gallery/night/1.jpg",
      "gallery/night/4.jpg",
      "gallery/night/6.jpg",
      "gallery/night/5.jpg",
    ],
    Interior: [
      "gallery/interior/4.jpg",
      "gallery/interior/3.jpg",
      "gallery/interior/5.jpg",
      "gallery/interior/1.jpg",
      "gallery/interior/2.jpg",
      "gallery/interior/6.jpg",
    ],
    Composite: [
      "gallery/composite/2.jpg",
      "gallery/composite/3.jpg",
      "gallery/composite/1.jpg",
      "gallery/composite/4.jpg",
    ],
  };
  const allSlideImages = [gallery["Day"], gallery["Composite"], "img/home-slideshow/1.jpg"].flat();
  const homeSlideUrl = allSlideImages[Math.floor(Math.random() * allSlideImages.length)];
  const [menuCategory, setMenuCategory] = useState(Object.keys(gallery)[0]);

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
