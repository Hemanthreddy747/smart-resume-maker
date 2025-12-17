import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <span>© {new Date().getFullYear()} Resume-Maker</span>
        <div className="footer-links">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms and Conditions</a>
          <a href="/contact">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
