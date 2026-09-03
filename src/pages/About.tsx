import { ABOUT_IMAGE, INSTAGRAM_URL, PHOTOSCOUT_APP_STORE_URL } from "../data/site";

export default function About() {
  return (
    <section className="page-hero">
      <div className="wrap about-grid">
        <div className="about-photo">
          <img src={ABOUT_IMAGE} alt="Michael Munsie" />
        </div>
        <div className="about-copy">
          <h1 className="display">My Story</h1>
          <p className="lede">
            Munstrography is a play on my last name + photography. I am a software developer by day and a photographer
            by night. Happily married and a proud father to a few crazy cats. Car enthusiast, lover of birria tacos,
            coffee fanatic, and a huge PC gamer.
          </p>
          <p>
            I enjoy exploring new destinations, getting inspired by other amazing photographers, and meeting new people
            and hearing their stories! It's been a blast to meet so many car enthusiasts over the years! My ultimate
            goal is to continue learning and improving my craft, all the while having some great memories with each
            shoot that I take.
          </p>
          <p>
            When I&apos;m not behind a camera, I&apos;m building software — including PhotoScout, the location app for
            the spots behind these galleries.
          </p>
          <div className="btn-row stack-lg">
            <a className="btn" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a className="btn ghost" href={PHOTOSCOUT_APP_STORE_URL} target="_blank" rel="noreferrer">
              PhotoScout
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
