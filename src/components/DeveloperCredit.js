import React from "react";
import hemanthImage from "../assets/images/hemanth_image.jpg";
import "./DeveloperCredit.css";

const DeveloperCredit = () => {
  return (
    <div className="lp-developer-credit" aria-hidden="false">
      <a
        href="https://www.linkedin.com/in/hemanth-reddy-medapati/"
        target="_blank"
        rel="noopener noreferrer"
        className="lp-developer-link"
        aria-label="Open developer LinkedIn profile (opens in new tab)"
      >
        <img
          src={hemanthImage}
          alt="Hemanth Reddy Medapati"
          className="lp-developer-avatar"
        />
        <div className="lp-developer-meta">
          <span className="lp-developer-name">Hemanth Reddy</span>
          <span className="lp-developer-role">Developer</span>
        </div>
      </a>
    </div>
  );
};

export default DeveloperCredit;
