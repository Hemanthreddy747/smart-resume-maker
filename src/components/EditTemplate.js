import React, { useState, useRef, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import dummyTemplates from "./dummyTemplates";
import "./TemplateStyles.css";
import SavedResumesModal from "./SavedResumesModal";
import { saveResume } from "./db";

function ResumeView({
  data,
  editable,
  onChange,
  forPrint,
  isPreview,
  templateId = 1,
}) {
  if (!data) return null;

  // Template-specific styles
  const getTemplateStyles = () => {
    switch (templateId) {
      case 1: // Classic Professional - Traditional blue theme
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
      case 2: // Modern Executive - Elegant dark theme
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
          skillGap: "16px 10px",
          skillBorderRadius: "20px",
          skillPadding: "8px 16px",
        };
      case 3: // Creative Gradient - Vibrant modern design
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
    border: "none",
    borderRadius: 0,
    padding: editable
      ? "clamp(16px, 3vw, 30px)"
      : forPrint
      ? "40px"
      : "clamp(20px, 4vw, 40px)",
    background: "var(--bg-primary)",
    width: isPreview
      ? "100%"
      : forPrint
      ? "210mm"
      : editable
      ? "100%"
      : "210mm",
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
            onChange={(e) => onChange({ ...data, name: e.target.value })}
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
            onChange={(e) => onChange({ ...data, title: e.target.value })}
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
                onChange={(e) => onChange({ ...data, email: e.target.value })}
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
                onChange={(e) => onChange({ ...data, phone: e.target.value })}
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
                onChange={(e) => onChange({ ...data, website: e.target.value })}
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
              onChange={(e) => onChange({ ...data, summary: e.target.value })}
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
                      onChange({ ...data, experience: arr });
                    }}
                    placeholder="Years (e.g., 2020 - Present)"
                  />
                  <textarea
                    style={{ ...inputStyle, minHeight: 60, resize: "vertical" }}
                    value={exp.bullets || ""}
                    onChange={(e) => {
                      const arr = [...data.experience];
                      arr[i].bullets = e.target.value;
                      onChange({ ...data, experience: arr });
                    }}
                    placeholder="Bullet points (one per line)"
                  />
                  <button
                    style={removeButtonStyle}
                    onClick={() => {
                      const arr = data.experience.filter((_, idx) => idx !== i);
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
                        onChange({ ...data, skills: arr });
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
                        onChange({ ...data, skills: arr });
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
                onChange({ ...data, skills: [...data.skills, ""] })
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
                      onChange({ ...data, education: arr });
                    }}
                    placeholder="Degree – Field"
                  />
                  <input
                    style={inputStyle}
                    value={edu.years}
                    onChange={(e) => {
                      const arr = [...data.education];
                      arr[i].years = e.target.value;
                      onChange({ ...data, education: arr });
                    }}
                    placeholder="Years"
                  />
                  <input
                    style={inputStyle}
                    value={edu.details || ""}
                    onChange={(e) => {
                      const arr = [...data.education];
                      arr[i].details = e.target.value;
                      onChange({ ...data, education: arr });
                    }}
                    placeholder="University · GPA (optional)"
                  />
                  <button
                    style={removeButtonStyle}
                    onClick={() => {
                      const arr = data.education.filter((_, idx) => idx !== i);
                      onChange({ ...data, education: arr });
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
                        onChange({ ...data, certifications: arr });
                      }}
                      placeholder="Certification"
                    />
                    <button
                      style={removeButtonStyle}
                      onClick={() => {
                        const arr = data.certifications.filter(
                          (_, idx) => idx !== i
                        );
                        onChange({ ...data, certifications: arr });
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

const EditTemplate = () => {
  const [selected, setSelected] = useState(null);
  const [resume, setResume] = useState(null);
  const printRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSavedModalOpen, setSavedModalOpen] = useState(false);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState(null);
  const [pdfImageUrls, setPdfImageUrls] = useState([]);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const navigate = useNavigate();

  // Auto-select template when arriving via /edit-template?template=<id>
  useEffect(() => {
    const t = searchParams.get("template");
    if (!t) {
      setSelected(null);
      setResume(null);
      return;
    }
    const id = parseInt(t, 10);
    if (isNaN(id)) return;
    const found = dummyTemplates.find((d) => d.id === id);
    if (found) {
      setSelected(found.id);
      setResume({ ...found.content });
    }
  }, [searchParams]);

  // Generate PDF preview whenever resume changes
  useEffect(() => {
    if (!resume || !printRef.current) return;

    const generatePdfPreview = async () => {
      setIsGeneratingPdf(true);
      const startTime = Date.now();

      try {
        const html2pdf = (await import("html2pdf.js")).default;
        const element = printRef.current;

        const opt = {
          margin: 0,
          filename: "preview.pdf",
          image: { type: "jpeg", quality: 1 },
          html2canvas: { scale: 2, useCORS: true, windowWidth: 794 },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
          pagebreak: { mode: ["avoid-all", "css", "legacy"] },
        };

        const pdfBlob = await html2pdf().set(opt).from(element).output("blob");

        const pdfBlobUrl = URL.createObjectURL(pdfBlob);

        setPdfPreviewUrl((prevUrl) => {
          if (prevUrl) {
            URL.revokeObjectURL(prevUrl);
          }
          return pdfBlobUrl;
        });

        // Convert PDF to images
        const pdfjsLib = await import("pdfjs-dist");
        const pdfjsWorker = await import("pdfjs-dist/build/pdf.worker.mjs");
        pdfjsLib.GlobalWorkerOptions.workerSrc = URL.createObjectURL(
          new Blob([pdfjsWorker], { type: "application/javascript" })
        );

        const arrayBuffer = await pdfBlob.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const imageUrls = [];

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 2 });
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.width = viewport.width;
          canvas.height = viewport.height;

          await page.render({
            canvasContext: context,
            viewport: viewport,
          }).promise;

          // Add watermark
          context.save();
          context.globalAlpha = 0.15;
          context.fillStyle = "#000000";
          context.font = "bold 60px Arial";
          context.textAlign = "center";
          context.textBaseline = "middle";

          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          context.translate(centerX, centerY);
          context.rotate((-45 * Math.PI) / 180);
          context.fillText("PREVIEW", 0, 0);
          context.restore();

          const imageUrl = canvas.toDataURL("image/png");
          imageUrls.push(imageUrl);
        }

        setPdfImageUrls((prevUrls) => {
          return imageUrls;
        });

        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, 1500 - elapsedTime);

        if (remainingTime > 0) {
          await new Promise((resolve) => setTimeout(resolve, remainingTime));
        }
      } catch (error) {
        console.error("PDF preview generation error:", error);
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, 1500 - elapsedTime);
        if (remainingTime > 0) {
          await new Promise((resolve) => setTimeout(resolve, remainingTime));
        }
      } finally {
        setIsGeneratingPdf(false);
      }
    };

    const timeoutId = setTimeout(generatePdfPreview, 600);
    return () => clearTimeout(timeoutId);
  }, [resume, selected]);

  // Cleanup PDF URL on unmount
  useEffect(() => {
    return () => {
      if (pdfPreviewUrl) {
        URL.revokeObjectURL(pdfPreviewUrl);
      }
    };
  }, [pdfPreviewUrl]);

  // Helper to create sanitized filename: Name_YYYYMMDD_HHMMSS_Suffix.pdf
  const createFileName = (name, suffix = "Resume") => {
    const base =
      name && name.toString().trim() ? name.toString().trim() : "Untitled";
    const sanitized = base.replace(/\s+/g, "_").replace(/[^\w-]/g, "");
    const pad = (n) => n.toString().padStart(2, "0");
    const now = new Date();
    const ts = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(
      now.getDate()
    )}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
    return `${sanitized}_${ts}_${suffix}.pdf`;
  };

  const handleDownloadPDF = async () => {
    const element = printRef.current;
    if (!element) return;

    try {
      const html2pdf = (await import("html2pdf.js")).default;

      const opt = {
        margin: 0,
        filename: createFileName(resume?.name || "Untitled", "Resume"),
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 2, useCORS: true, windowWidth: 794 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
      };

      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      alert("Please install html2pdf.js: npm install html2pdf.js");
      console.error("PDF generation error:", error);
    }
  };

  const handlePrintPDF = async () => {
    const element = printRef.current;
    if (!element) return;

    try {
      const html2pdf = (await import("html2pdf.js")).default;

      const opt = {
        margin: 0,
        filename: createFileName(resume?.name || "Untitled", "Resume"),
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 2, useCORS: true, windowWidth: 794 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
      };

      const pdf = await html2pdf().set(opt).from(element).outputPdf("bloburl");
      const printWindow = window.open(pdf);
      if (printWindow) {
        printWindow.onload = () => {
          printWindow.print();
        };
      }
    } catch (error) {
      alert("Please install html2pdf.js: npm install html2pdf.js");
      console.error("PDF generation error:", error);
    }
  };

  return (
    <>
      {!selected && (
        <div
          style={{
            padding: "20px",
            background: "#f5f7fa",
            minHeight: "100vh",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: window.innerWidth <= 640 ? "column" : "row",
              justifyContent: "space-between",
              alignItems: window.innerWidth <= 640 ? "stretch" : "center",
              gap: 12,
              marginBottom: 24,
            }}
          >
            <h3
              style={{
                fontSize: "clamp(18px, 4vw, 22px)",
                fontWeight: 600,
                color: "var(--text-primary)",
                margin: 0,
                textAlign: "left",
              }}
            >
              Select a Resume Template
            </h3>
            <button
              style={{
                padding: "8px 16px",
                background: "var(--primary-500)",
                color: "var(--text-inverse)",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
                fontSize: "clamp(12px, 2.5vw, 13px)",
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
              onClick={() => setSavedModalOpen(true)}
            >
              Open Saved Resumes
            </button>
          </div>
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
                  navigate(`/edit-resume?template=${t.id}`);
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
      )}

      {selected && resume && (
        <div
          style={{
            padding: "clamp(16px, 3vw, 32px)",
            background: "#616569ff",
            minHeight: "100vh",
          }}
        >
          {/* <div
            style={{
              display: "flex",
              flexDirection: window.innerWidth <= 768 ? "column" : "row",
              justifyContent: "space-between",
              alignItems: window.innerWidth <= 768 ? "stretch" : "center",
              marginBottom: 24,
              gap: 16,
              background: "var(--bg-primary)",
              padding: "16px 20px",
              borderRadius: 12,
              boxShadow: "var(--shadow-md)",
            }}
          >
            <h3
              style={{
                fontSize: "clamp(18px, 4vw, 24px)",
                fontWeight: 600,
                color: "var(--text-primary)",
                margin: 0,
              }}
            >
              Editing: {dummyTemplates.find((t) => t.id === selected)?.name}
            </h3>
            <button
              style={{
                padding: "10px 20px",
                background: "var(--gray-600)",
                color: "var(--text-inverse)",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
                fontSize: "clamp(13px, 2.5vw, 14px)",
                fontWeight: 500,
                whiteSpace: "nowrap",
              }}
              onClick={() => {
                // Clear URL query (e.g., ?template=1) and reset state
                setSearchParams({});
                setSelected(null);
                setResume(null);
              }}
            >
              ← Back to Templates
            </button>
          </div> */}

          <div
            style={{
              display: "flex",
              flexDirection: window.innerWidth <= 1024 ? "column" : "row",
              gap: "clamp(16px, 3vw, 32px)",
              alignItems: "flex-start",
            }}
          >
            {/* Left side - Edit Form */}
            <div
              style={{
                flex: window.innerWidth <= 1024 ? "1" : "0 0 50%",
                maxWidth: window.innerWidth <= 1024 ? "100%" : "50%",
                width: "100%",
              }}
            >
              <div
                style={{
                  background: "var(--bg-tertiary)",
                  padding: "14(max-width: 520px)px 16px",
                  borderRadius: 8,
                  marginBottom: 12,
                }}
              >
                <h4
                  style={{
                    margin: 0,
                    fontSize: "clamp(20px, 3vw, 16px)",
                    fontWeight: 600,
                    color: "#333",
                    padding: "14px 10px",
                  }}
                >
                  Edit Resume
                </h4>
              </div>
              <div
                style={{
                  border: "1px solid var(--border-light)",
                  borderRadius: 8,
                  overflow: "hidden",
                  boxShadow: "var(--shadow-sm)",
                  background: "var(--bg-primary)",
                }}
              >
                <ResumeView
                  data={resume}
                  editable={true}
                  onChange={setResume}
                  templateId={selected}
                />
              </div>
            </div>

            {/* Right side - Preview */}
            <div
              style={{
                flex: window.innerWidth <= 1024 ? "1" : "0 0 50%",
                maxWidth: window.innerWidth <= 1024 ? "100%" : "50%",
                width: "100%",
                position: window.innerWidth <= 1024 ? "relative" : "sticky",
                top: window.innerWidth <= 1024 ? "auto" : 20,
              }}
            >
              <div
                style={{
                  background: "var(--bg-tertiary)",
                  padding: 8,
                  borderRadius: 8,
                  marginBottom: 12,
                  display: "flex",
                  flexDirection: window.innerWidth <= 640 ? "column" : "row",
                  justifyContent: "space-between",
                  alignItems: window.innerWidth <= 640 ? "stretch" : "center",
                  gap: 8,
                }}
              >
                <h4
                  style={{
                    margin: 0,
                    fontSize: "clamp(20px, 3vw, 16px)",
                    fontWeight: 600,
                    color: "#333",
                  }}
                >
                  Live Preview
                </h4>
                <div
                  style={{
                    display: "flex",
                    flexDirection: window.innerWidth <= 480 ? "row" : "row",
                    gap: 8,
                    overflow: "hidden",
                  }}
                >
                  <button
                    style={{
                      padding: "8px 16px",
                      background: "var(--success)",
                      color: "var(--text-inverse)",
                      border: "none",
                      borderRadius: 6,
                      cursor: "pointer",
                      fontSize: "clamp(12px, 2.5vw, 13px)",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                    }}
                    onClick={handleDownloadPDF}
                  >
                    Download
                  </button>
                  <button
                    style={{
                      padding: "8px 16px",
                      background: "var(--warning)",
                      color: "var(--text-inverse)",
                      border: "none",
                      borderRadius: 6,
                      cursor: "pointer",
                      fontSize: "clamp(12px, 2.5vw, 13px)",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                    }}
                    onClick={handlePrintPDF}
                  >
                    Print
                  </button>
                  <button
                    style={{
                      padding: "8px 16px",
                      background: "var(--primary-500)",
                      color: "var(--text-inverse)",
                      border: "none",
                      borderRadius: 6,
                      cursor: "pointer",
                      fontSize: "clamp(12px, 2.5vw, 13px)",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                    }}
                    onClick={async () => {
                      if (!resume) return;
                      try {
                        const payload = {
                          name: createFileName(
                            resume?.name || "Untitled",
                            "Resume"
                          ),
                          templateId: selected,
                          content: resume,
                        };
                        await saveResume(payload);
                        alert("Resume saved to browser.");
                      } catch (e) {
                        console.error(e);
                        alert("Failed to save resume.");
                      }
                    }}
                  >
                    Save
                  </button>
                  <button
                    style={{
                      padding: "8px 16px",
                      background: "var(--gray-600)",
                      color: "var(--text-inverse)",
                      border: "none",
                      borderRadius: 6,
                      cursor: "pointer",
                      fontSize: "clamp(12px, 2.5vw, 13px)",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                    }}
                    onClick={() => setSavedModalOpen(true)}
                  >
                    Open Saved
                  </button>
                </div>
              </div>
              <div
                style={{
                  border: "1px solid var(--border-light)",
                  borderRadius: 8,
                  overflow: "hidden",
                  boxShadow: "var(--shadow-sm)",
                  background: "#525659",
                  minHeight: "600px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                {isGeneratingPdf && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: "rgba(82, 86, 89, 0.9)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 10,
                    }}
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        border: "4px solid #f3f3f3",
                        borderTop: "4px solid var(--primary-500)",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite",
                      }}
                    />
                    <div
                      style={{
                        color: "#fff",
                        fontSize: "14px",
                        marginTop: "16px",
                        fontWeight: 500,
                      }}
                    >
                      Generating...
                    </div>
                  </div>
                )}
                {pdfImageUrls.length > 0 ? (
                  <div
                    style={{
                      width: "100%",
                      maxHeight: "842px",
                      overflowY: "auto",
                      opacity: isGeneratingPdf ? 0.3 : 1,
                      transition: "opacity 0.3s",
                      background: "#525659",
                      padding: "16px",
                    }}
                  >
                    {pdfImageUrls.map((imageUrl, index) => (
                      <img
                        key={index}
                        src={imageUrl}
                        alt={`Page ${index + 1}`}
                        style={{
                          width: "100%",
                          display: "block",
                          marginBottom:
                            index < pdfImageUrls.length - 1 ? "16px" : "0",
                          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  !isGeneratingPdf && (
                    <div
                      style={{
                        color: "#fff",
                        fontSize: "14px",
                        textAlign: "center",
                      }}
                    >
                      Select a template to preview
                    </div>
                  )
                )}
                {/* Hidden div for PDF generation */}
                <div style={{ position: "absolute", left: "-9999px" }}>
                  <div ref={printRef}>
                    <ResumeView
                      data={resume}
                      editable={false}
                      onChange={() => {}}
                      forPrint={true}
                      isPreview={true}
                      templateId={selected}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <SavedResumesModal
        isOpen={isSavedModalOpen}
        onClose={() => setSavedModalOpen(false)}
        onOpenResume={(item) => {
          setResume(item.content);
          setSelected(item.templateId);
          setSavedModalOpen(false);
        }}
      />
    </>
  );
};

export default EditTemplate;
