import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";
import "./Home.css";
import "./Landing.css";
// Removed TemplatesSection and EditResume imports as they are no longer used
import heroImg from "../assets/lisbon-resume-templates.jpg";
import "./TemplateStyles.css";
import Features from "./Features";
import HowItWorks from "./HowItWorks";
import DeveloperCredit from "./DeveloperCredit";
import TemplatesPreview from "./TemplatesPreview";

const Landing = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const goToTemplates = () => navigate("/edit-template");

  // Scroll to hash targets like #features or #howitworks on load
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, []);

  return (
    <div className="landing-root">
      {/* Navbar is now global via App layout */}

      {
        <section
          className="hero-section hero-theme"
          aria-labelledby="hero-title"
        >
          <div className="hero-bg" aria-hidden="true" />
          <div className="container hero-inner">
            <div className="hero-left">
              <div className="eyebrow">Build confidently</div>
              <h1 id="hero-title" className="hero-title">
                Modern resumes — crafted for hiring managers and ATS
              </h1>
              <p className="hero-sub">
                Create a clean, professional resume in minutes. Pick a template,
                tailor sections, and export a print-ready PDF with one click.
              </p>

              <div className="hero-ctas">
                <button
                  className="btn btn-gradient btn-lg"
                  onClick={goToTemplates}
                >
                  Start for free
                </button>
                <button className="btn btn-outline" onClick={goToTemplates}>
                  Browse templates
                </button>
              </div>

              <div className="hero-features">
                <div className="feature-pill">ATS-ready</div>
                <div className="feature-pill">Smart sections</div>
                <div className="feature-pill">PDF export</div>
              </div>
            </div>

            <div className="hero-right">
              <div className="hero-preview">
                <div className="preview-frame">
                  <img src={heroImg} alt="Resume templates preview" />
                </div>
                <div className="preview-badge">Templates • Free</div>
              </div>
              <div className="trust-row">
                <div className="trust-item">Trusted by 50k+ professionals</div>
                <div className="trust-item">PDF export • Print-ready</div>
              </div>
            </div>
          </div>
        </section>
      }

      <TemplatesPreview />

      <main>
        {/* Templates section removed */}

        <Features />

        <HowItWorks />

        {/* Developer & Maintainer Credit */}
        <DeveloperCredit />
      </main>

      {/* Footer is now global via App layout */}

      <LoginModal show={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  );
};

export default Landing;
