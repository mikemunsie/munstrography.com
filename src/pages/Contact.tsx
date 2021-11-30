import { NavLink } from "react-router-dom";

import { RoutePaths } from "../routes/paths";

export default function Contact() {
  return (
    <div className="standard_wrapper" style={{ paddingTop: 40 }}>
      <div className="page_content_wrapper">
        <div className="inner">
          <div>
            <h2 className="ppb_title">Contact</h2>
            <hr className="title_break center" />
          </div>
        </div>
        <div className="textwidget">
          <h5>All ready for a shoot?</h5>
          <p>
            Please let me know what package + addons you'd like from the{" "}
            <NavLink to={RoutePaths.pricing}>
              <strong>Pricing</strong>
            </NavLink>{" "}
            section ! You can email me or contact me via social media.
            <br />
            <br />
            <a className="button" href="mailto:munstrography@gmail.com">
              Send me an email
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
