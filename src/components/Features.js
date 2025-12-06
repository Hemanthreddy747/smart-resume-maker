import React from "react";
import "./Features.css";

const FEATURES = [
  {
    title: "AI Suggestions",
    text: "AI-assisted content suggestions tailored to your role and experience.",
  },
  {
    title: "Templates",
    text: "Multiple professional templates with live responsive preview.",
  },
  {
    title: "Live Editing",
    text: "Real-time editing, autosave and easy inline formatting.",
  },
  {
    title: "Export & Share",
    text: "Export to PDF, download or share a secure resume link.",
  },
  {
    title: "Privacy",
    text: "Secure authentication and private resume storage.",
  },
];

function IconCircle() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden>
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
        <h2 id="features-title" className="section-title">
          Key Features
        </h2>

        <ul className="features-cards">
          {FEATURES.map((f, i) => (
            <li className="feature-card" key={f.title}>
              <div className="feature-media" aria-hidden>
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
