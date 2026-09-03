import { Link } from "react-router-dom";

import { HeroArrow } from "../components/HeroArrow";
import { LogoParticles } from "../components/LogoParticles";
import { PhoneShot } from "../components/PhoneShot";
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

const counts = Object.fromEntries(GALLERIES.map((gallery) => [gallery.slug, photos[gallery.slug]?.length ?? 0]));

const totalPhotos = Object.values(counts).reduce((sum, count) => sum + count, 0);

function sectionClass(src?: string) {
  return src ? "section section-photo" : "section";
}

export default function Home() {
  const heroImgRef = useParallaxImage(".hero");

  return (
    <>
      <section className="hero">
        <div className="hero-media">
          <img
            ref={heroImgRef}
            src={HERO_IMAGE}
            alt="Two Corvettes at a gas station at night"
            fetchPriority="high"
            decoding="async"
          />
        </div>
        <div className="hero-logo-stage">
          <div className="hero-logo-cluster">
            <LogoParticles />
            <h1 className="hero-logo reveal">
              <img src={WatermarkWhite} alt="Munstrography" />
            </h1>
          </div>
        </div>
        <div className="hero-copy reveal">
          <a className="hero-scroll" href="#work">
            <i />
            View my Work
          </a>
        </div>
        <HeroArrow />
      </section>

      <section className={sectionClass(HOME_SECTION_IMAGES.intro)} id="intro">
        <SectionBackdrop src={HOME_SECTION_IMAGES.intro} objectPosition="center 78%" />
        <div className="wrap intro-grid">
          <div>
            <p className="kicker">Photographer. Developer. Car enthusiast.</p>
            <h2 className="display intro-title">Hello World.</h2>
            <div className="intro-copy">
              <p className="lede">
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
          <div className="intro-stat">
            <div>
              <strong>6</strong>
              <span>Years of experience</span>
            </div>
            <div>
              <strong>150+</strong>
              <span>Shoots</span>
            </div>
            <div>
              <strong>DFW</strong>
              <span>Based in Texas</span>
            </div>
            <div>
              <strong>Night</strong>
              <span>Preferred</span>
            </div>
          </div>
        </div>
      </section>

      <section className={sectionClass(HOME_SECTION_IMAGES.gallery)} id="work">
        <SectionBackdrop src={HOME_SECTION_IMAGES.gallery} objectPosition="center 75%" />
        <div className="wrap">
          <div className="section-head split">
            <div>
              <p className="kicker">Portfolio</p>
              <h2 className="display">Gallery</h2>
            </div>
          </div>
          <ProjectGrid counts={counts} />
          <div className="btn-row stack-lg">
            <Link className="btn" to={RoutePaths.work}>
              Browse all galleries
            </Link>
          </div>
        </div>
      </section>

      <section className={sectionClass(HOME_SECTION_IMAGES.photoscout)} id="photoscout">
        <SectionBackdrop src={HOME_SECTION_IMAGES.photoscout} objectPosition="center 58%" />
        <div className="wrap">
          <div className="photoscout">
            <div className="photoscout-copy">
              <p className="kicker">App</p>
              <h2 className="display photoscout-logo">
                <img src={PHOTOSCOUT_LOGO} alt="PhotoScout" />
              </h2>
              <p className="lede">
                Let&apos;s scout the best spots. Map locations, build lists with other shooters, and keep a living
                notebook of places worth returning to.
              </p>
              <div className="feature-list">
                {PHOTOSCOUT_FEATURES.map((feature) => (
                  <div key={feature.title}>
                    <h3>{feature.title}</h3>
                    <p>{feature.body}</p>
                  </div>
                ))}
              </div>
              <div className="btn-row">
                <a className="btn" href={PHOTOSCOUT_APP_STORE_URL} target="_blank" rel="noreferrer">
                  App Store
                </a>
                <Link className="btn ghost" to={RoutePaths.photoscout}>
                  Learn more
                </Link>
              </div>
            </div>
            <div className="photoscout-media photoscout-media--device">
              <PhoneShot
                className="phone--float"
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
