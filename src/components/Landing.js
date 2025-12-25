import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";
import SEO from "./SEO";
import "./Landing.css";
import img1 from "../assets/herosectionimages/lisbon-resume-templates.jpg";
import img2 from "../assets/herosectionimages/Alexandra_Martinez_20251217_235742_Resume_page-0001.jpg";
import img3 from "../assets/herosectionimages/Emily_Rodger_20251217_235720_Resume_page-0001.jpg";
import img4 from "../assets/herosectionimages/lisbon-resume-templates.jpg";
import img5 from "../assets/herosectionimages/Olivia_Bennett_20251217_235733_Resume_page-0001.jpg";
import "./TemplateStyles.css";
import Features from "./Features";
import HowItWorks from "./HowItWorks";
import DeveloperCredit from "./DeveloperCredit";
import TemplatesPreview from "./TemplatesPreview";

const Landing = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const goToTemplates = () => navigate("/edit-template");

  const images = [img1, img2, img3, img4, img5];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  // Image carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="landing-root">
      <SEO
        title="Smart AllinoneResume - Free Professional Resume Builder | ATS-Friendly Templates"
        description="Create a professional, ATS-optimized resume in minutes with Smart AllinoneResume. Choose from modern templates, use AI suggestions, and download as PDF for free. Trusted by 50,000+ job seekers."
        keywords="free resume builder, ATS resume, professional resume maker, CV builder online, resume templates free, job application resume, modern resume design, AI resume builder, resume download PDF, career resume builder"
        canonical="https://smartallinoneresume.com"
      />
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
                Free Professional Resume Builder - ATS-Optimized Templates for
                Job Success
              </h1>
              <p className="hero-sub">
                Create a standout, ATS-friendly resume in minutes. Choose from
                expertly designed templates, customize with smart AI
                suggestions, and export a print-ready PDF instantly. Land your
                dream job faster with our free resume builder trusted by
                professionals worldwide.
              </p>

              <div className="hero-ctas">
                <button
                  className="btn btn-gradient btn-lg"
                  onClick={goToTemplates}
                  aria-label="Start creating your free professional resume"
                >
                  Start for free
                </button>
                <button
                  className="btn btn-outline"
                  onClick={goToTemplates}
                  aria-label="Browse ATS-friendly resume templates"
                >
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
                  <img
                    src={images[currentImageIndex]}
                    alt={`Professional ATS-friendly resume template example ${
                      currentImageIndex + 1
                    } - Modern design for job applications`}
                    loading="eager"
                  />
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

        <section className="testimonials-section" id="testimonials">
          <div className="container">
            <h2>What Job Seekers Say About Our Resume Builder</h2>
            <p className="section-lead">
              Join thousands of professionals who landed their dream jobs with
              our ATS-friendly resume templates
            </p>
            <div className="testimonials-grid">
              <div className="testimonial">
                <p>
                  "This free resume builder is incredible! Created a
                  professional, ATS-optimized resume in under 10 minutes. The
                  templates are modern and the AI suggestions saved me hours of
                  work."
                </p>
                <cite>- Sarah Johnson, Software Engineer at Tech Startup</cite>
              </div>
              <div className="testimonial">
                <p>
                  "Easy to use and truly ATS-friendly. I got 3x more interview
                  calls after switching to this resume builder. The PDF export
                  is flawless and hiring managers love the clean design."
                </p>
                <cite>- Michael Chen, Marketing Manager</cite>
              </div>
              <div className="testimonial">
                <p>
                  "The resume templates are modern, professional, and completely
                  free. PDF export is perfect for job applications. Best online
                  resume builder I've used!"
                </p>
                <cite>- Emily Davis, Data Analyst</cite>
              </div>
            </div>
          </div>
        </section>

        <section className="faq-section" id="faq">
          <div className="container">
            <h2>Frequently Asked Questions About Our Resume Builder</h2>
            <details>
              <summary>Is this resume builder really free?</summary>
              <p>
                Yes! Our core resume builder features are 100% free. Create
                unlimited resumes, use professional templates, and download as
                PDF without any cost. Premium features like advanced AI
                suggestions and priority support are available for users who
                need extra help.
              </p>
            </details>
            <details>
              <summary>Are your resume templates ATS-friendly?</summary>
              <p>
                Absolutely! All our resume templates are specifically optimized
                for Applicant Tracking Systems (ATS). They use clean formatting,
                standard fonts, and proper structure to ensure your resume
                passes automated screening and reaches hiring managers.
              </p>
            </details>
            <details>
              <summary>Can I export my resume as PDF?</summary>
              <p>
                Yes! You can export your professional resume as a high-quality,
                print-ready PDF file with one click. The PDF maintains perfect
                formatting and is optimized for both digital submission and
                physical printing for job applications.
              </p>
            </details>
            <details>
              <summary>How do I get started building my resume?</summary>
              <p>
                Getting started is simple! Click "Start for free" above, choose
                from our professional resume templates, fill in your information
                with AI-powered suggestions, and download your ATS-optimized
                resume as PDF. No registration required to start.
              </p>
            </details>
            <details>
              <summary>
                What makes your resume builder better than others?
              </summary>
              <p>
                Our resume builder combines AI-powered content suggestions,
                ATS-optimized templates, real-time editing, and professional PDF
                export - all completely free. Unlike other builders, we focus on
                helping you create resumes that actually get past automated
                screening and impress hiring managers.
              </p>
            </details>
            <details>
              <summary>Can I use this for different types of jobs?</summary>
              <p>
                Yes! Our resume templates work for all industries and job levels
                - from entry-level positions to executive roles. Whether you're
                in tech, healthcare, finance, education, or any other field, our
                ATS-friendly templates adapt to your needs.
              </p>
            </details>
          </div>
        </section>

        {/* Developer & Maintainer Credit */}
        <DeveloperCredit />
      </main>

      {/* Footer is now global via App layout */}

      <LoginModal show={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  );
};

export default Landing;
