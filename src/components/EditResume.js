/*
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
    // Component removed
    export default function EditResume() {
      return null;
    }
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

*/
export default function EditResume() {
  return null;
}
