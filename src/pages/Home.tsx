import { Link } from "react-router-dom";

import { HeroArrow } from "../components/HeroArrow";
import { LogoParticles } from "../components/LogoParticles";
import { phoneFloat, PhoneShot } from "../components/PhoneShot";
import { ProjectGrid } from "../components/ProjectCard";
import { SectionBackdrop, useParallaxImage } from "../components/SectionBackdrop";
import {
  GALLERIES,
  HERO_IMAGE,
  HOME_SECTION_IMAGES,
  PHOTOSCOUT_APP_STORE_URL,
  PHOTOSCOUT_FEATURES,
  PHOTOSCOUT_IMAGE,
  PHOTOSCOUT_LOGO,
} from "../data/site";
import WatermarkWhite from "../images/watermark-white.png";
import photos from "../photos.json";
import { RoutePaths } from "../routes/paths";
import ps from "../styles/photoscout.module.css";
import ui from "../styles/ui.module.css";
import { cx } from "../utils/cx";
import styles from "./Home.module.css";

const counts = Object.fromEntries(GALLERIES.map((gallery) => [gallery.slug, photos[gallery.slug]?.length ?? 0]));

export default function Home() {
  const heroImgRef = useParallaxImage("[data-hero]");

  return (
    <>
      <section className={styles.hero} data-hero>
        <div className={styles.media}>
          <img
            ref={heroImgRef}
            src={HERO_IMAGE}
            alt="Two Corvettes at a gas station at night"
            fetchPriority="high"
            decoding="async"
          />
        </div>
        <div className={styles.stage}>
          <div className={styles.cluster}>
            <LogoParticles />
            <h1 className={cx(styles.logo, styles.reveal)}>
              <img src={WatermarkWhite} alt="Munstrography" />
            </h1>
            <p className={cx(styles.tagline, styles.reveal)}>Automotive Photographer</p>
          </div>
        </div>
        <div className={cx(styles.copy, styles.reveal)}>
          <a className={styles.scroll} href="#work">
            <i />
            View my Work
          </a>
        </div>
        <HeroArrow />
      </section>

      <section
        className={cx(ui.section, HOME_SECTION_IMAGES.intro && ui.sectionPhoto)}
        id="intro"
        data-section-photo=""
      >
        <SectionBackdrop src={HOME_SECTION_IMAGES.intro} objectPosition="center 78%" />
        <div className={cx(ui.wrap, styles.intro)}>
          <div>
            <h2 className={cx(ui.display, styles.title)}>Hello World.</h2>
            <div className={styles.introCopy}>
              <p className={ui.lede}>
                Munstrography is a play on my last name and the thing I can&apos;t stop doing: making art with my
                camera. I shoot in DFW and primarily in the night.
              </p>
              <p>
                Happily married, proud dad to a few crazy cats, birria-taco loyalist, coffee fanatic, and PC gamer. The
                work started with a 90s Corvette and a desire to get better after dark.
              </p>
              <Link to={RoutePaths.about}>Read the story</Link>
            </div>
          </div>
          <Link className={styles.photo} to="/gallery/night">
            <img
              src={HOME_SECTION_IMAGES.introPhoto}
              alt="Volkswagen Beetle in the rain at night"
              loading="lazy"
              decoding="async"
            />
          </Link>
        </div>
      </section>

      <section
        className={cx(ui.section, HOME_SECTION_IMAGES.gallery && ui.sectionPhoto)}
        id="work"
        data-section-photo=""
      >
        <SectionBackdrop src={HOME_SECTION_IMAGES.gallery} objectPosition="center 75%" />
        <div className={ui.wrap}>
          <div className={cx(ui.sectionHead, ui.split)}>
            <div>
              <h2 className={ui.display}>Gallery</h2>
            </div>
          </div>
          <ProjectGrid counts={counts} />
          <div className={cx(ui.btnRow, ui.stackLg)}>
            <Link className={ui.btn} to={RoutePaths.work}>
              Browse all galleries
            </Link>
          </div>
        </div>
      </section>

      <section
        className={cx(ui.section, HOME_SECTION_IMAGES.photoscout && ui.sectionPhoto)}
        id="photoscout"
        data-section-photo=""
      >
        <SectionBackdrop src={HOME_SECTION_IMAGES.photoscout} objectPosition="center 58%" />
        <div className={ui.wrap}>
          <div className={ps.panel}>
            <div className={ps.copy}>
              <p className={ui.kicker}>App</p>
              <h2 className={cx(ui.display, ps.logo)}>
                <img src={PHOTOSCOUT_LOGO} alt="PhotoScout" />
              </h2>
              <p className={ui.lede}>
                Let&apos;s scout the best spots. Map locations, build lists with other shooters, and keep a living
                notebook of places worth returning to.
              </p>
              <div className={ps.features}>
                {PHOTOSCOUT_FEATURES.map((feature) => (
                  <div key={feature.title}>
                    <h3>{feature.title}</h3>
                    <p>{feature.body}</p>
                  </div>
                ))}
              </div>
              <div className={ui.btnRow}>
                <a className={ui.btn} href={PHOTOSCOUT_APP_STORE_URL} target="_blank" rel="noreferrer">
                  App Store
                </a>
                <Link className={cx(ui.btn, ui.ghost)} to={RoutePaths.photoscout}>
                  Learn more
                </Link>
              </div>
            </div>
            <div className={cx(ps.media, ps.device)}>
              <PhoneShot
                className={phoneFloat}
                src={PHOTOSCOUT_IMAGE}
                alt="PhotoScout map of photo locations in Dallas"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
