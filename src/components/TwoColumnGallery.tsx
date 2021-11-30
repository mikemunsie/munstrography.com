import { useEffect } from "react";

type TwoColumnGalleryProps = {
  urls: string[];
};

const uid = 0;

export default function TwoColumnGallery(props: TwoColumnGalleryProps) {
  const { urls } = props;

  useEffect(() => {
    // window
    //   .jQuery("#portfolio_filter_wrapper")
    //   .imagesLoaded()
    //   .done(function () {
    //     window
    //       .jQuery("#portfolio_filter_wrapper")
    //       .children(".element")
    //       .children(".gallery_type")
    //       .each(function (this: any) {
    //         window.jQuery(this).addClass("fade-in");
    //       });
    //   });
  }, []);

  useEffect(() => {
    // document.querySelector("#portfolio_filter_wrapper")!.innerHTML = "";
    // window
    //   .jQuery("#portfolio_filter_wrapper")
    //   .children(".element")
    //   .children(".gallery_type")
    //   .each(function (this: any) {
    //     window.jQuery(this).addClass("fade-in");
    //   });
    // window.jQuery(window).trigger("hwparallax.reconfigure");
  }, [urls]);

  const slides = urls.map((url, index) => {
    return (
      <div className="element grid classic2_cols kenburns" key={index}>
        <div className="one_half gallery2 static archive animated2 hover_display">
          <a href={url} target="_blank" rel="noreferrer" data-thumb={url}>
            <img src={url} className="preview" />
          </a>
        </div>
      </div>
    );
  });

  return (
    <div
      id="portfolio_filter_wrapper"
      className="gallery two_cols portfolio-content section content clearfix wide"
      data-columns="2"
      style={{ minHeight: "300px" }}
    >
      {slides}
    </div>
  );
}
