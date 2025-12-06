import React, { useEffect, useState, useCallback } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import jsPDF from "jspdf";

import "./EditResume.css";
import t1 from "../assets/template1.jpg";
import t2 from "../assets/template2.jpg";
import t3 from "../assets/template3.jpg";
import t4 from "../assets/template4.jpg";
import t5 from "../assets/template5.jpg";
import t6 from "../assets/template6.jpg";
import t7 from "../assets/template7.jpg";
import t8 from "../assets/template8.jpg";
import t9 from "../assets/template9.jpg";

// EditResume: component to edit resume data, generate HTML via AI, preview and export PDF
const EditResume = ({ templateIndex = null, templateData = null, onBack }) => {
  // Personal information state
  const [personal, setPersonal] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
  });

  // Sections (Experience, Education, Skills, etc.)
  const [sections, setSections] = useState([
    {
      title: "Experience",
      subtitle: "",
      content: "",
      placeholder: "Experience",
    },
    { title: "Studies", subtitle: "", content: "", placeholder: "Studies" },
    {
      title: "Technical Skills List",
      subtitle: "",
      content: "",
      placeholder: "Technical Skills List",
    },
  ]);

  // Optional notes/instructions for the AI
  const [aiNotes, setAiNotes] = useState("");

  // UI states
  const [isGenerating, setIsGenerating] = useState(false);
  const [isConverting, setIsConverting] = useState(false);

  // Generated outputs
  const [generatedHtml, setGeneratedHtml] = useState("");
  const [pageImages, setPageImages] = useState([]);

  // Compile a template string by replacing placeholders with current data
  const compileTemplate = useCallback(
    (template) => {
      if (!template) return template;
      let html = template;

      const safe = (v) => (v === null || v === undefined ? "" : v);

      // Replace simple personal tokens: {{name}}, {{title}}, {{email}}, {{phone}}
      html = html.replace(
        /\{\{\s*(name|title|email|phone)\s*\}\}/gi,
        (_, key) => {
          const k = key.toLowerCase();
          return safe(personal[k]);
        }
      );

      // Replace {{sections}} with assembled HTML of all sections
      const sectionsHtml = sections
        .filter((s) => s && s.content)
        .map(
          (s) =>
            `<div class="resume-section"><div class="section-title">${safe(
              s.title
            )}</div>${
              s.subtitle
                ? `<div class="section-subtitle">${safe(s.subtitle)}</div>`
                : ""
            }<div>${safe(s.content)}</div></div>`
        )
        .join("\n");
      html = html.replace(/\{\{\s*sections\s*\}\}/gi, sectionsHtml);

      // Replace {{section:HeaderName}} with matching section content (by title)
      html = html.replace(/\{\{\s*section:([^}]+)\s*\}\}/gi, (_, header) => {
        const h = header.trim().toLowerCase();
        const found = sections.find((s) => (s.title || "").toLowerCase() === h);
        return found ? safe(found.content) : "";
      });

      // Replace indexed section placeholders like {{section[0]}} (0-based) or {{section[1]}}
      html = html.replace(/\{\{\s*section\[(\d+)\]\s*\}\}/gi, (_, idx) => {
        const i = parseInt(idx, 10);
        const s = sections[i] || sections[i - 1];
        return s ? safe(s.content) : "";
      });

      // Remove any leftover handlebars to avoid showing raw tokens
      html = html.replace(/\{\{\s*[^}]+\s*\}\}/g, "");

      return html;
    },
    [personal, sections]
  );

  // If a template HTML was provided, compile it with current form data and show as preview
  useEffect(() => {
    if (templateData) {
      const compiled = compileTemplate(templateData);
      setGeneratedHtml(compiled);
    }
  }, [templateData, compileTemplate]);

  // Helpful debug: print current resume state when relevant fields change
  useEffect(() => {
    // keep lightweight logging for debugging
    // const snapshot = { personalInfo: personal, sections: sections.map((s) => ({ section_about: s.header, content: s.content })), aiNotes };
    // console.log("Resume snapshot:", snapshot);
  }, [personal, sections, aiNotes]);

  // Handlers for personal fields
  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setPersonal((prev) => ({ ...prev, [name]: value }));
  };

  // Section helpers
  const handleSectionChange = (index, field, value) => {
    setSections((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const addSection = () =>
    setSections((s) => [
      ...s,
      { title: "", subtitle: "", content: "", placeholder: "New Section" },
    ]);
  const removeSection = (index) =>
    setSections((s) => s.filter((_, i) => i !== index));

  const clearAll = () => {
    setPersonal({ name: "", title: "", email: "", phone: "" });
    setSections([
      {
        title: "Experience",
        subtitle: "",
        content: "",
        placeholder: "Experience",
      },
      { title: "Studies", subtitle: "", content: "", placeholder: "Studies" },
      {
        title: "Technical Skills List",
        subtitle: "",
        content: "",
        placeholder: "Technical Skills List",
      },
    ]);
    setAiNotes("");
    setGeneratedHtml("");
    setPageImages([]);
  };

  // Create the payload structure for Gemini (centralized for easy edits)
  const createGeminiPayload = (overrides = {}) => {
    return {
      personalInfo: personal,
      sections: sections.map((s) => ({
        section_about: s.title,
        subtitle: s.subtitle,
        content: s.content,
      })),
      building_instructions_for_ai:
        aiNotes || "strictly based on the provided html code structure",
      template_style: "professional",
      reference_html: templateData || "",
      ...overrides,
    };
  };

  // Build the prompt payload used for AI generation (uses centralized payload)
  const buildPromptForAI = () => {
    const payload = createGeminiPayload();

    const dataLines = [
      `- Name: ${payload.personalInfo.name}`,
      `- Title: ${payload.personalInfo.title}`,
      `- Email: ${payload.personalInfo.email}`,
      `- Phone: ${payload.personalInfo.phone}`,
    ];
    const sectionsText = payload.sections
      .map((s) => `- ${s.section_about}: ${s.content}`)
      .join("\n");

    const fullPrompt = `You are an HTML resume generator. Generate only valid HTML (single-file) without any explanations or markdown formatting. Use the reference HTML structure provided (if any) as the visual/layout guide and fill it with the resume data. Do NOT add any extra text or commentary.\n\nReference HTML structure (use for guidance only):\n${
      payload.reference_html || "(none)"
    }\n\nGenerate a professional A4 HTML resume (single-file) based on the data below. Return ONLY the complete HTML markup (including inline CSS). No explanations or other markup formats.\n\n${dataLines.join(
      "\n"
    )}\n\nSections:\n${sectionsText}\n\nAdditional Instructions: ${
      payload.building_instructions_for_ai
    }`;

    return fullPrompt;
  };

  // Generate resume HTML using Google Generative AI (Gemini)
  const generateResumeWithAI = async () => {
    setIsGenerating(true);
    try {
      const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
      if (!apiKey) {
        alert("API key not found. Please restart the development server.");
        return;
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const prompt = buildPromptForAI();
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const htmlCode = await response.text();

      setGeneratedHtml(htmlCode);
      await convertHtmlToA4Images(htmlCode);
    } catch (err) {
      console.error("Error generating resume:", err);
      alert(
        "Failed to generate resume. Please check your API key and try again."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  // Convert HTML -> A4 page images for preview and PDF export
  const convertHtmlToA4Images = async (html) => {
    setIsConverting(true);
    setPageImages([]);
    try {
      const container = document.createElement("div");
      container.style.width = "794px"; // roughly A4 width at 96dpi
      container.style.minHeight = "1123px";
      container.style.position = "fixed";
      container.style.left = "-9999px";
      container.style.top = "0";
      container.style.background = "white";
      container.innerHTML = html;
      document.body.appendChild(container);

      let html2canvas;
      try {
        html2canvas = (await import("html2canvas")).default;
      } catch (err) {
        console.error("html2canvas not found:", err);
        alert(
          "Please install html2canvas in the project: `npm install html2canvas` and restart the dev server."
        );
        document.body.removeChild(container);
        setIsConverting(false);
        return;
      }

      const scale = 2;
      const canvas = await html2canvas(container, {
        scale,
        useCORS: true,
        allowTaint: true,
        logging: false,
        width: container.offsetWidth,
      });

      const pageHeight = Math.round(1123 * scale);
      const totalHeight = canvas.height;
      const pages = [];

      const tmpCanvas = document.createElement("canvas");
      const tmpCtx = tmpCanvas.getContext("2d");

      for (let y = 0; y < totalHeight; y += pageHeight) {
        const h = Math.min(pageHeight, totalHeight - y);
        tmpCanvas.width = canvas.width;
        tmpCanvas.height = h;
        tmpCtx.clearRect(0, 0, tmpCanvas.width, tmpCanvas.height);
        tmpCtx.drawImage(
          canvas,
          0,
          y,
          canvas.width,
          h,
          0,
          0,
          tmpCanvas.width,
          tmpCanvas.height
        );
        pages.push(tmpCanvas.toDataURL("image/png"));
      }

      document.body.removeChild(container);
      setPageImages(pages);
    } catch (err) {
      console.error("Error converting HTML to images:", err);
      alert(
        "Failed to convert generated HTML to images: " + (err.message || err)
      );
    } finally {
      setIsConverting(false);
    }
  };

  // Export the previewed pages as PDF
  const downloadPdf = async () => {
    try {
      if ((!pageImages || pageImages.length === 0) && !generatedHtml) {
        alert("Nothing to download. Generate the resume first.");
        return;
      }

      if ((!pageImages || pageImages.length === 0) && generatedHtml) {
        await convertHtmlToA4Images(generatedHtml);
      }

      const imgs = pageImages && pageImages.length ? pageImages : [];
      if (imgs.length === 0) {
        alert("Failed to generate preview images for PDF.");
        return;
      }

      let pdf;
      try {
        pdf = new jsPDF({ orientation: "portrait", unit: "px", format: "a4" });
      } catch (e) {
        pdf = new jsPDF("p", "pt", "a4");
      }

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      imgs.forEach((img, idx) => {
        if (idx > 0) pdf.addPage();
        pdf.addImage(img, "PNG", 0, 0, pageWidth, pageHeight);
      });

      const rawTitle = personal && personal.title ? personal.title : "resume";
      const safeTitle = rawTitle
        .trim()
        .replace(/[^a-z0-9\-_. ]/gi, "")
        .replace(/\s+/g, "_");
      pdf.save(`${safeTitle || "resume"}.pdf`);
    } catch (err) {
      console.error("PDF download error:", err);
      alert("Failed to generate PDF: " + (err.message || err));
    }
  };

  return (
    <div className="edit-resume-container">
      <div className="edit-resume-body">
        <aside className="editor-sidebar">
          <div className="sidebar-header">
            <h2>Resume Information</h2>
            <div className="sidebar-header-actions">
              <button className="btn-outline" onClick={clearAll}>
                Reset All
              </button>
              <button
                className="btn-primary"
                onClick={generateResumeWithAI}
                disabled={isGenerating}
              >
                {isGenerating ? "Generating..." : "Generate Resume"}
              </button>
            </div>
          </div>

          <div className="sidebar-content">
            <div className="section-card">
              <h3 className="section-heading">Personal Details</h3>
              <div className="personal-grid">
                <div className="input-group">
                  <label>Name</label>
                  <input
                    name="name"
                    placeholder="John Doe"
                    value={personal.name}
                    onChange={handlePersonalChange}
                  />
                </div>
                <div className="input-group">
                  <label>Title</label>
                  <input
                    name="title"
                    placeholder="Full-Stack Developer"
                    value={personal.title}
                    onChange={handlePersonalChange}
                  />
                </div>
                <div className="input-group">
                  <label>Email</label>
                  <input
                    name="email"
                    placeholder="john.doe@example.com"
                    value={personal.email}
                    onChange={handlePersonalChange}
                  />
                </div>
                <div className="input-group">
                  <label>Phone</label>
                  <input
                    name="phone"
                    placeholder="+1 (123) 456-7890"
                    value={personal.phone}
                    onChange={handlePersonalChange}
                  />
                </div>
              </div>
            </div>

            <div className="section-card">
              <div className="section-header-row">
                <h3 className="section-heading">Resume Sections</h3>
              </div>

              <div className="sections-list">
                {sections.map((sec, idx) => (
                  <div key={idx} className="dynamic-section">
                    <div className="section-header-bar">
                      <button
                        className="btn-remove"
                        onClick={() => removeSection(idx)}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>
                    <div className="section-fields-grid">
                      <div className="input-group">
                        <label>Title</label>
                        <input
                          type="text"
                          placeholder={sec.placeholder || "Section Title"}
                          value={sec.title}
                          onChange={(e) =>
                            handleSectionChange(idx, "title", e.target.value)
                          }
                        />
                      </div>
                      <div className="input-group">
                        <label>Subtitle</label>
                        <input
                          type="text"
                          placeholder="Optional subtitle"
                          value={sec.subtitle}
                          onChange={(e) =>
                            handleSectionChange(idx, "subtitle", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="input-group">
                      <label>Content</label>
                      <textarea
                        rows={3}
                        placeholder="Enter details..."
                        value={sec.content}
                        onChange={(e) =>
                          handleSectionChange(idx, "content", e.target.value)
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button className="btn-add-section mt-3" onClick={addSection}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add Section
              </button>
            </div>

            <div className="section-card">
              <h3 className="section-heading">AI Instructions</h3>
              <div className="input-group">
                <textarea
                  className="ai-instructions"
                  rows={2}
                  placeholder="Custom instructions for AI..."
                  value={aiNotes}
                  onChange={(e) => setAiNotes(e.target.value)}
                />
              </div>
            </div>
          </div>
        </aside>

        <main className="preview-main">
          <div className="preview-container">
            <div className="preview-header">
              <div className="preview-header-left">
                <button className="back-btn" onClick={() => onBack && onBack()}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>
                <h2>Live Preview</h2>
              </div>
              <div className="preview-header-right">
                {(isGenerating || isConverting) && (
                  <div className="status-badge">
                    <div className="spinner-sm" />
                    {isGenerating ? "Generating..." : "Converting..."}
                  </div>
                )}
                <button
                  className="btn-download"
                  onClick={downloadPdf}
                  disabled={isConverting}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                  </svg>
                  Download PDF
                </button>
              </div>
            </div>

            <div className="preview-content">
              {pageImages && pageImages.length > 0 ? (
                <div className="pages-preview">
                  {pageImages.map((src, idx) => (
                    <div key={idx} className="page-wrapper">
                      <div className="page-label">Page {idx + 1}</div>
                      <img
                        src={src}
                        alt={`Page ${idx + 1}`}
                        className="page-image"
                      />
                    </div>
                  ))}
                </div>
              ) : generatedHtml ? (
                <div className="html-preview-wrapper">
                  <iframe
                    className="html-preview-iframe"
                    title="Resume Preview"
                    srcDoc={generatedHtml}
                  />
                </div>
              ) : (
                <div className="empty-preview">
                  <div className="resume-placeholder">
                    <div className="placeholder-header">
                      <div className="ph-name">
                        {personal.name || "Your Name"}
                      </div>
                      <div className="ph-title">
                        {personal.title || "Professional Title"}
                      </div>
                      <div className="ph-contact">
                        {personal.email || "email@example.com"}
                        {(personal.email || personal.phone) && " | "}
                        {personal.phone || "+1 (123) 456-7890"}
                      </div>
                    </div>
                    {sections.map((sec, idx) =>
                      sec.content ? (
                        <div className="placeholder-section" key={idx}>
                          <div className="ph-section-title">{sec.title}</div>
                          {sec.subtitle && (
                            <div className="ph-section-subtitle">
                              {sec.subtitle}
                            </div>
                          )}
                          <div className="ph-section-content">
                            {sec.content}
                          </div>
                        </div>
                      ) : null
                    )}
                    {!sections.some((s) => s.content) && (
                      <div className="empty-state">
                        <svg
                          width="64"
                          height="64"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                        >
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                          <line x1="16" y1="13" x2="8" y2="13" />
                          <line x1="16" y1="17" x2="8" y2="17" />
                          <polyline points="10 9 9 9 8 9" />
                        </svg>
                        <p>Fill in your information to see a preview</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditResume;
