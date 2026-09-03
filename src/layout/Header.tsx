import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { INSTAGRAM_URL, PHOTOSCOUT_URL } from "../data/site";
import { RoutePaths } from "../routes/paths";

const LINKS = [
  { to: RoutePaths.home, label: "Home" },
  { to: RoutePaths.work, label: "Work" },
  { to: RoutePaths.photoscout, label: "PhotoScout" },
  { to: RoutePaths.about, label: "About" },
] as const;

type HeaderProps = {
  solid?: boolean;
};

export default function Header({ solid = false }: HeaderProps) {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const headerClass = ["header", scrolled || solid || open ? "is-scrolled" : "", solid ? "is-solid" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className={headerClass}>
        <div className="header-inner">
          <nav className="nav-desktop" aria-label="Primary">
            {LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === RoutePaths.home}
                className={({ isActive }) =>
                  isActive || (link.to === RoutePaths.work && location.pathname.startsWith("/gallery"))
                    ? "active"
                    : undefined
                }
              >
                {link.label}
              </NavLink>
            ))}
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
              Instagram
            </a>
          </nav>
          <button
            type="button"
            className={`menu-toggle${open ? " is-open" : ""}`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
          </button>
        </div>
      </header>
      <div className={`nav-mobile${open ? " is-open" : ""}`} aria-hidden={!open} inert={!open}>
        <nav aria-label="Mobile">
          {LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === RoutePaths.home} onClick={() => setOpen(false)}>
              {link.label}
            </NavLink>
          ))}
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
            Instagram
          </a>
        </nav>
        <div className="nav-meta">
          <a href={PHOTOSCOUT_URL} target="_blank" rel="noreferrer">
            Open PhotoScout
          </a>
          <span>DFW</span>
        </div>
      </div>
    </>
  );
}
