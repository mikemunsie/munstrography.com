import styled from "styled-components";

const LINKS = [
  { label: "Venmo", href: "https://account.venmo.com/u/munstrography" },
  { label: "Spots in DFW", href: "https://locations.munstrography.com/auth/dashboard/locations" },
  { label: "Gallery", href: "https://munstrography.com/" },
  { label: "Book me", href: "https://www.instagram.com/munstrography" },
] as const;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  margin: 0 auto;
  padding: 40px 0px 32px 0;
  font-family: "Hind", "Helvetica Neue", Arial, Verdana, sans-serif;
`;

const ProfileImg = styled.img<React.ImgHTMLAttributes<HTMLImageElement>>`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 16px;
`;

const Name = styled.h1`
  font-family: "Montserrat", "Helvetica Neue", Arial, Verdana, sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: #222;
  margin: 0 0 8px;
  letter-spacing: 1px;

  @media (prefers-color-scheme: dark) {
    color: #e8e8e8;
  }
`;

const Bio = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: #444;
  margin: 0 0 24px;
  text-align: center;

  @media (prefers-color-scheme: dark) {
    color: #c9c9c9;
  }
`;

const LinkList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const LinkButton = styled.a<React.AnchorHTMLAttributes<HTMLAnchorElement>>`
  display: block;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  text-decoration: none;
  padding: 14px 24px;
  color: #fff;
  background: #222;
  border: 2px solid #222;
  text-transform: uppercase;
  font-size: 13px;
  font-family: "Montserrat", "Helvetica Neue", Arial, Verdana, sans-serif;
  font-weight: 600;
  letter-spacing: 2px;
  transition: color 0.2s linear, background 0.2s linear, border-color 0.2s linear;

  &:hover {
    color: #222;
    background: transparent;
    border-color: #222;
  }

  @media (prefers-color-scheme: dark) {
    color: #fff;
    background: #333;
    border-color: #444;

    &:hover {
      color: #e5e5e5;
      background: transparent;
      border-color: #666;
    }
  }
`;

const Copyright = styled.p`
  margin-top: 32px;
  font-size: 12px;
  color: #888;
  font-family: "Hind", "Helvetica Neue", Arial, Verdana, sans-serif;

  @media (prefers-color-scheme: dark) {
    color: #999;
  }
`;

export default function Social() {
  return (
    <div className="one" style={{ paddingTop: "20px" }}>
      <div className="standard_wrapper">
        <div className="page_content_wrapper">
          <div className="inner">
            <Wrapper>
              <ProfileImg className="img" src="/img/instagram-profile.jpg" alt="Munstrography" />
              <Name>Munstrography</Name>
              <Bio>Car photographer & enthusiast. DFW-based. Available for shoots.</Bio>
              <LinkList>
                {LINKS.map(({ label, href }) => (
                  <LinkButton key={label} href={href} target="_blank" rel="noreferrer">
                    {label}
                  </LinkButton>
                ))}
              </LinkList>
              <Copyright>© {new Date().getFullYear()} Munstrography</Copyright>
            </Wrapper>
          </div>
        </div>
      </div>
    </div>
  );
}
