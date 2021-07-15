import React from "react";
import "./AboutUs.css";

function AboutUs() {
  return (
    <div className="aboutPage">
      <div id="about_title">SOLUX 여대추리반</div>

      <div id="about_info">
        <p>개발기간 : 2021.07.04 ~ 2021.</p>
      </div>

      <div className="about_content">
        <div className="kim">
          <div className="about_name">김유진</div>
          <div className="about_role"></div>
        </div>

        <div className="hwang">
          <div className="about_name">황유진</div>
          <div className="about_role"></div>
        </div>

        <div className="baek">
          <div className="about_name">백지은</div>
          <div className="about_role"></div>
        </div>

        <div className="oh">
          <div className="about_name">오예지</div>
          <div className="about_role"></div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
