import React from "react";
import { getTemplateStyles } from "../config/templateConfigs";

export default function ResumeView({
  data,
  editable,
  onChange,
  forPrint,
  isPreview,
  templateId = 1,
}) {
  if (!data) return null;

  const templateStyles = getTemplateStyles(templateId);

  const containerStyle = {
    border: "none",
    borderRadius: 0,
    padding: editable
      ? "clamp(16px, 3vw, 30px)"
      : forPrint
      ? "40px"
      : "clamp(20px, 4vw, 40px)",
    background: "var(--bg-primary)",
    width: editable ? "100%" : "210mm",
    minHeight: "auto",
    margin: "0 auto",
    fontFamily: templateStyles.fontFamily,
    lineHeight: 1.35,
    boxShadow: editable ? "none" : forPrint ? "none" : "var(--shadow-md)",
    boxSizing: "border-box",
  };

  const headerStyle = {
    textAlign: templateStyles.headerAlign,
    marginBottom: 25,
  };

  const nameStyle = {
    fontSize: editable
      ? "clamp(24px, 5vw, 30px)"
      : forPrint
      ? "34px"
      : "clamp(28px, 5vw, 34px)",
    fontWeight: 800,
    color: templateStyles.nameColor,
    margin: 0,
  };

  const titleStyle = {
    fontSize: forPrint ? "16px" : "clamp(14px, 3vw, 16px)",
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
    fontSize: forPrint ? "19px" : "clamp(16px, 3.5vw, 19px)",
    fontWeight: 700,
    color: templateStyles.primaryColor,
    marginTop: 20,
    marginBottom: 10,
    paddingBottom: 4,
    borderBottom: templateStyles.sectionBorderStyle,
    pageBreakAfter: "avoid",
    breakAfter: "avoid",
    pageBreakInside: "avoid",
    breakInside: "avoid",
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
    pageBreakInside: "avoid",
    breakInside: "avoid",
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
    pageBreakInside: "avoid",
    breakInside: "avoid",
  };

  const itemListItemStyle = {
    marginBottom: 5,
    fontSize: 13,
  };

  const skillsContainerStyle = {
    display: "flex",
    gridTemplateColumns: undefined,
    flexWrap: "wrap",
    gap:
      templateStyles.skillsLayout === "flex"
        ? templateStyles.skillGap || "10px"
        : 8,
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

  const sectionContainerStyle = {
    pageBreakInside: "avoid",
    breakInside: "avoid",
  };

  const inputStyle = {
    padding: "8px 12px",
    fontSize: "clamp(13px, 2.5vw, 14px)",
    border: "1px solid var(--border-light)",
    borderRadius: 4,
    width: "100%",
    marginBottom: 8,
    fontFamily: "inherit",
  };

  const buttonStyle = {
    padding: "6px 12px",
    fontSize: "clamp(12px, 2.5vw, 13px)",
    background: "var(--primary-500)",
    color: "var(--text-inverse)",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
    marginTop: 8,
    marginRight: 8,
  };

  const removeButtonStyle = {
    ...buttonStyle,
    background: "var(--error)",
    padding: "4px 10px",
    fontSize: 12,
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        {editable ? (
          <input
            style={{
              fontSize: "clamp(24px, 5vw, 30px)",
              fontWeight: 800,
              textAlign: "center",
              color: "#000",
              margin: 0,
              padding: "8px 12px",
              border: "1px solid var(--border-light)",
              borderRadius: 4,
              width: "100%",
              fontFamily: "inherit",
              marginBottom: 8,
            }}
            value={data.name}
            onChange={(e) =>
              onChange && onChange({ ...data, name: e.target.value })
            }
            placeholder="Full Name"
          />
        ) : (
          <h1 style={nameStyle}>{data.name}</h1>
        )}

        {editable ? (
          <input
            style={{
              fontSize: "clamp(14px, 3vw, 16px)",
              fontWeight: 600,
              textAlign: "center",
              color: "#000",
              margin: 0,
              marginTop: 4,
              padding: "8px 12px",
              border: "1px solid var(--border-light)",
              borderRadius: 4,
              width: "100%",
              fontFamily: "inherit",
              marginBottom: 8,
            }}
            value={data.title}
            onChange={(e) =>
              onChange && onChange({ ...data, title: e.target.value })
            }
            placeholder="Job Title"
          />
        ) : (
          <div style={titleStyle}>{data.title}</div>
        )}

        <div style={contactStyle}>
          {editable ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              <input
                style={{
                  fontSize: "clamp(12px, 2.5vw, 13px)",
                  color: "#000",
                  padding: "6px 10px",
                  border: "1px solid var(--border-light)",
                  borderRadius: 4,
                  textAlign: "center",
                  flex: "1",
                  minWidth: "120px",
                  fontFamily: "inherit",
                }}
                value={data.email || ""}
                onChange={(e) =>
                  onChange && onChange({ ...data, email: e.target.value })
                }
                placeholder="Email"
              />
              <input
                style={{
                  fontSize: "clamp(12px, 2.5vw, 13px)",
                  color: "#000",
                  padding: "6px 10px",
                  border: "1px solid var(--border-light)",
                  borderRadius: 4,
                  textAlign: "center",
                  flex: "1",
                  minWidth: "120px",
                  fontFamily: "inherit",
                }}
                value={data.phone || ""}
                onChange={(e) =>
                  onChange && onChange({ ...data, phone: e.target.value })
                }
                placeholder="Phone"
              />
              <input
                style={{
                  fontSize: "clamp(12px, 2.5vw, 13px)",
                  color: "#000",
                  padding: "6px 10px",
                  border: "1px solid var(--border-light)",
                  borderRadius: 4,
                  textAlign: "center",
                  flex: "1",
                  minWidth: "120px",
                  fontFamily: "inherit",
                }}
                value={data.website || ""}
                onChange={(e) =>
                  onChange && onChange({ ...data, website: e.target.value })
                }
                placeholder="Website"
              />
            </div>
          ) : (
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
          )}
        </div>
      </div>

      {(editable || data.summary?.trim()) && (
        <div style={sectionContainerStyle}>
          <h3 style={sectionTitleStyle}>Professional Summary</h3>
          {editable ? (
            <textarea
              style={{ ...inputStyle, minHeight: 80, resize: "vertical" }}
              value={data.summary}
              onChange={(e) =>
                onChange && onChange({ ...data, summary: e.target.value })
              }
              placeholder="Professional summary"
            />
          ) : (
            <p style={summaryStyle}>{data.summary}</p>
          )}
        </div>
      )}

      {(editable ||
        data.experience?.some(
          (exp) => exp.role?.trim() || exp.years?.trim() || exp.bullets?.trim()
        )) && (
        <div style={sectionContainerStyle}>
          <h3 style={sectionTitleStyle}>Professional Experience</h3>
          {data.experience.map((exp, i) => (
            <div
              key={i}
              style={experienceItemStyle}
              className="experience-item"
            >
              {editable ? (
                <div>
                  <input
                    style={inputStyle}
                    value={exp.role}
                    onChange={(e) => {
                      const arr = [...data.experience];
                      arr[i].role = e.target.value;
                      onChange && onChange({ ...data, experience: arr });
                    }}
                    placeholder="Job Title – Company Name"
                  />
                  <input
                    style={inputStyle}
                    value={exp.years}
                    onChange={(e) => {
                      const arr = [...data.experience];
                      arr[i].years = e.target.value;
                      onChange && onChange({ ...data, experience: arr });
                    }}
                    placeholder="Years (e.g., 2020 - Present)"
                  />
                  <textarea
                    style={{ ...inputStyle, minHeight: 60, resize: "vertical" }}
                    value={exp.bullets || ""}
                    onChange={(e) => {
                      const arr = [...data.experience];
                      arr[i].bullets = e.target.value;
                      onChange && onChange({ ...data, experience: arr });
                    }}
                    placeholder="Bullet points (one per line)"
                  />
                  <button
                    style={removeButtonStyle}
                    onClick={() => {
                      const arr = data.experience.filter((_, idx) => idx !== i);
                      onChange && onChange({ ...data, experience: arr });
                    }}
                  >
                    Remove
                  </button>
                </div>
              ) : (
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
              )}
            </div>
          ))}
          {editable && (
            <button
              style={buttonStyle}
              onClick={() =>
                onChange &&
                onChange({
                  ...data,
                  experience: [
                    ...data.experience,
                    { role: "", years: "", bullets: "" },
                  ],
                })
              }
            >
              + Add Experience
            </button>
          )}
        </div>
      )}

      {(editable || data.skills?.some((skill) => skill?.trim())) && (
        <div style={sectionContainerStyle}>
          <h3 style={sectionTitleStyle}>Skills</h3>
          <div style={skillsContainerStyle}>
            {data.skills.map((skill, i) => (
              <div key={i}>
                {editable ? (
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 4 }}
                  >
                    <input
                      style={{ ...inputStyle, marginBottom: 0 }}
                      value={skill}
                      onChange={(e) => {
                        const arr = [...data.skills];
                        arr[i] = e.target.value;
                        onChange && onChange({ ...data, skills: arr });
                      }}
                      placeholder="Skill"
                    />
                    <button
                      style={{
                        ...removeButtonStyle,
                        marginTop: 0,
                        padding: "4px 8px",
                      }}
                      onClick={() => {
                        const arr = data.skills.filter((_, idx) => idx !== i);
                        onChange && onChange({ ...data, skills: arr });
                      }}
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <span style={skillBadgeStyle}>{skill}</span>
                )}
              </div>
            ))}
          </div>
          {editable && (
            <button
              style={buttonStyle}
              onClick={() =>
                onChange && onChange({ ...data, skills: [...data.skills, ""] })
              }
            >
              + Add Skill
            </button>
          )}
        </div>
      )}

      {(editable ||
        data.education?.some(
          (edu) =>
            edu.degree?.trim() || edu.years?.trim() || edu.details?.trim()
        )) && (
        <div style={sectionContainerStyle}>
          <h3 style={sectionTitleStyle}>Education</h3>
          {data.education.map((edu, i) => (
            <div key={i} style={experienceItemStyle} className="education-item">
              {editable ? (
                <div>
                  <input
                    style={inputStyle}
                    value={edu.degree}
                    onChange={(e) => {
                      const arr = [...data.education];
                      arr[i].degree = e.target.value;
                      onChange && onChange({ ...data, education: arr });
                    }}
                    placeholder="Degree – Field"
                  />
                  <input
                    style={inputStyle}
                    value={edu.years}
                    onChange={(e) => {
                      const arr = [...data.education];
                      arr[i].years = e.target.value;
                      onChange && onChange({ ...data, education: arr });
                    }}
                    placeholder="Years"
                  />
                  <input
                    style={inputStyle}
                    value={edu.details || ""}
                    onChange={(e) => {
                      const arr = [...data.education];
                      arr[i].details = e.target.value;
                      onChange && onChange({ ...data, education: arr });
                    }}
                    placeholder="University · GPA (optional)"
                  />
                  <button
                    style={removeButtonStyle}
                    onClick={() => {
                      const arr = data.education.filter((_, idx) => idx !== i);
                      onChange && onChange({ ...data, education: arr });
                    }}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div>
                  <div style={itemHeaderStyle}>
                    <span>{edu.degree}</span>
                    <span>{edu.years}</span>
                  </div>
                  {edu.details && <p style={summaryStyle}>{edu.details}</p>}
                </div>
              )}
            </div>
          ))}
          {editable && (
            <button
              style={buttonStyle}
              onClick={() =>
                onChange &&
                onChange({
                  ...data,
                  education: [
                    ...data.education,
                    { degree: "", years: "", details: "" },
                  ],
                })
              }
            >
              + Add Education
            </button>
          )}
        </div>
      )}

      {(editable || data.certifications?.some((cert) => cert?.trim())) && (
        <div style={sectionContainerStyle}>
          <h3 style={sectionTitleStyle}>Certifications</h3>
          <ul style={itemListStyle}>
            {data.certifications.map((cert, i) => (
              <li key={i} style={itemListItemStyle}>
                {editable ? (
                  <div
                    style={{ display: "flex", gap: 8, alignItems: "center" }}
                  >
                    <input
                      style={{ ...inputStyle, marginBottom: 0 }}
                      value={cert}
                      onChange={(e) => {
                        const arr = [...data.certifications];
                        arr[i] = e.target.value;
                        onChange && onChange({ ...data, certifications: arr });
                      }}
                      placeholder="Certification"
                    />
                    <button
                      style={removeButtonStyle}
                      onClick={() => {
                        const arr = data.certifications.filter(
                          (_, idx) => idx !== i
                        );
                        onChange && onChange({ ...data, certifications: arr });
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  cert
                )}
              </li>
            ))}
          </ul>
          {editable && (
            <button
              style={buttonStyle}
              onClick={() =>
                onChange &&
                onChange({
                  ...data,
                  certifications: [...(data.certifications || []), ""],
                })
              }
            >
              + Add Certification
            </button>
          )}
        </div>
      )}

      {data.customSections && data.customSections.length > 0 && (
        <>
          {data.customSections.map(
            (section, i) =>
              (editable ||
                section.header?.trim() ||
                section.content?.trim()) && (
                <div key={i} style={sectionContainerStyle}>
                  {editable ? (
                    <div>
                      <input
                        style={{
                          ...inputStyle,
                          fontSize: 19,
                          fontWeight: 700,
                          color: "#2b6cb0",
                          marginTop: 20,
                          marginBottom: 10,
                        }}
                        value={section.header}
                        onChange={(e) => {
                          const arr = [...data.customSections];
                          arr[i].header = e.target.value;
                          onChange &&
                            onChange({ ...data, customSections: arr });
                        }}
                        placeholder="Section Header"
                      />
                      <textarea
                        style={{
                          ...inputStyle,
                          minHeight: 80,
                          resize: "vertical",
                        }}
                        value={section.content}
                        onChange={(e) => {
                          const arr = [...data.customSections];
                          arr[i].content = e.target.value;
                          onChange &&
                            onChange({ ...data, customSections: arr });
                        }}
                        placeholder="Section Content"
                      />
                      <button
                        style={removeButtonStyle}
                        onClick={() => {
                          const arr = data.customSections.filter(
                            (_, idx) => idx !== i
                          );
                          onChange &&
                            onChange({ ...data, customSections: arr });
                        }}
                      >
                        Remove Section
                      </button>
                    </div>
                  ) : (
                    <>
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
                    </>
                  )}
                </div>
              )
          )}
        </>
      )}

      {editable && (
        <button
          style={{ ...buttonStyle, marginTop: 20 }}
          onClick={() =>
            onChange &&
            onChange({
              ...data,
              customSections: [
                ...(data.customSections || []),
                { header: "", content: "" },
              ],
            })
          }
        >
          + Add Custom Section
        </button>
      )}
    </div>
  );
}
