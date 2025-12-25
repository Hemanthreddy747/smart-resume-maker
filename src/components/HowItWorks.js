import React from "react";
import "./HowItWorks.css";

const steps = [
  {
    title: "Choose Your Resume Template",
    desc: "Select from our collection of professional, ATS-friendly resume templates designed for various industries and job levels.",
    icon: "",
  },
  {
    title: "Fill Your Resume Details",
    desc: "Enter your work experience, education, skills, and achievements. Use our AI-powered suggestions to write compelling content that stands out to hiring managers.",
    icon: "",
  },
  {
    title: "Download Your Professional Resume",
    desc: "Export your ATS-optimized resume as a print-ready PDF or share a secure link. Ready to apply for your dream job!",
    icon: "",
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
            How to Create Your Professional Resume in 3 Easy Steps
          </h2>
          <p className="section-lead">
            Build an ATS-friendly, professional resume in minutes — smart,
            simple, and completely customizable for any job application.
          </p>
        </div>

        <ol className="how-steps">
          {steps.map((s, i) => (
            <li className="how-step" key={i}>
              <div className="step-media">
                <span className="step-num" aria-label={`Step ${i + 1}`}>
                  {i + 1}
                </span>
                <div className="step-icon" aria-hidden="true">
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
