import { PhoneShot } from "../components/PhoneShot";
import {
  PHOTOSCOUT_APP_STORE_URL,
  PHOTOSCOUT_FEATURES,
  PHOTOSCOUT_LOGO,
  PHOTOSCOUT_SHOTS,
  PHOTOSCOUT_URL,
} from "../data/site";

export default function PhotoScout() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="kicker">App</p>
          <h1 className="display photoscout-logo">
            <img src={PHOTOSCOUT_LOGO} alt="PhotoScout" />
          </h1>
          <p className="lede">
            Let&apos;s scout the best spots. Discover, save, and share great places to shoot — maps, lists, and
            community activity in one app, so you spend less time hunting and more time shooting.
          </p>
          <div className="btn-row stack-lg">
            <a className="btn" href={PHOTOSCOUT_APP_STORE_URL} target="_blank" rel="noreferrer">
              Download on the App Store
            </a>
            <a className="btn ghost" href={PHOTOSCOUT_URL} target="_blank" rel="noreferrer">
              Open on the web
            </a>
          </div>
        </div>
      </section>

      <section className="section section-tight">
        <div className="wrap">
          <p className="kicker">iPhone</p>
          <h2 className="display photoscout-heading shot-heading">From the App Store</h2>
          <div className="shot-row">
            {PHOTOSCOUT_SHOTS.map((shot) => (
              <PhoneShot key={shot.src} src={shot.src} alt={shot.alt} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tight">
        <div className="wrap">
          <div className="photoscout">
            <div className="photoscout-copy">
              <p className="kicker">Why it exists</p>
              <h2 className="display photoscout-heading">Built from the same nights as the galleries.</h2>
              <p className="lede">
                The best frames start with a place. PhotoScout is the notebook I wanted while driving around DFW looking
                for light, reflections, and empty lots — then sharing those pins with other photographers.
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
                <a className="btn ghost" href={PHOTOSCOUT_URL} target="_blank" rel="noreferrer">
                  locations.munstrography.com
                </a>
              </div>
            </div>
            <div className="photoscout-media photoscout-media--device">
              <PhoneShot src={PHOTOSCOUT_SHOTS[1].src} alt={PHOTOSCOUT_SHOTS[1].alt} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
