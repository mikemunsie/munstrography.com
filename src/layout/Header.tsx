import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import { INSTAGRAM_URL, PHOTOSCOUT_URL } from "../data/site";
import WatermarkWhite from "../images/watermark-white.png";
import { RoutePaths } from "../routes/paths";
import { cx } from "../utils/cx";
import styles from "./Header.module.css";

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
  const isHome = location.pathname === RoutePaths.home;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [pastHero, setPastHero] = useState(!isHome);

  useEffect(() => {
    const hero = isHome ? document.querySelector("[data-hero]") : null;
    const rootStyles = getComputedStyle(document.documentElement);
    const headerH = parseFloat(rootStyles.getPropertyValue("--header-h")) || 76;

    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      if (!isHome || !hero) {
        setPastHero(true);
        return;
      }
      setPastHero(hero.getBoundingClientRect().bottom <= headerH);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <a className={styles.skip} href="#main">
        Skip to content
      </a>
      <header className={cx(styles.header, (scrolled || solid || open) && styles.scrolled, solid && styles.solid)}>
        <div className={styles.inner}>
          <Link
            to={RoutePaths.home}
            className={cx(styles.logo, pastHero && styles.logoIn)}
            aria-label="Munstrography home"
            aria-hidden={!pastHero}
            tabIndex={pastHero ? undefined : -1}
            onClick={(event) => {
              setOpen(false);
              if (location.pathname === RoutePaths.home) {
                event.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            <img src={WatermarkWhite} alt="" />
          </Link>
          <nav className={styles.desktop} aria-label="Primary">
            {LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === RoutePaths.home}
                className={({ isActive }) =>
                  isActive || (link.to === RoutePaths.work && location.pathname.startsWith("/gallery"))
                    ? styles.active
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
            className={cx(styles.toggle, open && styles.toggleOpen)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
          </button>
        </div>
      </header>
      <div className={cx(styles.mobile, open && styles.mobileOpen)} aria-hidden={!open} inert={!open}>
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
        <div className={styles.meta}>
          <a href={PHOTOSCOUT_URL} target="_blank" rel="noreferrer">
            Open PhotoScout
          </a>
          <span>DFW</span>
        </div>
      </div>
    </>
  );
}
