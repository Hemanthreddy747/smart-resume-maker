import React from "react";
import "./Features.css";

const FEATURES = [
  {
    title: "AI-Powered Resume Suggestions",
    text: "Get intelligent, AI-assisted content suggestions tailored to your specific role, industry, and experience level. Save hours of writing time.",
  },
  {
    title: "Professional ATS-Friendly Templates",
    text: "Access multiple professional resume templates optimized for Applicant Tracking Systems. Live responsive preview ensures perfect formatting.",
  },
  {
    title: "Real-Time Resume Editing",
    text: "Edit your resume with instant preview, automatic saving, and easy inline formatting. See changes as you type with our intuitive editor.",
  },
  {
    title: "Export & Share Your Resume",
    text: "Download your professional resume as PDF, export to multiple formats, or share a secure resume link with potential employers.",
  },
  {
    title: "Privacy & Security First",
    text: "Your resume data is protected with secure authentication, encrypted storage, and private resume management. Your information stays safe.",
  },
];

function IconCircle() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="g1" x1="0" x2="1">
          <stop offset="0%" stopColor="#4f46e5" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="12" fill="url(#g1)" opacity="0.12" />
      <path
        d="M9 12.5l2 2 4-4"
        stroke="#0b1223"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(0.5,0.5)"
      />
    </svg>
  );
}

export default function Features() {
  return (
    <section
      id="features"
      className="features-section"
      aria-labelledby="features-title"
    >
      <div className="container features-inner">
        <h2 id="features-title" className="section-title mb-3">
          Key Features of Our Free Resume Builder
        </h2>
        <p className="section-lead">
          Everything you need to create a professional, ATS-optimized resume
          that gets results
        </p>

        <ul className="features-cards">
          {FEATURES.map((f, i) => (
            <li className="feature-card" key={f.title}>
              <div className="feature-media" aria-hidden="true">
                <IconCircle />
              </div>
              <div className="feature-body">
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
