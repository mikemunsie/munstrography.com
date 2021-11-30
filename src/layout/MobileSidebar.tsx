import InstagramFeed from "./InstagramFeed";

export default function MobileSidebar() {
  return (
    <div className="sidebar_wrapper">
      <div className="sidebar">
        <div className="content">
          <ul className="sidebar_widget">
            <li id="text-10" className="widget widget_text">
              <div className="textwidget">
                <div>
                  <img src="upload/signature.png" alt="" />
                </div>
              </div>
            </li>
            <li id="photography_instagram-5" className="widget Photography_Instagram">
              <h2 className="widgettitle">
                <span>Instagram</span>
              </h2>
              <InstagramFeed />
              <br className="clear" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
