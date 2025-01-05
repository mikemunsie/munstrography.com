import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

import styled from "styled-components";

import WatermarkImg from "../images/watermark.png";
import WatermarkWhiteImg from "../images/watermark-white.png";
import { RoutePaths } from "../routes/paths";
import AppRoutes from "../routes/Routes";
import MobileSidebar from "./MobileSidebar";
import Nav from "./Nav";
import SocialLinks from "./SocialLinks";

const CustomLogo = styled.img`
  width: 192px;
  height: 60px;
  position: relative;
  @media (max-width: 770px) {
    height: 50px !important;
    width: 150px;
    top: -15px;
  }
`;

export default function Layout() {
  const location = useLocation();

  function scrollListener() {
    if (window.scrollY > 200) {
      document.querySelector<HTMLDivElement>(".logo_wrapper.default")!.style.display = "none";
      document.querySelector<HTMLDivElement>("#logo_transparent")!.style.display = "block";
      document.querySelector<HTMLDivElement>("#logo_transparent .logo_wrapper")!.classList.remove("hidden");
    } else {
      document.querySelector<HTMLDivElement>(".logo_wrapper.default")!.style.display = "block";
      document.querySelector<HTMLDivElement>("#logo_transparent")!.style.display = "none";
      document.querySelector<HTMLDivElement>("#logo_transparent .logo_wrapper")!.classList.add("hidden");
    }
  }

  useEffect(() => {
    window.appReady();
  }, []);

  useEffect(() => {
    scrollListener();
    const el = document.querySelector("#close_mobile_menu") as HTMLButtonElement;
    el.click();
  }, [location.pathname]);

  useEffect(() => {
    window.addEventListener("scroll", scrollListener);
    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  return (
    <div className="layout">
      <MobileSidebar />
      <div id="wrapper">
        <div className="header_style_wrapper">
          <div className="top_bar">
            <div className="standard_wrapper">
              <div id="logo_wrapper">
                <div id="logo_normal" className="logo_container">
                  <div className="logo_align">
                    <NavLink to={RoutePaths.home} id="custom_logo" className="logo_wrapper default">
                      <CustomLogo src={WatermarkImg} alt="Logo" />
                    </NavLink>
                  </div>
                </div>
                <div id="logo_transparent" className="logo_container">
                  <div className="logo_align">
                    <a id="custom_logo_transparent" className="logo_wrapper hidden" href="index.html">
                      <CustomLogo src={WatermarkWhiteImg} alt="" />
                    </a>
                  </div>
                </div>
                <div id="menu_wrapper">
                  <div id="nav_wrapper">
                    <div className="nav_wrapper_inner">
                      <div id="menu_border_wrapper">
                        <div className="menu-main-menu-container">
                          <Nav id="main_menu" className="nav" />
                        </div>
                      </div>
                    </div>
                    <div id="logo_right_button">
                      <a href="javascript:;" id="mobile_nav_icon"></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ppb_wrapper">
          <AppRoutes />
          <div className="footer_bar noborder">
            <div className="footer_bar_wrapper ">
              <SocialLinks />
              <div id="copyright">© 2025 Munstrography</div>
              <br className="clear" />
              <a id="toTop">
                <i className="fa fa-angle-up"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
