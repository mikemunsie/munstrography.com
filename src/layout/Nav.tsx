import { NavLink, useLocation } from "react-router-dom";

import { RoutePaths } from "../routes/paths";

type NavProps = {
  id: string;
  className: string;
};

export default function Nav(
  props: NavProps = {
    id: "mobile_main_menu",
    className: "mobile_main_nav",
  }
) {
  const { className, id } = props;
  const location = useLocation();

  function isCurrentPageClass(path: string) {
    return location.pathname === path ? "current-menu-item" : "";
  }

  return (
    <ul id={id} className={className}>
      <li className={`megamenu col4 menu-item ${isCurrentPageClass(RoutePaths.home)}`}>
        <NavLink to={RoutePaths.home}>Gallery</NavLink>
      </li>
      <li className={`megamenu col4 menu-item`}>
        <a target="_blank" href="https://locations.munstrography.com" rel="noreferrer">
          Spots in DFW
        </a>
      </li>
      <li className={`megamenu col4 menu-item`}>
        <a href="https://instagram.com/munstrography" rel="noreferrer">
          Instagram
        </a>
      </li>
      <li className={`megamenu col4 menu-item ${isCurrentPageClass(RoutePaths.about)}`}>
        <NavLink to={RoutePaths.about}>About</NavLink>
      </li>
    </ul>
  );
}
