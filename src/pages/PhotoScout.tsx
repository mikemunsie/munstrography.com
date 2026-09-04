import { PhoneShot } from "../components/PhoneShot";
import {
  PHOTOSCOUT_APP_STORE_URL,
  PHOTOSCOUT_FEATURES,
  PHOTOSCOUT_LOGO,
  PHOTOSCOUT_SHOTS,
  PHOTOSCOUT_URL,
} from "../data/site";
import ps from "../styles/photoscout.module.css";
import ui from "../styles/ui.module.css";
import { cx } from "../utils/cx";

export default function PhotoScout() {
  return (
    <>
      <section className={ui.pageHero}>
        <div className={ui.wrap}>
          <p className={ui.kicker}>App</p>
          <h1 className={cx(ui.display, ps.logo, ps.logoPage)}>
            <img src={PHOTOSCOUT_LOGO} alt="PhotoScout" />
          </h1>
          <div className={cx(ui.btnRow, ui.stackLg)}>
            <a className={ui.btn} href={PHOTOSCOUT_APP_STORE_URL} target="_blank" rel="noreferrer">
              Download on the App Store
            </a>
            <a className={cx(ui.btn, ui.ghost)} href={PHOTOSCOUT_URL} target="_blank" rel="noreferrer">
              Open on the web
            </a>
          </div>
        </div>
      </section>

      <section className={cx(ui.section, ui.sectionTight)}>
        <div className={ui.wrap}>
          <p className={ui.kicker}>iPhone</p>
          <h2 className={cx(ui.display, ps.heading, ps.shotHeading)}>From the App Store</h2>
          <div className={ps.shots}>
            {PHOTOSCOUT_SHOTS.map((shot) => (
              <PhoneShot key={shot.src} src={shot.src} alt={shot.alt} />
            ))}
          </div>
        </div>
      </section>

      <section className={cx(ui.section, ui.sectionTight)}>
        <div className={ui.wrap}>
          <div className={ps.panel}>
            <div className={ps.copy}>
              <p className={ui.kicker}>Why it exists</p>
              <h2 className={cx(ui.display, ps.heading)}>Find and share great places to shoot.</h2>
              <p className={ui.lede}>
                The best frames start with a place. PhotoScout is the notebook I wanted while driving around DFW looking
                for light, reflections, and empty lots — then sharing those pins with other photographers.
              </p>
              <div className={ps.features}>
                {PHOTOSCOUT_FEATURES.map((feature) => (
                  <div key={feature.title}>
                    <h3>{feature.title}</h3>
                    <p>{feature.body}</p>
                  </div>
                ))}
              </div>
              <div className={cx(ui.btnRow, ps.actions)}>
                <a className={ui.btn} href={PHOTOSCOUT_APP_STORE_URL} target="_blank" rel="noreferrer">
                  App Store
                </a>
                <a className={cx(ui.btn, ui.ghost)} href={PHOTOSCOUT_URL} target="_blank" rel="noreferrer">
                  locations.munstrography.com
                </a>
              </div>
            </div>
            <div className={cx(ps.media, ps.device)}>
              <PhoneShot src={PHOTOSCOUT_SHOTS[1].src} alt={PHOTOSCOUT_SHOTS[1].alt} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
