import { INSTAGRAM_URL, PHOTOSCOUT_APP_STORE_URL } from "../data/site";

const LINKS = [
  { label: "Gallery", href: "/" },
  { label: "PhotoScout", href: PHOTOSCOUT_APP_STORE_URL },
  { label: "Instagram", href: INSTAGRAM_URL },
  { label: "Venmo", href: "https://account.venmo.com/u/munstrography" },
] as const;

export default function Social() {
  return (
    <div className="social-page">
      <div className="social-card">
        <img src="/img/instagram-profile.jpg" alt="Munstrography" />
        <h1>Munstrography</h1>
        <p>Car photographer & enthusiast. DFW-based. Available for shoots.</p>
        {LINKS.map(({ label, href }) => (
          <a
            key={label}
            className="btn"
            href={href}
            target={href.startsWith("/") ? undefined : "_blank"}
            rel="noreferrer"
          >
            {label}
          </a>
        ))}
        <p style={{ marginTop: "1.5rem", fontSize: "0.8rem" }}>© {new Date().getFullYear()} Munstrography</p>
      </div>
    </div>
  );
}
