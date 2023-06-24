import React from "react";
import "./Footer.scss";

function Footer() {
  return (
    <div className="footer">
      <div className="container">
        {/* Top section */}
        <div className="top">
          {/* Footer items */}
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
        </div>
        <hr />
        {/* Bottom section */}
        <div className="bottom">
          {/* Left section */}
          <div className="left">
            <h2>Skillify</h2>
            <span>© Skillify Ltd. 2023</span>
          </div>
          {/* Right section */}
          <div className="right">
            {/* Social media icons */}
            <div className="social">
              <img src="/img/twitter.png" alt="" />
              <img src="/img/facebook.png" alt="" />
              <img src="/img/linkedin.png" alt="" />
              <img src="/img/pinterest.png" alt="" />
              <img src="/img/instagram.png" alt="" />
            </div>
            {/* Language selection */}
            <div className="link">
              <img src="/img/language.png" alt="" />
              <span>English</span>
            </div>
            {/* Currency selection */}
            <div className="link">
              <img src="/img/coin.png" alt="" />
              <span>USD</span>
            </div>
            {/* Accessibility icon */}
            <img src="/img/accessibility.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
