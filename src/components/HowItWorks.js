import React from "react";
import "./HowItWorks.css";

const steps = [
  {
    title: "Choose Template",
    desc: "Pick a template that matches your style.",
    icon: (
      ""
    ),
  },
  {
    title: "Fill Resume",
    desc: "Enter your details and use AI suggestions to speed up writing.",
    icon: (
     ""
    ),
  },
  {
    title: "Download",
    desc: "Export to PDF or share a link to download your resume.",
    icon: (
     ""
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
