import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";
import "./Home.css";
import "./Landing.css";
// Removed TemplatesSection and EditResume imports as they are no longer used
import heroImg from "../assets/lisbon-resume-templates.jpg";
import dummyTemplates from "./dummyTemplates";
import "./TemplateStyles.css";
import Features from "./Features";
import HowItWorks from "./HowItWorks";
import DeveloperCredit from "./DeveloperCredit";

function ResumeView({
  data,
  editable,
  onChange,
  forPrint,
  isPreview,
  templateId = 1,
}) {
  if (!data) return null;

  const getTemplateStyles = () => {
    switch (templateId) {
      case 1:
        return {
          primaryColor: "#2b6cb0",
          secondaryColor: "#3182ce",
          accentBg: "#ebf4ff",
          fontFamily: "'Inter', Arial, sans-serif",
          headerAlign: "center",
          sectionBorderStyle: "2px solid #2b6cb0",
          skillBadgeBg: "#ebf4ff",
          skillBadgeColor: "#1a365d",
          nameColor: "#000",
          titleColor: "#000",
          skillsLayout: "grid",
          skillBorderRadius: "4px",
          skillPadding: "6px 10px",
        };
      case 2:
        return {
          primaryColor: "#1a202c",
          secondaryColor: "#2d3748",
          accentBg: "#edf2f7",
          fontFamily: "'Georgia', serif",
          headerAlign: "left",
          sectionBorderStyle: "none",
          sectionUnderline: "3px solid #1a202c",
          skillBadgeBg: "transparent",
          skillBadgeColor: "#1a202c",
          skillBorder: "1px solid #cbd5e0",
          nameColor: "#1a202c",
          titleColor: "#2d3748",
          skillsLayout: "flex",
          skillBorderRadius: "20px",
          skillPadding: "8px 16px",
        };
      case 3:
        return {
          primaryColor: "#ec4899",
          secondaryColor: "#8b5cf6",
          accentBg: "linear-gradient(135deg, #fce7f3 0%, #ede9fe 100%)",
          fontFamily: "'Poppins', 'Segoe UI', sans-serif",
          headerAlign: "center",
          sectionBorderStyle: "none",
          sectionGradient: "linear-gradient(90deg, #ec4899 0%, #8b5cf6 100%)",
          sectionBgGradient:
            "linear-gradient(135deg, #fdf2f8 0%, #f5f3ff 100%)",
          skillBadgeBg: "linear-gradient(135deg, #f9a8d4 0%, #c4b5fd 100%)",
          skillBadgeColor: "#ffffff",
          nameColor: "#1f2937",
          titleColor: "#6b7280",
          titleBg: "linear-gradient(135deg, #fce7f3 0%, #ede9fe 100%)",
          skillsLayout: "flex",
          skillBorderRadius: "25px",
          skillPadding: "6px 20px",
          skillShadow: "0 4px 6px rgba(139, 92, 246, 0.2)",
        };
      default:
        return {
          primaryColor: "#2b6cb0",
          secondaryColor: "#3182ce",
          accentBg: "#ebf4ff",
          fontFamily: "'Inter', Arial, sans-serif",
          headerAlign: "center",
          sectionBorderStyle: "2px solid #2b6cb0",
          skillBadgeBg: "#ebf4ff",
          skillBadgeColor: "#1a365d",
          nameColor: "#000",
          titleColor: "#000",
          skillsLayout: "grid",
          skillBorderRadius: "4px",
          skillPadding: "6px 10px",
        };
    }
  };

  const templateStyles = getTemplateStyles();

  const containerStyle = {
    border: editable ? "none" : "1px solid var(--border-light)",
    borderRadius: 0,
    padding: editable ? "clamp(16px, 3vw, 30px)" : "clamp(20px, 4vw, 40px)",
    background: "var(--bg-primary)",
    width: isPreview
      ? "100%"
      : forPrint
      ? "210mm"
      : editable
      ? "100%"
      : "210mm",
    minHeight: forPrint ? "297mm" : "auto",
    margin: "0 auto",
    fontFamily: templateStyles.fontFamily,
    lineHeight: 1.35,
    boxShadow: editable ? "none" : "var(--shadow-md)",
    boxSizing: "border-box",
  };

  const headerStyle = {
    textAlign: templateStyles.headerAlign,
    marginBottom: 25,
  };

  const nameStyle = {
    fontSize: editable ? "clamp(24px, 5vw, 30px)" : "clamp(28px, 5vw, 34px)",
    fontWeight: 800,
    color: templateStyles.nameColor,
    margin: 0,
  };

  const titleStyle = {
    fontSize: "clamp(14px, 3vw, 16px)",
    fontWeight: 600,
    margin: 0,
    marginTop: 4,
    color: templateStyles.titleColor,
    ...(templateStyles.titleBg && {
      background: templateStyles.titleBg,
      padding: "8px 20px",
      borderRadius: "20px",
      display: "inline-block",
      marginTop: 8,
    }),
  };

  const contactStyle = {
    fontSize: 13,
    color: "#000",
    marginTop: 8,
    textAlign: "center",
  };

  const contactSeparator = {
    margin: "0 6px",
  };

  const sectionTitleStyle = {
    fontSize: "clamp(16px, 3.5vw, 19px)",
    fontWeight: 700,
    color: templateStyles.primaryColor,
    marginTop: 20,
    marginBottom: 10,
    paddingBottom: 4,
    borderBottom: templateStyles.sectionBorderStyle,
    ...(templateStyles.sectionUnderline && {
      borderBottom: templateStyles.sectionUnderline,
    }),
    ...(templateStyles.sectionGradient && {
      background: templateStyles.sectionGradient,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      paddingBottom: 8,
    }),
    ...(templateStyles.sectionBgGradient && {
      background: templateStyles.sectionBgGradient,
      padding: "12px 16px",
      borderRadius: "12px",
      marginBottom: 12,
      WebkitBackgroundClip: "unset",
      WebkitTextFillColor: "unset",
      backgroundClip: "unset",
    }),
  };

  const summaryStyle = {
    fontSize: 14,
    color: "#000",
    lineHeight: 1.35,
    marginBottom: 15,
  };

  const experienceItemStyle = {
    marginBottom: 15,
    paddingLeft: 0,
  };

  const itemHeaderStyle = {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 15,
    fontWeight: 700,
    marginBottom: 5,
  };

  const itemListStyle = {
    paddingLeft: 18,
    marginTop: 5,
  };

  const itemListItemStyle = {
    marginBottom: 5,
    fontSize: 13,
  };

  const skillsContainerStyle = {
    display: "flex",
    gridTemplateColumns: undefined,
    flexWrap: "wrap",
    gap: templateStyles.skillsLayout === "flex" ? "10px" : 8,
    marginTop: 8,
  };

  const skillBadgeStyle = {
    background: templateStyles.skillBadgeBg,
    color: templateStyles.skillBadgeColor,
    padding: templateStyles.skillPadding,
    borderRadius: templateStyles.skillBorderRadius,
    border: templateStyles.skillBorder || "none",
    fontSize: 13,
    fontWeight: 500,
    textAlign: "center",
    ...(templateStyles.skillShadow && {
      boxShadow: templateStyles.skillShadow,
    }),
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={nameStyle}>{data.name}</h1>
        <div style={titleStyle}>{data.title}</div>
        <div style={contactStyle}>
          <div>
            {data.email && <span>Email: {data.email}</span>}
            {data.phone && data.email && (
              <span style={contactSeparator}>|</span>
            )}
            {data.phone && <span>Phone: {data.phone}</span>}
            {data.website && (data.email || data.phone) && (
              <span style={contactSeparator}>|</span>
            )}
            {data.website && <span>Website: {data.website}</span>}
          </div>
        </div>
      </div>

      {data.summary?.trim() && (
        <div>
          <h3 style={sectionTitleStyle}>Professional Summary</h3>
          <p style={summaryStyle}>{data.summary}</p>
        </div>
      )}

      {data.experience?.some(
        (exp) => exp.role?.trim() || exp.years?.trim() || exp.bullets?.trim()
      ) && (
        <div>
          <h3 style={sectionTitleStyle}>Professional Experience</h3>
          {data.experience.map((exp, i) => (
            <div key={i} style={experienceItemStyle}>
              <div>
                <div style={itemHeaderStyle}>
                  <span>{exp.role}</span>
                  <span>{exp.years}</span>
                </div>
                {exp.bullets && (
                  <ul style={itemListStyle}>
                    {exp.bullets
                      .split("\n")
                      .filter((b) => b.trim())
                      .map((bullet, idx) => (
                        <li key={idx} style={itemListItemStyle}>
                          {bullet}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {data.skills?.some((skill) => skill?.trim()) && (
        <div>
          <h3 style={sectionTitleStyle}>Skills</h3>
          <div style={skillsContainerStyle}>
            {data.skills.map((skill, i) => (
              <div key={i}>
                <span style={skillBadgeStyle}>{skill}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.education?.some(
        (edu) => edu.degree?.trim() || edu.years?.trim() || edu.details?.trim()
      ) && (
        <div>
          <h3 style={sectionTitleStyle}>Education</h3>
          {data.education.map((edu, i) => (
            <div key={i} style={experienceItemStyle}>
              <div>
                <div style={itemHeaderStyle}>
                  <span>{edu.degree}</span>
                  <span>{edu.years}</span>
                </div>
                {edu.details && <p style={summaryStyle}>{edu.details}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      {data.certifications?.some((cert) => cert?.trim()) && (
        <div>
          <h3 style={sectionTitleStyle}>Certifications</h3>
          <ul style={itemListStyle}>
            {data.certifications.map((cert, i) => (
              <li key={i} style={itemListItemStyle}>
                {cert}
              </li>
            ))}
          </ul>
        </div>
      )}

      {data.customSections && data.customSections.length > 0 && (
        <>
          {data.customSections.map(
            (section, i) =>
              (section.header?.trim() || section.content?.trim()) && (
                <div key={i}>
                  <h3 style={sectionTitleStyle}>{section.header}</h3>
                  <ul style={itemListStyle}>
                    {section.content
                      .split("\n")
                      .filter((line) => line.trim())
                      .map((line, idx) => (
                        <li key={idx} style={itemListItemStyle}>
                          {line}
                        </li>
                      ))}
                  </ul>
                </div>
              )
          )}
        </>
      )}
    </div>
  );
}

const Landing = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const templatesRef = useRef(null);
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
        <section className="hero-section" aria-labelledby="hero-title">
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

      <main>
        {
          <section
            className="select-template-section"
            ref={templatesRef}
            style={{
              padding: "20px",
              background: "#f5f7fa",
            }}
          >
            <div className="container">
              <h3
                style={{
                  fontSize: "clamp(18px, 4vw, 22px)",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  marginBottom: 24,
                  textAlign: "center",
                }}
              >
                Select a Resume Template
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "clamp(16px, 3vw, 32px)",
                  margin: "32px 0",
                  maxWidth: 1600,
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                {dummyTemplates.map((t) => (
                  <div
                    key={t.id}
                    style={{
                      border: "2px solid var(--border-light)",
                      borderRadius: 12,
                      padding: 0,
                      background: "var(--bg-primary)",
                      cursor: "pointer",
                      boxShadow: "var(--shadow-md)",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      overflow: "hidden",
                    }}
                    onClick={() => {
                      navigate(`/edit-template?template=${t.id}`);
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow =
                        "0 8px 20px rgba(0,0,0,0.12)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 12px rgba(0,0,0,0.08)";
                    }}
                  >
                    <div
                      style={{
                        background:
                          "linear-gradient(135deg, #0b5fff 0%, #0a4ecc 100%)",
                        padding: "16px 20px",
                        borderBottom: "1px solid #e0e0e0",
                      }}
                    >
                      <h4
                        style={{
                          margin: 0,
                          color: "#fff",
                          fontSize: 18,
                          fontWeight: 600,
                        }}
                      >
                        {t.name}
                      </h4>
                    </div>
                    <div
                      style={{
                        padding: 20,
                        maxHeight: 400,
                        overflow: "hidden",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          transform: "scale(0.35)",
                          transformOrigin: "top left",
                          width: "285%",
                          height: "285%",
                        }}
                      >
                        <ResumeView
                          data={t.content}
                          editable={false}
                          isPreview={true}
                          templateId={t.id}
                        />
                      </div>
                      <div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: 60,
                          background: "linear-gradient(transparent, white)",
                        }}
                      ></div>
                    </div>
                    <div
                      style={{
                        padding: "12px 20px",
                        background: "var(--bg-tertiary)",
                        textAlign: "center",
                        borderTop: "1px solid var(--border-light)",
                      }}
                    >
                      <span
                        style={{
                          color: "var(--primary-500)",
                          fontWeight: 600,
                          fontSize: 14,
                        }}
                      >
                        Use This Template →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        }

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
