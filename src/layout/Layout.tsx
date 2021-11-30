import { PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";

import styled from "styled-components";

import { RoutePaths } from "../routes/paths";
import AppRoutes from "../routes/Routes";
import MobileSidebar from "./MobileSidebar";
import Nav from "./Nav";

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

export default function Layout(props: PropsWithChildren<any>) {
  return (
    <div className="layout">
      <a id="close_mobile_menu" href="javascript:;"></a>
      <div className="mobile_menu_wrapper">
        <div className="menu-side-mobile-menu-container">
          <Nav id="mobile_main_menu" className="mobile_main_nav" />
          <div className="page_content_wrapper">
            <MobileSidebar />
          </div>
        </div>
      </div>
      <div id="wrapper">
        <div className="header_style_wrapper">
          <div className="top_bar">
            <div className="standard_wrapper">
              <div id="logo_wrapper">
                <div id="logo_normal" className="logo_container">
                  <div className="logo_align">
                    <NavLink to={RoutePaths.home} id="custom_logo" className="logo_wrapper default">
                      <CustomLogo src="img/watermark.png" alt="Logo" />
                    </NavLink>
                  </div>
                </div>
                <div id="logo_transparent" className="logo_container">
                  <div className="logo_align">
                    <a id="custom_logo_transparent" className="logo_wrapper hidden" href="index.html">
                      <CustomLogo src="img/watermark-white.png" alt="" />
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
          <div className="footer_bar single_gallery noborder">
            <div className="footer_bar_wrapper ">
              <div className="social_wrapper">
                <ul>
                  <li className="facebook">
                    <a target="_blank" href="index.html">
                      <i className="fa fa-facebook-official"></i>
                    </a>
                  </li>
                  <li className="instagram">
                    <a target="_blank" title="Instagram" href="index.html">
                      <i className="fa fa-instagram"></i>
                    </a>
                  </li>
                </ul>
              </div>
              <div id="copyright">© Munstrography</div>
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
