import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-inner">
        <span>
          © {new Date().getFullYear()} AllinoneResume - Free Professional Resume
          Builder
        </span>
        <nav className="footer-links" aria-label="Footer navigation">
          <Link to="/blog" aria-label="Read resume tips and career advice blog">
            Blog
          </Link>
          <Link to="/privacy" aria-label="View privacy policy">
            Privacy Policy
          </Link>
          <Link to="/terms" aria-label="View terms and conditions">
            Terms and Conditions
          </Link>
          <Link to="/contact" aria-label="Contact us for support">
            Contact Us
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
