import Nav from "./Nav";
import SocialLinks from "./SocialLinks";

export default function MobileSidebar() {
  return (
    <>
      <a id="close_mobile_menu" href="javascript:;"></a>
      <div className="mobile_menu_wrapper">
        <div className="menu-side-mobile-menu-container">
          <Nav id="mobile_main_menu" className="mobile_main_nav" />
          <div className="page_content_wrapper">
            <div className="sidebar_wrapper">
              <div className="sidebar">
                <div className="content">
                  <SocialLinks />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
