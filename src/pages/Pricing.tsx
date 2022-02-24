import { NavLink } from "react-router-dom";

import { RoutePaths } from "../routes/paths";

export default function Pricing() {
  return (
    <div className="ppb_wrapper" style={{ paddingTop: "40px" }}>
      <div className="page_content_wrapper">
        <div className="pricing_content_wrapper light">
          <div className="pricing one_third">
            <div className="pricing_wrapper_border">
              <ul className="pricing_wrapper" style={{ minHeight: 550 }}>
                <li className="title_row" style={{ background: "#333", color: "#fff" }}>
                  Basic
                </li>
                <li className="price_row">
                  <strong>$</strong>
                  <em className="exact_price">80</em>
                  <em className="time"></em>
                </li>
                <li>One hour of photos</li>
                <li>10 processed images guaranteed</li>
                <li>One location</li>
                <li>Day / Night</li>
                <li>Instagram optimized images</li>
                <li>Full size images with no watermark</li>
                <li className="button_row">
                  <NavLink to={RoutePaths.contact} className="button">
                    Book Now
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="pricing one_third">
            <div className="pricing_wrapper_border">
              <ul className="pricing_wrapper" style={{ minHeight: 550 }}>
                <li className="title_row" style={{ background: "#333", color: "#fff" }}>
                  Advanced
                </li>
                <li className="price_row">
                  <strong>$</strong>
                  <em className="exact_price">150</em>
                  <em className="time"></em>
                </li>
                <li>1.5 hours of photos</li>
                <li>20 processed images guaranteed</li>
                <li>Two locations</li>
                <li>Day / Night</li>
                <li>Raw files included</li>
                <li className="button_row featured">
                  <NavLink to={RoutePaths.contact} className="button">
                    Book Now
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="pricing one_third last">
            <div className="pricing_content_wrapper light">
              <div className="pricing_wrapper_border">
                <ul className="pricing_wrapper" style={{ minHeight: 550 }}>
                  <li className="title_row" style={{ background: "#333", color: "#fff" }}>
                    Custom
                  </li>
                  <li className="price_row">
                    <em className="exact_price">---</em>
                    <em className="time"></em>
                  </li>
                  <li>Variable time of photos</li>
                  <li>Your choice of location(s)</li>
                  <li>Your choice of number of processed images</li>
                  <li>Let's talk about what you have in mind and then I can help figure out a price that works best</li>
                  <li className="button_row featured">
                    <NavLink to={RoutePaths.contact} className="button">
                      Book Now
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="standard_wrapper">
        <h2 className="ppb_title">Addons</h2>
        <hr className="title_break" />
      </div>
      <div className="standard_wrapper">
        <div className="one_third ppb_text">
          <div className="page_content_wrapper">
            <div className="inner">
              <div>
                <h5>
                  Rollers <strong>($25 / shot)</strong>
                </h5>
                <p>
                  Roller shots (vehicle in motion shot) are definitely the most difficult shots to take! To make this
                  setup happen, we will need an additional driver, and a non busy road. There are a few destinations I
                  know about, but we will discuss where.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="one_third ppb_text">
          <div className="page_content_wrapper">
            <div className="inner">
              <div>
                <h5>
                  Composites <strong>($25 / Edit)</strong>
                </h5>
                <p>
                  If you would like any of the photos we took as a special type of edit, I can do that for you! I will
                  work with you on a design that I can achieve given the vision you have in mind!
                  <br />
                  <br />I can also edit a photo that you have already taken if the resolution is good enough to work
                  with.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="clear" style={{ paddingTop: 30 }}></div>

      <div className="standard_wrapper">
        <h2 className="ppb_title">Other Services</h2>
        <hr className="title_break" />
      </div>
      <div className="standard_wrapper">
        <div className="one_third ppb_text">
          <div className="page_content_wrapper">
            <div className="inner">
              <div>
                <h5>
                  Clean Edits <strong>($5 / Edit)</strong>
                </h5>
                <p>
                  If you have some photos of your ride that you really enjoy but don't know how to edit, let me take a
                  look at them! For $5 a shot, I will transform your photo into a clean edit that's instagram worthy!
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="one_third ppb_text">
          <div className="page_content_wrapper">
            <div className="inner">
              <div>
                <h5>
                  Training <strong>($50/hr)</strong>
                </h5>
                <p>
                  I can help you learn how to use your camera, process photos, create instagram stories, crop images
                  correctly, and a lot more! I would love to knowledge share and help get you where you ultimately would
                  like to be with your project!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
