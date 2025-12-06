import React from "react";
import "./HowItWorks.css";

const steps = [
  {
    title: "Choose Template",
    desc: "Pick a template that matches your style.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <rect
          x="3"
          y="4"
          width="18"
          height="14"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M7 8h10M7 12h6"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Fill Resume",
    desc: "Enter your details and use AI suggestions to speed up writing.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M3 21v-3a4 4 0 014-4h10a4 4 0 014 4v3"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 11a4 4 0 100-8 4 4 0 000 8z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Download",
    desc: "Export to PDF or share a link to download your resume.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7 10l5-5 5 5"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section
      id="howitworks"
      className="how-section"
      aria-labelledby="how-title"
    >
      <div className="how-inner">
        <div className="how-header">
          <h2 id="how-title" className="section-title">
            How It Works
          </h2>
          <p className="section-lead">
            Build a professional resume in minutes — smart, simple and
            customizable.
          </p>
        </div>

        <ol className="how-steps">
          {steps.map((s, i) => (
            <li className="how-step" key={i}>
              <div className="step-media">
                <span className="step-num">{i + 1}</span>
                <div className="step-icon" aria-hidden>
                  {s.icon}
                </div>
              </div>
              <div className="step-body">
                <h3 className="step-title">{s.title}</h3>
                <p className="step-desc">{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
