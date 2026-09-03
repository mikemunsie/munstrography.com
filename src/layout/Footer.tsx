import { Link } from "react-router-dom";

import { SectionBackdrop } from "../components/SectionBackdrop";
import { INSTAGRAM_URL, PHOTOSCOUT_APP_STORE_URL } from "../data/site";
import { RoutePaths } from "../routes/paths";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <span>© {new Date().getFullYear()} Munstrography</span>
        <div className="footer-links">
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href={PHOTOSCOUT_APP_STORE_URL} target="_blank" rel="noreferrer">
            PhotoScout
          </a>
          <Link to={RoutePaths.about}>About</Link>
        </div>
      </div>
    </footer>
  );
}

export function ContactBand({ background }: { background?: string }) {
  return (
    <section className={background ? "contact section-photo" : "contact"} id="contact">
      {background ? <SectionBackdrop src={background} objectPosition="center 48%" /> : null}
      <div className="wrap">
        <p className="kicker">Get in touch</p>
        <h2 className="display">Let's make art.</h2>
        <div className="contact-meta">
          <span>Michael Munsie</span>
          <span>Automotive photographer · DFW</span>
        </div>
        <div className="btn-row">
          <a className="btn" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
            Book on Instagram
          </a>
          <a className="btn ghost" href={PHOTOSCOUT_APP_STORE_URL} target="_blank" rel="noreferrer">
            PhotoScout on the App Store
          </a>
        </div>
      </div>
    </section>
  );
}
