import styled from "styled-components";

const ShareImage = styled.div<React.HTMLAttributes<HTMLDivElement>>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: block;
  background: white;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  max-width: 100%;
  min-height: 100%;
  z-index: 100;
`;

export default function Share() {
  return <ShareImage style={{ backgroundImage: 'url("img/share.png")' }} />;
}
