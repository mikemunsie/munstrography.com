type TwoColumnGalleryProps = {
  urls: string[];
};

export default function TwoColumnGallery(props: TwoColumnGalleryProps) {
  const { urls } = props;

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
