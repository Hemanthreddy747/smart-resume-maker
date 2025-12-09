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
    maxWidth: "100%",
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

  // Template 4: Side-border minimalist design
  if (templateStyles.layout === "side-border") {
    return (
      <div
        style={{
          ...containerStyle,
          borderLeft: `${templateStyles.leftBorderWidth || "6px"} solid ${
            templateStyles.leftBorderColor || templateStyles.primaryColor
          }`,
          paddingLeft: editable
            ? "clamp(20px, 3vw, 35px)"
            : forPrint
            ? "45px"
            : "clamp(24px, 4vw, 45px)",
        }}
      >
        <div style={{ ...headerStyle, marginBottom: 18 }}>
          {editable ? (
            <input
              style={{
                fontSize: "clamp(26px, 5vw, 32px)",
                fontWeight: 800,
                textAlign: "left",
                color: templateStyles.nameColor,
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
            <h1
              style={{
                ...nameStyle,
                fontSize: forPrint ? "32px" : "clamp(26px, 5vw, 32px)",
              }}
            >
              {data.name}
            </h1>
          )}

          {editable ? (
            <input
              style={{
                fontSize: "clamp(14px, 3vw, 15px)",
                fontWeight: 400,
                textAlign: "left",
                color: templateStyles.titleColor,
                margin: 0,
                padding: "8px 12px",
                border: "1px solid var(--border-light)",
                borderRadius: 4,
                width: "100%",
                fontFamily: "inherit",
              }}
              value={data.title}
              onChange={(e) =>
                onChange && onChange({ ...data, title: e.target.value })
              }
              placeholder="Job Title"
            />
          ) : (
            <div
              style={{
                ...titleStyle,
                fontSize: forPrint ? "15px" : "clamp(14px, 3vw, 15px)",
                fontWeight: 400,
              }}
            >
              {data.title}
            </div>
          )}

          <div
            style={{
              display: "flex",
              gap: 16,
              marginTop: 12,
              fontSize: 13,
              color: "#4b5563",
              flexWrap: "wrap",
            }}
          >
            {editable ? (
              <>
                {["email", "phone", "website"].map((field) => (
                  <input
                    key={field}
                    style={{
                      ...inputStyle,
                      marginBottom: 0,
                      flex: "1",
                      minWidth: "140px",
                      fontSize: 13,
                    }}
                    value={data[field] || ""}
                    onChange={(e) =>
                      onChange && onChange({ ...data, [field]: e.target.value })
                    }
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  />
                ))}
              </>
            ) : (
              <>
                {data.email && <span>{data.email}</span>}
                {data.phone && <span>{data.phone}</span>}
                {data.website && <span>{data.website}</span>}
              </>
            )}
          </div>
        </div>

        {(editable || data.summary?.trim()) && (
          <div style={sectionContainerStyle}>
            <h3
              style={{
                ...sectionTitleStyle,
                color: templateStyles.primaryColor,
                borderBottom: "none",
                fontSize: forPrint ? "16px" : "clamp(15px, 3vw, 16px)",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              {" "}
              Profile
            </h3>
            {editable ? (
              <textarea
                style={{ ...inputStyle, minHeight: 70, resize: "vertical" }}
                value={data.summary}
                onChange={(e) =>
                  onChange && onChange({ ...data, summary: e.target.value })
                }
                placeholder="Professional summary"
              />
            ) : (
              <p style={{ ...summaryStyle, fontSize: 13 }}>{data.summary}</p>
            )}
          </div>
        )}

        {(editable ||
          data.experience?.some(
            (exp) =>
              exp.role?.trim() || exp.years?.trim() || exp.bullets?.trim()
          )) && (
          <div style={sectionContainerStyle}>
            <h3
              style={{
                ...sectionTitleStyle,
                color: templateStyles.primaryColor,
                borderBottom: "none",
                fontSize: forPrint ? "16px" : "clamp(15px, 3vw, 16px)",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Experience
            </h3>
            {data.experience.map((exp, i) => (
              <div key={i} style={{ ...experienceItemStyle, marginBottom: 18 }}>
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
                      placeholder="Job Title – Company"
                    />
                    <input
                      style={inputStyle}
                      value={exp.years}
                      onChange={(e) => {
                        const arr = [...data.experience];
                        arr[i].years = e.target.value;
                        onChange && onChange({ ...data, experience: arr });
                      }}
                      placeholder="Years"
                    />
                    <textarea
                      style={{
                        ...inputStyle,
                        minHeight: 60,
                        resize: "vertical",
                      }}
                      value={exp.bullets || ""}
                      onChange={(e) => {
                        const arr = [...data.experience];
                        arr[i].bullets = e.target.value;
                        onChange && onChange({ ...data, experience: arr });
                      }}
                      placeholder="Bullet points"
                    />
                    <button
                      style={removeButtonStyle}
                      onClick={() => {
                        const arr = data.experience.filter(
                          (_, idx) => idx !== i
                        );
                        onChange && onChange({ ...data, experience: arr });
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div>
                    <div
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: "#111827",
                        marginBottom: 2,
                      }}
                    >
                      {exp.role}
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: "#6b7280",
                        marginBottom: 6,
                      }}
                    >
                      {exp.years}
                    </div>
                    {exp.bullets && (
                      <ul style={{ ...itemListStyle, paddingLeft: 20 }}>
                        {exp.bullets
                          .split("\n")
                          .filter((b) => b.trim())
                          .map((bullet, idx) => (
                            <li
                              key={idx}
                              style={{ ...itemListItemStyle, fontSize: 13 }}
                            >
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

        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 48%", minWidth: "250px" }}>
            {(editable || data.skills?.some((skill) => skill?.trim())) && (
              <div style={sectionContainerStyle}>
                <h3
                  style={{
                    ...sectionTitleStyle,
                    color: templateStyles.primaryColor,
                    borderBottom: "none",
                    fontSize: forPrint ? "16px" : "clamp(15px, 3vw, 16px)",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    marginBottom: 10,
                  }}
                >
                  Skills
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {data.skills.map((skill, i) => (
                    <div key={i}>
                      {editable ? (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                          }}
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
                              const arr = data.skills.filter(
                                (_, idx) => idx !== i
                              );
                              onChange && onChange({ ...data, skills: arr });
                            }}
                          >
                            ×
                          </button>
                        </div>
                      ) : (
                        <span style={{ ...skillBadgeStyle, fontSize: 12 }}>
                          {skill}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                {editable && (
                  <button
                    style={buttonStyle}
                    onClick={() =>
                      onChange &&
                      onChange({ ...data, skills: [...data.skills, ""] })
                    }
                  >
                    + Add Skill
                  </button>
                )}
              </div>
            )}
          </div>

          <div style={{ flex: "1 1 48%", minWidth: "250px" }}>
            {(editable ||
              data.education?.some(
                (edu) => edu.degree?.trim() || edu.years?.trim()
              )) && (
              <div style={sectionContainerStyle}>
                <h3
                  style={{
                    ...sectionTitleStyle,
                    color: templateStyles.primaryColor,
                    borderBottom: "none",
                    fontSize: forPrint ? "16px" : "clamp(15px, 3vw, 16px)",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    marginBottom: 10,
                  }}
                >
                  Education
                </h3>
                {data.education.map((edu, i) => (
                  <div key={i} style={{ marginBottom: 14 }}>
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
                          placeholder="Degree"
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
                          placeholder="University"
                        />
                        <button
                          style={removeButtonStyle}
                          onClick={() => {
                            const arr = data.education.filter(
                              (_, idx) => idx !== i
                            );
                            onChange && onChange({ ...data, education: arr });
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div
                          style={{
                            fontSize: 14,
                            fontWeight: 600,
                            color: "#111827",
                          }}
                        >
                          {edu.degree}
                        </div>
                        <div style={{ fontSize: 13, color: "#6b7280" }}>
                          {edu.years}
                        </div>
                        {edu.details && (
                          <div
                            style={{
                              fontSize: 12,
                              color: "#9ca3af",
                              marginTop: 2,
                            }}
                          >
                            {edu.details}
                          </div>
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
          </div>
        </div>

        {(editable || data.certifications?.some((cert) => cert?.trim())) && (
          <div style={sectionContainerStyle}>
            <h3
              style={{
                ...sectionTitleStyle,
                color: templateStyles.primaryColor,
                borderBottom: "none",
                fontSize: forPrint ? "16px" : "clamp(15px, 3vw, 16px)",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Certifications
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: 8,
              }}
            >
              {data.certifications.map((cert, i) => (
                <div key={i} style={{ fontSize: 13 }}>
                  {editable ? (
                    <div
                      style={{ display: "flex", gap: 6, alignItems: "center" }}
                    >
                      <input
                        style={{ ...inputStyle, marginBottom: 0 }}
                        value={cert}
                        onChange={(e) => {
                          const arr = [...data.certifications];
                          arr[i] = e.target.value;
                          onChange &&
                            onChange({ ...data, certifications: arr });
                        }}
                        placeholder="Certification"
                      />
                      <button
                        style={{
                          ...removeButtonStyle,
                          marginTop: 0,
                          padding: "4px 8px",
                        }}
                        onClick={() => {
                          const arr = data.certifications.filter(
                            (_, idx) => idx !== i
                          );
                          onChange &&
                            onChange({ ...data, certifications: arr });
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <span>• {cert}</span>
                  )}
                </div>
              ))}
            </div>
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
      </div>
    );
  }

  // Template 6: Professional Column design
  if (templateStyles.layout === "professional-column") {
    return (
      <div style={containerStyle}>
        <div style={{ display: "flex", gap: 0, minHeight: "800px" }}>
          <div
            style={{
              flex: `0 0 ${templateStyles.leftColumnWidth || "30%"}`,
              background: templateStyles.leftColumnBg || "#f8fafc",
              padding: editable
                ? "clamp(16px, 3vw, 24px)"
                : forPrint
                ? "24px"
                : "clamp(18px, 3vw, 24px)",
              borderRight: `2px solid ${
                templateStyles.dividerColor || "#cbd5e1"
              }`,
            }}
          >
            <div style={{ marginBottom: 22 }}>
              {editable ? (
                <>
                  <input
                    style={{
                      fontSize: "clamp(11px, 2.5vw, 12px)",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      fontWeight: 700,
                      color: templateStyles.primaryColor,
                      margin: 0,
                      marginBottom: 8,
                      padding: "6px 10px",
                      border: "1px solid var(--border-light)",
                      borderRadius: 4,
                      width: "100%",
                      fontFamily: "inherit",
                    }}
                    value="CONTACT"
                    readOnly
                  />
                  <input
                    style={{ ...inputStyle, marginBottom: 6, fontSize: 12 }}
                    value={data.email || ""}
                    onChange={(e) =>
                      onChange && onChange({ ...data, email: e.target.value })
                    }
                    placeholder="Email"
                  />
                  <input
                    style={{ ...inputStyle, marginBottom: 6, fontSize: 12 }}
                    value={data.phone || ""}
                    onChange={(e) =>
                      onChange && onChange({ ...data, phone: e.target.value })
                    }
                    placeholder="Phone"
                  />
                  <input
                    style={{ ...inputStyle, marginBottom: 0, fontSize: 12 }}
                    value={data.website || ""}
                    onChange={(e) =>
                      onChange && onChange({ ...data, website: e.target.value })
                    }
                    placeholder="Website"
                  />
                </>
              ) : (
                <>
                  <h4
                    style={{
                      fontSize: 12,
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      fontWeight: 700,
                      color: templateStyles.primaryColor,
                      margin: 0,
                      marginBottom: 10,
                      paddingBottom: 6,
                      borderBottom: `2px solid ${templateStyles.primaryColor}`,
                    }}
                  >
                    Contact
                  </h4>
                  <div
                    style={{ fontSize: 11, color: "#475569", lineHeight: 1.6 }}
                  >
                    {data.email && (
                      <div style={{ marginBottom: 6, wordBreak: "break-word" }}>
                        {data.email}
                      </div>
                    )}
                    {data.phone && (
                      <div style={{ marginBottom: 6 }}>{data.phone}</div>
                    )}
                    {data.website && (
                      <div style={{ wordBreak: "break-word" }}>
                        {data.website}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {(editable || data.skills?.some((skill) => skill?.trim())) && (
              <div style={{ marginBottom: 22 }}>
                {editable ? (
                  <input
                    style={{
                      fontSize: "clamp(11px, 2.5vw, 12px)",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      fontWeight: 700,
                      color: templateStyles.primaryColor,
                      margin: 0,
                      marginBottom: 8,
                      padding: "6px 10px",
                      border: "1px solid var(--border-light)",
                      borderRadius: 4,
                      width: "100%",
                      fontFamily: "inherit",
                    }}
                    value="SKILLS"
                    readOnly
                  />
                ) : (
                  <h4
                    style={{
                      fontSize: 12,
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      fontWeight: 700,
                      color: templateStyles.primaryColor,
                      margin: 0,
                      marginBottom: 10,
                      paddingBottom: 6,
                      borderBottom: `2px solid ${templateStyles.primaryColor}`,
                    }}
                  >
                    Skills
                  </h4>
                )}
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 6 }}
                >
                  {data.skills.map((skill, i) => (
                    <div key={i}>
                      {editable ? (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <input
                            style={{
                              ...inputStyle,
                              marginBottom: 0,
                              fontSize: 12,
                            }}
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
                              padding: "3px 7px",
                              fontSize: 11,
                            }}
                            onClick={() => {
                              const arr = data.skills.filter(
                                (_, idx) => idx !== i
                              );
                              onChange && onChange({ ...data, skills: arr });
                            }}
                          >
                            ×
                          </button>
                        </div>
                      ) : (
                        <div
                          style={{
                            fontSize: 11,
                            color: "#334155",
                            padding: "5px 0",
                            borderBottom: "1px solid #e2e8f0",
                          }}
                        >
                          • {skill}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {editable && (
                  <button
                    style={{
                      ...buttonStyle,
                      fontSize: 11,
                      padding: "5px 10px",
                      marginTop: 8,
                    }}
                    onClick={() =>
                      onChange &&
                      onChange({ ...data, skills: [...data.skills, ""] })
                    }
                  >
                    + Add
                  </button>
                )}
              </div>
            )}

            {(editable ||
              data.education?.some((edu) => edu.degree?.trim())) && (
              <div style={{ marginBottom: 22 }}>
                {editable ? (
                  <input
                    style={{
                      fontSize: "clamp(11px, 2.5vw, 12px)",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      fontWeight: 700,
                      color: templateStyles.primaryColor,
                      margin: 0,
                      marginBottom: 8,
                      padding: "6px 10px",
                      border: "1px solid var(--border-light)",
                      borderRadius: 4,
                      width: "100%",
                      fontFamily: "inherit",
                    }}
                    value="EDUCATION"
                    readOnly
                  />
                ) : (
                  <h4
                    style={{
                      fontSize: 12,
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      fontWeight: 700,
                      color: templateStyles.primaryColor,
                      margin: 0,
                      marginBottom: 10,
                      paddingBottom: 6,
                      borderBottom: `2px solid ${templateStyles.primaryColor}`,
                    }}
                  >
                    Education
                  </h4>
                )}
                {data.education.map((edu, i) => (
                  <div key={i} style={{ marginBottom: 12 }}>
                    {editable ? (
                      <div>
                        <input
                          style={{ ...inputStyle, fontSize: 12 }}
                          value={edu.degree}
                          onChange={(e) => {
                            const arr = [...data.education];
                            arr[i].degree = e.target.value;
                            onChange && onChange({ ...data, education: arr });
                          }}
                          placeholder="Degree"
                        />
                        <input
                          style={{ ...inputStyle, fontSize: 12 }}
                          value={edu.years}
                          onChange={(e) => {
                            const arr = [...data.education];
                            arr[i].years = e.target.value;
                            onChange && onChange({ ...data, education: arr });
                          }}
                          placeholder="Years"
                        />
                        <input
                          style={{ ...inputStyle, fontSize: 12 }}
                          value={edu.details || ""}
                          onChange={(e) => {
                            const arr = [...data.education];
                            arr[i].details = e.target.value;
                            onChange && onChange({ ...data, education: arr });
                          }}
                          placeholder="University"
                        />
                        <button
                          style={{
                            ...removeButtonStyle,
                            fontSize: 11,
                            padding: "4px 8px",
                          }}
                          onClick={() => {
                            const arr = data.education.filter(
                              (_, idx) => idx !== i
                            );
                            onChange && onChange({ ...data, education: arr });
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: "#0f172a",
                            marginBottom: 3,
                            lineHeight: 1.3,
                          }}
                        >
                          {edu.degree}
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            color: templateStyles.accentColor,
                            fontWeight: 500,
                            marginBottom: 2,
                          }}
                        >
                          {edu.years}
                        </div>
                        {edu.details && (
                          <div
                            style={{
                              fontSize: 10,
                              color: "#64748b",
                              lineHeight: 1.4,
                            }}
                          >
                            {edu.details}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                {editable && (
                  <button
                    style={{
                      ...buttonStyle,
                      fontSize: 11,
                      padding: "5px 10px",
                    }}
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
                    + Add
                  </button>
                )}
              </div>
            )}

            {(editable ||
              data.certifications?.some((cert) => cert?.trim())) && (
              <div>
                {editable ? (
                  <input
                    style={{
                      fontSize: "clamp(11px, 2.5vw, 12px)",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      fontWeight: 700,
                      color: templateStyles.primaryColor,
                      margin: 0,
                      marginBottom: 8,
                      padding: "6px 10px",
                      border: "1px solid var(--border-light)",
                      borderRadius: 4,
                      width: "100%",
                      fontFamily: "inherit",
                    }}
                    value="CERTIFICATIONS"
                    readOnly
                  />
                ) : (
                  <h4
                    style={{
                      fontSize: 12,
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      fontWeight: 700,
                      color: templateStyles.primaryColor,
                      margin: 0,
                      marginBottom: 10,
                      paddingBottom: 6,
                      borderBottom: `2px solid ${templateStyles.primaryColor}`,
                    }}
                  >
                    Certifications
                  </h4>
                )}
                {data.certifications.map((cert, i) => (
                  <div key={i} style={{ marginBottom: 8 }}>
                    {editable ? (
                      <div
                        style={{
                          display: "flex",
                          gap: 4,
                          alignItems: "center",
                        }}
                      >
                        <input
                          style={{
                            ...inputStyle,
                            marginBottom: 0,
                            fontSize: 12,
                          }}
                          value={cert}
                          onChange={(e) => {
                            const arr = [...data.certifications];
                            arr[i] = e.target.value;
                            onChange &&
                              onChange({ ...data, certifications: arr });
                          }}
                          placeholder="Certification"
                        />
                        <button
                          style={{
                            ...removeButtonStyle,
                            marginTop: 0,
                            padding: "3px 7px",
                            fontSize: 11,
                          }}
                          onClick={() => {
                            const arr = data.certifications.filter(
                              (_, idx) => idx !== i
                            );
                            onChange &&
                              onChange({ ...data, certifications: arr });
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <div
                        style={{
                          fontSize: 11,
                          color: "#334155",
                          lineHeight: 1.5,
                        }}
                      >
                        • {cert}
                      </div>
                    )}
                  </div>
                ))}
                {editable && (
                  <button
                    style={{
                      ...buttonStyle,
                      fontSize: 11,
                      padding: "5px 10px",
                      marginTop: 8,
                    }}
                    onClick={() =>
                      onChange &&
                      onChange({
                        ...data,
                        certifications: [...(data.certifications || []), ""],
                      })
                    }
                  >
                    + Add
                  </button>
                )}
              </div>
            )}
          </div>

          <div
            style={{
              flex: 1,
              padding: editable
                ? "clamp(16px, 3vw, 24px)"
                : forPrint
                ? "24px"
                : "clamp(18px, 3vw, 24px)",
            }}
          >
            <div style={{ marginBottom: 20 }}>
              {editable ? (
                <>
                  <input
                    style={{
                      fontSize: "clamp(26px, 5vw, 32px)",
                      fontWeight: 700,
                      textAlign: "left",
                      color: templateStyles.nameColor,
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
                  <input
                    style={{
                      fontSize: "clamp(14px, 3vw, 16px)",
                      fontWeight: 400,
                      textAlign: "left",
                      color: templateStyles.titleColor,
                      margin: 0,
                      padding: "8px 12px",
                      border: "1px solid var(--border-light)",
                      borderRadius: 4,
                      width: "100%",
                      fontFamily: "inherit",
                    }}
                    value={data.title}
                    onChange={(e) =>
                      onChange && onChange({ ...data, title: e.target.value })
                    }
                    placeholder="Job Title"
                  />
                </>
              ) : (
                <>
                  <h1
                    style={{
                      ...nameStyle,
                      fontSize: forPrint ? "32px" : "clamp(26px, 5vw, 32px)",
                      fontWeight: 700,
                      marginBottom: 4,
                    }}
                  >
                    {data.name}
                  </h1>
                  <div
                    style={{
                      ...titleStyle,
                      fontSize: forPrint ? "16px" : "clamp(14px, 3vw, 16px)",
                      fontWeight: 400,
                      marginBottom: 0,
                    }}
                  >
                    {data.title}
                  </div>
                </>
              )}
            </div>

            {(editable || data.summary?.trim()) && (
              <div style={{ ...sectionContainerStyle, marginBottom: 22 }}>
                <h3
                  style={{
                    fontSize: forPrint ? "14px" : "clamp(13px, 3vw, 14px)",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    fontWeight: 700,
                    color: "#ffffff",
                    background:
                      templateStyles.sectionTitleBg ||
                      templateStyles.primaryColor,
                    padding: "6px 12px",
                    margin: 0,
                    marginBottom: 10,
                  }}
                >
                  Professional Summary
                </h3>
                {editable ? (
                  <textarea
                    style={{
                      ...inputStyle,
                      minHeight: 70,
                      resize: "vertical",
                      fontSize: 13,
                    }}
                    value={data.summary}
                    onChange={(e) =>
                      onChange && onChange({ ...data, summary: e.target.value })
                    }
                    placeholder="Professional summary"
                  />
                ) : (
                  <p
                    style={{
                      ...summaryStyle,
                      fontSize: 13,
                      lineHeight: 1.6,
                      color: "#334155",
                      margin: 0,
                    }}
                  >
                    {data.summary}
                  </p>
                )}
              </div>
            )}

            {(editable || data.experience?.some((exp) => exp.role?.trim())) && (
              <div style={sectionContainerStyle}>
                <h3
                  style={{
                    fontSize: forPrint ? "14px" : "clamp(13px, 3vw, 14px)",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    fontWeight: 700,
                    color: "#ffffff",
                    background:
                      templateStyles.sectionTitleBg ||
                      templateStyles.primaryColor,
                    padding: "6px 12px",
                    margin: 0,
                    marginBottom: 12,
                  }}
                >
                  Professional Experience
                </h3>
                {data.experience.map((exp, i) => (
                  <div key={i} style={{ marginBottom: 18 }}>
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
                          placeholder="Job Title – Company"
                        />
                        <input
                          style={inputStyle}
                          value={exp.years}
                          onChange={(e) => {
                            const arr = [...data.experience];
                            arr[i].years = e.target.value;
                            onChange && onChange({ ...data, experience: arr });
                          }}
                          placeholder="Years"
                        />
                        <textarea
                          style={{
                            ...inputStyle,
                            minHeight: 60,
                            resize: "vertical",
                          }}
                          value={exp.bullets || ""}
                          onChange={(e) => {
                            const arr = [...data.experience];
                            arr[i].bullets = e.target.value;
                            onChange && onChange({ ...data, experience: arr });
                          }}
                          placeholder="Bullet points"
                        />
                        <button
                          style={removeButtonStyle}
                          onClick={() => {
                            const arr = data.experience.filter(
                              (_, idx) => idx !== i
                            );
                            onChange && onChange({ ...data, experience: arr });
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "baseline",
                            marginBottom: 6,
                            gap: 8,
                          }}
                        >
                          <span
                            style={{
                              fontSize: 14,
                              fontWeight: 700,
                              color: "#0f172a",
                            }}
                          >
                            {exp.role}
                          </span>
                          <span
                            style={{
                              fontSize: 12,
                              color: templateStyles.accentColor,
                              fontWeight: 600,
                              whiteSpace: "nowrap",
                            }}
                          >
                            {exp.years}
                          </span>
                        </div>
                        {exp.bullets && (
                          <ul
                            style={{
                              ...itemListStyle,
                              paddingLeft: 18,
                              marginTop: 4,
                              marginBottom: 0,
                            }}
                          >
                            {exp.bullets
                              .split("\n")
                              .filter((b) => b.trim())
                              .map((bullet, idx) => (
                                <li
                                  key={idx}
                                  style={{
                                    ...itemListItemStyle,
                                    fontSize: 12,
                                    color: "#475569",
                                    marginBottom: 4,
                                    lineHeight: 1.5,
                                  }}
                                >
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
          </div>
        </div>
      </div>
    );
  }

  // Template 5: Timeline design with modern cards
  if (templateStyles.layout === "timeline") {
    return (
      <div style={containerStyle}>
        <div
          style={{
            borderBottom: `3px solid ${templateStyles.accentColor}`,
            paddingBottom: 20,
            marginBottom: 24,
          }}
        >
          {editable ? (
            <>
              <input
                style={{
                  fontSize: "clamp(28px, 5vw, 34px)",
                  fontWeight: 700,
                  textAlign: "left",
                  color: templateStyles.nameColor,
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
              <input
                style={{
                  fontSize: "clamp(16px, 3vw, 18px)",
                  fontWeight: 500,
                  textAlign: "left",
                  color: templateStyles.titleColor,
                  margin: 0,
                  padding: "8px 12px",
                  border: "1px solid var(--border-light)",
                  borderRadius: 4,
                  width: "100%",
                  fontFamily: "inherit",
                  marginBottom: 10,
                }}
                value={data.title}
                onChange={(e) =>
                  onChange && onChange({ ...data, title: e.target.value })
                }
                placeholder="Job Title"
              />
            </>
          ) : (
            <>
              <h1
                style={{
                  ...nameStyle,
                  fontSize: forPrint ? "34px" : "clamp(28px, 5vw, 34px)",
                  fontWeight: 700,
                  marginBottom: 4,
                }}
              >
                {data.name}
              </h1>
              <div
                style={{
                  ...titleStyle,
                  fontSize: forPrint ? "18px" : "clamp(16px, 3vw, 18px)",
                  fontWeight: 500,
                  marginBottom: 12,
                }}
              >
                {data.title}
              </div>
            </>
          )}

          <div
            style={{
              display: "flex",
              gap: 20,
              fontSize: 13,
              color: "#475569",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {editable ? (
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  flexWrap: "wrap",
                  width: "100%",
                }}
              >
                {["email", "phone", "website"].map((field) => (
                  <input
                    key={field}
                    style={{
                      ...inputStyle,
                      marginBottom: 0,
                      flex: "1",
                      minWidth: "160px",
                      fontSize: 13,
                    }}
                    value={data[field] || ""}
                    onChange={(e) =>
                      onChange && onChange({ ...data, [field]: e.target.value })
                    }
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  />
                ))}
              </div>
            ) : (
              <>
                {data.email && (
                  <span
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <span
                      style={{
                        width: 4,
                        height: 4,
                        background: templateStyles.accentColor,
                        borderRadius: "50%",
                      }}
                    ></span>
                    {data.email}
                  </span>
                )}
                {data.phone && (
                  <span
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <span
                      style={{
                        width: 4,
                        height: 4,
                        background: templateStyles.accentColor,
                        borderRadius: "50%",
                      }}
                    ></span>
                    {data.phone}
                  </span>
                )}
                {data.website && (
                  <span
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <span
                      style={{
                        width: 4,
                        height: 4,
                        background: templateStyles.accentColor,
                        borderRadius: "50%",
                      }}
                    ></span>
                    {data.website}
                  </span>
                )}
              </>
            )}
          </div>
        </div>

        {(editable || data.summary?.trim()) && (
          <div style={{ ...sectionContainerStyle, marginBottom: 24 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background:
                    templateStyles.sectionIconBg || templateStyles.accentColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  fontSize: 18,
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                P
              </div>
              <h3
                style={{
                  margin: 0,
                  fontSize: forPrint ? "18px" : "clamp(16px, 3vw, 18px)",
                  fontWeight: 700,
                  color: templateStyles.primaryColor,
                }}
              >
                Profile
              </h3>
            </div>
            {editable ? (
              <textarea
                style={{
                  ...inputStyle,
                  minHeight: 70,
                  resize: "vertical",
                  marginLeft: 48,
                }}
                value={data.summary}
                onChange={(e) =>
                  onChange && onChange({ ...data, summary: e.target.value })
                }
                placeholder="Professional summary"
              />
            ) : (
              <p
                style={{
                  ...summaryStyle,
                  fontSize: 14,
                  lineHeight: 1.7,
                  marginLeft: 48,
                  color: "#334155",
                }}
              >
                {data.summary}
              </p>
            )}
          </div>
        )}

        {(editable || data.experience?.some((exp) => exp.role?.trim())) && (
          <div style={{ ...sectionContainerStyle, marginBottom: 24 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background:
                    templateStyles.sectionIconBg || templateStyles.accentColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  fontSize: 18,
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                E
              </div>
              <h3
                style={{
                  margin: 0,
                  fontSize: forPrint ? "18px" : "clamp(16px, 3vw, 18px)",
                  fontWeight: 700,
                  color: templateStyles.primaryColor,
                }}
              >
                Experience
              </h3>
            </div>
            <div
              style={{
                marginLeft: 18,
                borderLeft: editable
                  ? "none"
                  : `3px solid ${templateStyles.timelineColor}`,
                paddingLeft: editable ? 0 : 30,
                position: "relative",
              }}
            >
              {data.experience.map((exp, i) => (
                <div key={i} style={{ position: "relative", marginBottom: 20 }}>
                  {!editable && (
                    <div
                      style={{
                        position: "absolute",
                        left: "-36px",
                        top: 8,
                        width: templateStyles.timelineDotSize || "14px",
                        height: templateStyles.timelineDotSize || "14px",
                        borderRadius: "50%",
                        background: "#ffffff",
                        border: `3px solid ${templateStyles.timelineColor}`,
                        boxShadow: "0 0 0 3px #ffffff",
                      }}
                    ></div>
                  )}
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
                        placeholder="Job Title – Company"
                      />
                      <input
                        style={inputStyle}
                        value={exp.years}
                        onChange={(e) => {
                          const arr = [...data.experience];
                          arr[i].years = e.target.value;
                          onChange && onChange({ ...data, experience: arr });
                        }}
                        placeholder="Years"
                      />
                      <textarea
                        style={{
                          ...inputStyle,
                          minHeight: 60,
                          resize: "vertical",
                        }}
                        value={exp.bullets || ""}
                        onChange={(e) => {
                          const arr = [...data.experience];
                          arr[i].bullets = e.target.value;
                          onChange && onChange({ ...data, experience: arr });
                        }}
                        placeholder="Bullet points"
                      />
                      <button
                        style={removeButtonStyle}
                        onClick={() => {
                          const arr = data.experience.filter(
                            (_, idx) => idx !== i
                          );
                          onChange && onChange({ ...data, experience: arr });
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div
                      style={{
                        background: templateStyles.cardBg || "#ffffff",
                        padding: "16px 18px",
                        borderRadius: 10,
                        border:
                          templateStyles.cardBorder || "1px solid #e0f2fe",
                        boxShadow:
                          templateStyles.cardShadow ||
                          "0 2px 8px rgba(6, 182, 212, 0.1)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "baseline",
                          marginBottom: 8,
                          flexWrap: "wrap",
                          gap: 8,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 15,
                            fontWeight: 700,
                            color: "#0f172a",
                          }}
                        >
                          {exp.role}
                        </span>
                        <span
                          style={{
                            fontSize: 13,
                            color: templateStyles.accentColor,
                            fontWeight: 600,
                            background: templateStyles.accentBg,
                            padding: "3px 10px",
                            borderRadius: 12,
                          }}
                        >
                          {exp.years}
                        </span>
                      </div>
                      {exp.bullets && (
                        <ul
                          style={{
                            ...itemListStyle,
                            paddingLeft: 18,
                            marginTop: 8,
                            marginBottom: 0,
                          }}
                        >
                          {exp.bullets
                            .split("\n")
                            .filter((b) => b.trim())
                            .map((bullet, idx) => (
                              <li
                                key={idx}
                                style={{
                                  ...itemListItemStyle,
                                  fontSize: 13,
                                  color: "#475569",
                                  marginBottom: 5,
                                }}
                              >
                                {bullet}
                              </li>
                            ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {editable && (
              <button
                style={{ ...buttonStyle, marginLeft: 18 }}
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

        <div
          style={{
            display: "grid",
            gridTemplateColumns: editable
              ? "1fr"
              : forPrint
              ? "1fr 1fr"
              : "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
            marginBottom: 24,
          }}
        >
          {(editable || data.skills?.some((skill) => skill?.trim())) && (
            <div style={sectionContainerStyle}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background:
                      templateStyles.sectionIconBg ||
                      templateStyles.accentColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ffffff",
                    fontSize: 18,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  S
                </div>
                <h3
                  style={{
                    margin: 0,
                    fontSize: forPrint ? "18px" : "clamp(16px, 3vw, 18px)",
                    fontWeight: 700,
                    color: templateStyles.primaryColor,
                  }}
                >
                  Skills
                </h3>
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 10,
                  marginLeft: 48,
                }}
              >
                {data.skills.map((skill, i) => (
                  <div key={i}>
                    {editable ? (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
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
                            const arr = data.skills.filter(
                              (_, idx) => idx !== i
                            );
                            onChange && onChange({ ...data, skills: arr });
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <span
                        style={{
                          ...skillBadgeStyle,
                          fontSize: 12,
                          fontWeight: 600,
                          boxShadow: "0 2px 4px rgba(6, 182, 212, 0.15)",
                        }}
                      >
                        {skill}
                      </span>
                    )}
                  </div>
                ))}
              </div>
              {editable && (
                <button
                  style={{ ...buttonStyle, marginLeft: 48 }}
                  onClick={() =>
                    onChange &&
                    onChange({ ...data, skills: [...data.skills, ""] })
                  }
                >
                  + Add Skill
                </button>
              )}
            </div>
          )}

          {(editable || data.education?.some((edu) => edu.degree?.trim())) && (
            <div style={sectionContainerStyle}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background:
                      templateStyles.sectionIconBg ||
                      templateStyles.accentColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ffffff",
                    fontSize: 18,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  A
                </div>
                <h3
                  style={{
                    margin: 0,
                    fontSize: forPrint ? "18px" : "clamp(16px, 3vw, 18px)",
                    fontWeight: 700,
                    color: templateStyles.primaryColor,
                  }}
                >
                  Education
                </h3>
              </div>
              <div style={{ marginLeft: 48 }}>
                {data.education.map((edu, i) => (
                  <div
                    key={i}
                    style={{
                      marginBottom: 14,
                      padding: editable ? 0 : "12px 0",
                    }}
                  >
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
                          placeholder="Degree"
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
                          placeholder="University"
                        />
                        <button
                          style={removeButtonStyle}
                          onClick={() => {
                            const arr = data.education.filter(
                              (_, idx) => idx !== i
                            );
                            onChange && onChange({ ...data, education: arr });
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div
                          style={{
                            fontSize: 14,
                            fontWeight: 600,
                            color: "#0f172a",
                            marginBottom: 3,
                          }}
                        >
                          {edu.degree}
                        </div>
                        <div
                          style={{
                            fontSize: 13,
                            color: templateStyles.accentColor,
                            fontWeight: 500,
                          }}
                        >
                          {edu.years}
                        </div>
                        {edu.details && (
                          <div
                            style={{
                              fontSize: 12,
                              color: "#64748b",
                              marginTop: 3,
                            }}
                          >
                            {edu.details}
                          </div>
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
            </div>
          )}
        </div>

        {(editable || data.certifications?.some((cert) => cert?.trim())) && (
          <div style={sectionContainerStyle}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background:
                    templateStyles.sectionIconBg || templateStyles.accentColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  fontSize: 18,
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                C
              </div>
              <h3
                style={{
                  margin: 0,
                  fontSize: forPrint ? "18px" : "clamp(16px, 3vw, 18px)",
                  fontWeight: 700,
                  color: templateStyles.primaryColor,
                }}
              >
                Certifications
              </h3>
            </div>
            <div
              style={{
                marginLeft: 48,
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                gap: 10,
              }}
            >
              {data.certifications.map((cert, i) => (
                <div key={i}>
                  {editable ? (
                    <div
                      style={{ display: "flex", gap: 6, alignItems: "center" }}
                    >
                      <input
                        style={{ ...inputStyle, marginBottom: 0 }}
                        value={cert}
                        onChange={(e) => {
                          const arr = [...data.certifications];
                          arr[i] = e.target.value;
                          onChange &&
                            onChange({ ...data, certifications: arr });
                        }}
                        placeholder="Certification"
                      />
                      <button
                        style={{
                          ...removeButtonStyle,
                          marginTop: 0,
                          padding: "4px 8px",
                        }}
                        onClick={() => {
                          const arr = data.certifications.filter(
                            (_, idx) => idx !== i
                          );
                          onChange &&
                            onChange({ ...data, certifications: arr });
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div
                      style={{
                        fontSize: 13,
                        padding: "10px 14px",
                        background: "#f0f9ff",
                        borderRadius: 8,
                        borderLeft: `3px solid ${templateStyles.accentColor}`,
                        color: "#0c4a6e",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <span
                        style={{
                          color: templateStyles.accentColor,
                          fontSize: 16,
                          fontWeight: 700,
                        }}
                      >
                        ✓
                      </span>
                      <span>{cert}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {editable && (
              <button
                style={{ ...buttonStyle, marginLeft: 48 }}
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
      </div>
    );
  }

  // Template 5: Split-page design with color blocks
  if (templateStyles.layout === "split-page") {
    return (
      <div style={containerStyle}>
        <div
          style={{
            background: templateStyles.headerBgColor || "#0f172a",
            padding: editable
              ? "clamp(18px, 3vw, 28px)"
              : forPrint
              ? "28px"
              : "clamp(20px, 4vw, 28px)",
            margin: editable
              ? "-clamp(16px, 3vw, 30px) -clamp(16px, 3vw, 30px) 0 -clamp(16px, 3vw, 30px)"
              : forPrint
              ? "-40px -40px 0 -40px"
              : "-clamp(20px, 4vw, 40px) -clamp(20px, 4vw, 40px) 0 -clamp(20px, 4vw, 40px)",
            textAlign: "center",
          }}
        >
          {editable ? (
            <>
              <input
                style={{
                  fontSize: "clamp(28px, 5vw, 36px)",
                  fontWeight: 800,
                  textAlign: "center",
                  color: "#ffffff",
                  margin: 0,
                  padding: "8px 12px",
                  border: "1px solid rgba(255,255,255,0.3)",
                  borderRadius: 6,
                  width: "100%",
                  fontFamily: "inherit",
                  marginBottom: 10,
                  background: "rgba(255,255,255,0.1)",
                }}
                value={data.name}
                onChange={(e) =>
                  onChange && onChange({ ...data, name: e.target.value })
                }
                placeholder="Full Name"
              />
              <input
                style={{
                  fontSize: "clamp(15px, 3vw, 18px)",
                  fontWeight: 600,
                  textAlign: "center",
                  color: templateStyles.accentColor,
                  margin: 0,
                  padding: "8px 12px",
                  border: `1px solid ${templateStyles.accentColor}`,
                  borderRadius: 6,
                  width: "100%",
                  fontFamily: "inherit",
                  background: "rgba(255,255,255,0.1)",
                }}
                value={data.title}
                onChange={(e) =>
                  onChange && onChange({ ...data, title: e.target.value })
                }
                placeholder="Job Title"
              />
            </>
          ) : (
            <>
              <h1
                style={{
                  ...nameStyle,
                  fontSize: forPrint ? "36px" : "clamp(28px, 5vw, 36px)",
                  color: "#ffffff",
                  marginBottom: 6,
                }}
              >
                {data.name}
              </h1>
              <div
                style={{
                  ...titleStyle,
                  fontSize: forPrint ? "18px" : "clamp(15px, 3vw, 18px)",
                  color: templateStyles.accentColor,
                  fontWeight: 600,
                }}
              >
                {data.title}
              </div>
            </>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 18,
              marginTop: 14,
              fontSize: 13,
              color: "#e2e8f0",
              flexWrap: "wrap",
            }}
          >
            {editable ? (
              <>
                {["email", "phone", "website"].map((field) => (
                  <input
                    key={field}
                    style={{
                      ...inputStyle,
                      marginBottom: 0,
                      flex: "1",
                      minWidth: "150px",
                      fontSize: 13,
                      background: "rgba(255,255,255,0.1)",
                      color: "#fff",
                      border: "1px solid rgba(255,255,255,0.3)",
                    }}
                    value={data[field] || ""}
                    onChange={(e) =>
                      onChange && onChange({ ...data, [field]: e.target.value })
                    }
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  />
                ))}
              </>
            ) : (
              <>
                {data.email && <span>{data.email}</span>}
                {data.phone && <span>•</span>}
                {data.phone && <span>{data.phone}</span>}
                {data.website && <span>•</span>}
                {data.website && <span>{data.website}</span>}
              </>
            )}
          </div>
        </div>

        <div style={{ marginTop: 24 }}>
          {(editable || data.summary?.trim()) && (
            <div style={sectionContainerStyle}>
              <h3
                style={{
                  background:
                    templateStyles.sectionHeaderBg ||
                    templateStyles.accentColor,
                  color: templateStyles.sectionHeaderColor || "#ffffff",
                  padding: "10px 16px",
                  margin: 0,
                  marginBottom: 12,
                  fontSize: forPrint ? "15px" : "clamp(14px, 3vw, 15px)",
                  fontWeight: 700,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >
                Professional Summary
              </h3>
              {editable ? (
                <textarea
                  style={{ ...inputStyle, minHeight: 70, resize: "vertical" }}
                  value={data.summary}
                  onChange={(e) =>
                    onChange && onChange({ ...data, summary: e.target.value })
                  }
                  placeholder="Professional summary"
                />
              ) : (
                <p style={{ ...summaryStyle, fontSize: 13, lineHeight: 1.6 }}>
                  {data.summary}
                </p>
              )}
            </div>
          )}

          {(editable || data.experience?.some((exp) => exp.role?.trim())) && (
            <div style={sectionContainerStyle}>
              <h3
                style={{
                  background:
                    templateStyles.sectionHeaderBg ||
                    templateStyles.accentColor,
                  color: templateStyles.sectionHeaderColor || "#ffffff",
                  padding: "10px 16px",
                  margin: 0,
                  marginBottom: 14,
                  fontSize: forPrint ? "15px" : "clamp(14px, 3vw, 15px)",
                  fontWeight: 700,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >
                Professional Experience
              </h3>
              {data.experience.map((exp, i) => (
                <div
                  key={i}
                  style={{
                    ...experienceItemStyle,
                    marginBottom: 20,
                    paddingLeft: editable ? 0 : 16,
                    borderLeft: editable
                      ? "none"
                      : `4px solid ${templateStyles.accentColor}`,
                  }}
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
                        placeholder="Job Title – Company"
                      />
                      <input
                        style={inputStyle}
                        value={exp.years}
                        onChange={(e) => {
                          const arr = [...data.experience];
                          arr[i].years = e.target.value;
                          onChange && onChange({ ...data, experience: arr });
                        }}
                        placeholder="Years"
                      />
                      <textarea
                        style={{
                          ...inputStyle,
                          minHeight: 60,
                          resize: "vertical",
                        }}
                        value={exp.bullets || ""}
                        onChange={(e) => {
                          const arr = [...data.experience];
                          arr[i].bullets = e.target.value;
                          onChange && onChange({ ...data, experience: arr });
                        }}
                        placeholder="Bullet points"
                      />
                      <button
                        style={removeButtonStyle}
                        onClick={() => {
                          const arr = data.experience.filter(
                            (_, idx) => idx !== i
                          );
                          onChange && onChange({ ...data, experience: arr });
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "baseline",
                          marginBottom: 8,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 15,
                            fontWeight: 700,
                            color: "#0f172a",
                          }}
                        >
                          {exp.role}
                        </span>
                        <span
                          style={{
                            fontSize: 13,
                            color: templateStyles.accentColor,
                            fontWeight: 600,
                          }}
                        >
                          {exp.years}
                        </span>
                      </div>
                      {exp.bullets && (
                        <ul
                          style={{
                            ...itemListStyle,
                            paddingLeft: 18,
                            marginTop: 6,
                          }}
                        >
                          {exp.bullets
                            .split("\n")
                            .filter((b) => b.trim())
                            .map((bullet, idx) => (
                              <li
                                key={idx}
                                style={{
                                  ...itemListItemStyle,
                                  fontSize: 13,
                                  marginBottom: 6,
                                }}
                              >
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

          <div
            style={{
              display: "grid",
              gridTemplateColumns: editable
                ? "1fr"
                : forPrint
                ? "1fr 1fr"
                : "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 20,
            }}
          >
            {(editable || data.skills?.some((skill) => skill?.trim())) && (
              <div style={sectionContainerStyle}>
                <h3
                  style={{
                    background:
                      templateStyles.sectionHeaderBg ||
                      templateStyles.accentColor,
                    color: templateStyles.sectionHeaderColor || "#ffffff",
                    padding: "10px 16px",
                    margin: 0,
                    marginBottom: 12,
                    fontSize: forPrint ? "15px" : "clamp(14px, 3vw, 15px)",
                    fontWeight: 700,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                  }}
                >
                  Skills
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {data.skills.map((skill, i) => (
                    <div key={i}>
                      {editable ? (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                          }}
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
                              const arr = data.skills.filter(
                                (_, idx) => idx !== i
                              );
                              onChange && onChange({ ...data, skills: arr });
                            }}
                          >
                            ×
                          </button>
                        </div>
                      ) : (
                        <span
                          style={{
                            ...skillBadgeStyle,
                            fontSize: 12,
                            fontWeight: 600,
                          }}
                        >
                          {skill}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                {editable && (
                  <button
                    style={buttonStyle}
                    onClick={() =>
                      onChange &&
                      onChange({ ...data, skills: [...data.skills, ""] })
                    }
                  >
                    + Add Skill
                  </button>
                )}
              </div>
            )}

            {(editable ||
              data.education?.some((edu) => edu.degree?.trim())) && (
              <div style={sectionContainerStyle}>
                <h3
                  style={{
                    background:
                      templateStyles.sectionHeaderBg ||
                      templateStyles.accentColor,
                    color: templateStyles.sectionHeaderColor || "#ffffff",
                    padding: "10px 16px",
                    margin: 0,
                    marginBottom: 12,
                    fontSize: forPrint ? "15px" : "clamp(14px, 3vw, 15px)",
                    fontWeight: 700,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                  }}
                >
                  Education
                </h3>
                {data.education.map((edu, i) => (
                  <div key={i} style={{ marginBottom: 14 }}>
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
                          placeholder="Degree"
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
                          placeholder="University"
                        />
                        <button
                          style={removeButtonStyle}
                          onClick={() => {
                            const arr = data.education.filter(
                              (_, idx) => idx !== i
                            );
                            onChange && onChange({ ...data, education: arr });
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div
                          style={{
                            fontSize: 14,
                            fontWeight: 600,
                            color: "#0f172a",
                            marginBottom: 3,
                          }}
                        >
                          {edu.degree}
                        </div>
                        <div style={{ fontSize: 13, color: "#64748b" }}>
                          {edu.years}
                        </div>
                        {edu.details && (
                          <div
                            style={{
                              fontSize: 12,
                              color: "#94a3b8",
                              marginTop: 2,
                            }}
                          >
                            {edu.details}
                          </div>
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
          </div>

          {(editable || data.certifications?.some((cert) => cert?.trim())) && (
            <div style={sectionContainerStyle}>
              <h3
                style={{
                  background:
                    templateStyles.sectionHeaderBg ||
                    templateStyles.accentColor,
                  color: templateStyles.sectionHeaderColor || "#ffffff",
                  padding: "10px 16px",
                  margin: 0,
                  marginBottom: 12,
                  fontSize: forPrint ? "15px" : "clamp(14px, 3vw, 15px)",
                  fontWeight: 700,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >
                Certifications
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                  gap: 10,
                }}
              >
                {data.certifications.map((cert, i) => (
                  <div key={i}>
                    {editable ? (
                      <div
                        style={{
                          display: "flex",
                          gap: 6,
                          alignItems: "center",
                        }}
                      >
                        <input
                          style={{ ...inputStyle, marginBottom: 0 }}
                          value={cert}
                          onChange={(e) => {
                            const arr = [...data.certifications];
                            arr[i] = e.target.value;
                            onChange &&
                              onChange({ ...data, certifications: arr });
                          }}
                          placeholder="Certification"
                        />
                        <button
                          style={{
                            ...removeButtonStyle,
                            marginTop: 0,
                            padding: "4px 8px",
                          }}
                          onClick={() => {
                            const arr = data.certifications.filter(
                              (_, idx) => idx !== i
                            );
                            onChange &&
                              onChange({ ...data, certifications: arr });
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <div
                        style={{
                          fontSize: 13,
                          padding: "8px 12px",
                          background: "#f8fafc",
                          borderRadius: 6,
                          borderLeft: `3px solid ${templateStyles.accentColor}`,
                        }}
                      >
                        ✓ {cert}
                      </div>
                    )}
                  </div>
                ))}
              </div>
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
        </div>
      </div>
    );
  }

  if (templateStyles.layout === "two-column") {
    const sidebarStyle = {
      flex: `0 0 ${templateStyles.sidebarWidth || "36%"}`,
      background: templateStyles.sidebarBg || "var(--template-sidebar-bg)",
      padding: "22px",
      borderRadius: 12,
      boxSizing: "border-box",
      color: templateStyles.sidebarTextColor || "#2b0b2b",
      minHeight: 200,
    };

    const mainStyle = {
      flex: 1,
      paddingLeft: 24,
      boxSizing: "border-box",
    };

    return (
      <div style={containerStyle}>
        <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
          <aside style={sidebarStyle}>
            <div style={{ marginBottom: 18 }}>
              {editable ? (
                <div>
                  <input
                    style={{ ...inputStyle, marginBottom: 8 }}
                    value={data.email || ""}
                    onChange={(e) =>
                      onChange && onChange({ ...data, email: e.target.value })
                    }
                    placeholder="Email"
                  />
                  <input
                    style={{ ...inputStyle, marginBottom: 8 }}
                    value={data.phone || ""}
                    onChange={(e) =>
                      onChange && onChange({ ...data, phone: e.target.value })
                    }
                    placeholder="Phone"
                  />
                  <input
                    style={{ ...inputStyle, marginBottom: 0 }}
                    value={data.website || ""}
                    onChange={(e) =>
                      onChange && onChange({ ...data, website: e.target.value })
                    }
                    placeholder="Website"
                  />
                </div>
              ) : (
                <div style={{ fontSize: 13 }}>
                  {data.email && <div>Email: {data.email}</div>}
                  {data.phone && <div>Phone: {data.phone}</div>}
                  {data.website && <div>Website: {data.website}</div>}
                </div>
              )}
            </div>

            <div style={{ marginTop: 6 }}>
              <h4
                style={{
                  margin: 0,
                  marginBottom: 8,
                  color: templateStyles.primaryColor,
                }}
              >
                Skills
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {data.skills?.map((skill, i) => (
                  <div
                    key={i}
                    style={{
                      background:
                        templateStyles.skillBadgeBg ||
                        templateStyles.skillBadgeBg,
                      color: templateStyles.skillBadgeColor || "#000",
                      padding: templateStyles.skillPadding || "6px 10px",
                      borderRadius: templateStyles.skillBorderRadius || "6px",
                      boxShadow: templateStyles.skillShadow || "none",
                      fontSize: 13,
                    }}
                  >
                    {editable ? (
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
                    ) : (
                      skill
                    )}
                  </div>
                ))}
              </div>
              {editable && (
                <button
                  style={{ ...buttonStyle, marginTop: 12 }}
                  onClick={() =>
                    onChange &&
                    onChange({ ...data, skills: [...data.skills, ""] })
                  }
                >
                  + Add Skill
                </button>
              )}
            </div>

            {((data.certifications && data.certifications.length) ||
              editable) && (
              <div style={{ marginTop: 18 }}>
                <h4
                  style={{
                    margin: 0,
                    marginBottom: 8,
                    color: templateStyles.primaryColor,
                  }}
                >
                  Certifications
                </h4>
                <ul style={{ paddingLeft: 16, marginTop: 8 }}>
                  {data.certifications?.map((cert, i) => (
                    <li key={i} style={{ fontSize: 13, marginBottom: 6 }}>
                      {editable ? (
                        <div
                          style={{
                            display: "flex",
                            gap: 8,
                            alignItems: "center",
                          }}
                        >
                          <input
                            style={{ ...inputStyle, marginBottom: 0 }}
                            value={cert}
                            onChange={(e) => {
                              const arr = [...data.certifications];
                              arr[i] = e.target.value;
                              onChange &&
                                onChange({ ...data, certifications: arr });
                            }}
                            placeholder="Certification"
                          />
                          <button
                            style={{
                              ...removeButtonStyle,
                              marginTop: 0,
                              padding: "4px 8px",
                            }}
                            onClick={() => {
                              const arr = data.certifications.filter(
                                (_, idx) => idx !== i
                              );
                              onChange &&
                                onChange({ ...data, certifications: arr });
                            }}
                          >
                            ×
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
                    style={{ ...buttonStyle, marginTop: 8 }}
                    onClick={() =>
                      onChange &&
                      onChange({
                        ...data,
                        certifications: [...(data.certifications || []), ""],
                      })
                    }
                  >
                    + Add
                  </button>
                )}
              </div>
            )}
          </aside>

          <main style={mainStyle}>
            <div style={{ marginBottom: 12 }}>
              {editable ? (
                <input
                  style={{
                    fontSize: "clamp(24px, 5vw, 30px)",
                    fontWeight: 800,
                    textAlign: "left",
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
                    textAlign: "left",
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

              {(editable || data.summary?.trim()) && (
                <div style={sectionContainerStyle}>
                  <h3 style={sectionTitleStyle}>Professional Summary</h3>
                  {editable ? (
                    <textarea
                      style={{
                        ...inputStyle,
                        minHeight: 80,
                        resize: "vertical",
                      }}
                      value={data.summary}
                      onChange={(e) =>
                        onChange &&
                        onChange({ ...data, summary: e.target.value })
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
                  (exp) =>
                    exp.role?.trim() || exp.years?.trim() || exp.bullets?.trim()
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
                              onChange &&
                                onChange({ ...data, experience: arr });
                            }}
                            placeholder="Job Title – Company Name"
                          />
                          <input
                            style={inputStyle}
                            value={exp.years}
                            onChange={(e) => {
                              const arr = [...data.experience];
                              arr[i].years = e.target.value;
                              onChange &&
                                onChange({ ...data, experience: arr });
                            }}
                            placeholder="Years (e.g., 2020 - Present)"
                          />
                          <textarea
                            style={{
                              ...inputStyle,
                              minHeight: 60,
                              resize: "vertical",
                            }}
                            value={exp.bullets || ""}
                            onChange={(e) => {
                              const arr = [...data.experience];
                              arr[i].bullets = e.target.value;
                              onChange &&
                                onChange({ ...data, experience: arr });
                            }}
                            placeholder="Bullet points (one per line)"
                          />
                          <button
                            style={removeButtonStyle}
                            onClick={() => {
                              const arr = data.experience.filter(
                                (_, idx) => idx !== i
                              );
                              onChange &&
                                onChange({ ...data, experience: arr });
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

              {(editable ||
                data.education?.some(
                  (edu) =>
                    edu.degree?.trim() ||
                    edu.years?.trim() ||
                    edu.details?.trim()
                )) && (
                <div style={sectionContainerStyle}>
                  <h3 style={sectionTitleStyle}>Education</h3>
                  {data.education.map((edu, i) => (
                    <div
                      key={i}
                      style={experienceItemStyle}
                      className="education-item"
                    >
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
                              const arr = data.education.filter(
                                (_, idx) => idx !== i
                              );
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
                          {edu.details && (
                            <p style={summaryStyle}>{edu.details}</p>
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
                                  color: templateStyles.primaryColor,
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
                              <h3 style={sectionTitleStyle}>
                                {section.header}
                              </h3>
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
          </main>
        </div>
      </div>
    );
  }

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
