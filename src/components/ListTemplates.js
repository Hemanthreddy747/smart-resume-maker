import React, { useState } from "react";
import dummyTemplates from "./dummyTemplates";

const ListTemplates = ({ onOpenSaved, onSelectTemplate, renderPreview }) => {
  const [activeTab, setActiveTab] = useState("experienced");

  const getYearsFromSummary = (summary) => {
    if (!summary) return null;
    const m = summary.match(/(\d+)\+?\s*years?/i);
    if (m) return parseInt(m[1], 10);
    return null;
  };

  const fresherTemplates = dummyTemplates.filter((t) => {
    const years = getYearsFromSummary(t.content && t.content.summary);
    return years !== null ? years < 3 : false;
  });

  const experiencedTemplates = dummyTemplates.filter((t) => {
    const years = getYearsFromSummary(t.content && t.content.summary);
    return years !== null ? years >= 3 : true; // default to experienced when unknown
  });

  const templatesToShow =
    activeTab === "fresher" ? fresherTemplates : experiencedTemplates;

  return (
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
          gap: 10,
          marginBottom: 16,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button
              onClick={() => setActiveTab("experienced")}
              style={{
                padding: "8px 12px",
                borderRadius: 8,
                border:
                  activeTab === "experienced"
                    ? "2px solid var(--primary-500)"
                    : "1px solid #e5e7eb",
                background: activeTab === "experienced" ? "#eef2ff" : "#fff",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Experienced Templates
            </button>
            <button
              onClick={() => setActiveTab("fresher")}
              style={{
                padding: "8px 12px",
                borderRadius: 8,
                border:
                  activeTab === "fresher"
                    ? "2px solid var(--primary-500)"
                    : "1px solid #e5e7eb",
                background: activeTab === "fresher" ? "#eef2ff" : "#fff",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Fresher Templates
            </button>
          </div>

          <h3
            style={{
              fontSize: "clamp(18px, 3.5vw, 22px)",
              fontWeight: 600,
              color: "var(--text-primary)",
              margin: 0,
              textAlign: "left",
            }}
          >
            Select a Resume Template
          </h3>
        </div>

        <button
          style={{
            padding: "8px 14px",
            background: "var(--primary-500)",
            color: "var(--text-inverse)",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            fontSize: "clamp(14px, 2.5vw, 15px)",
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}
          onClick={onOpenSaved}
        >
          Open My Saved Resumes
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 400px))",
          gap: "clamp(12px, 2vw, 24px)",
          margin: "20px 0",
          maxWidth: 1800,
          marginLeft: "auto",
          marginRight: "auto",
          justifyContent: "center",
        }}
      >
        {templatesToShow.length === 0 ? (
          <div style={{ gridColumn: "1/-1", textAlign: "center", padding: 40 }}>
            <p style={{ margin: 0, color: "#6b7280" }}>
              No templates found for this category.
            </p>
            <div style={{ marginTop: 12 }}>
              <button
                onClick={() => setActiveTab("experienced")}
                style={{
                  padding: "8px 12px",
                  borderRadius: 6,
                  border: "none",
                  background: "var(--primary-500)",
                  color: "var(--text-inverse)",
                  cursor: "pointer",
                }}
              >
                View Experienced Templates
              </button>
            </div>
          </div>
        ) : (
          templatesToShow.map((t) => (
            <div
              key={t.id}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: 10,
                padding: 0,
                background: "#fff",
                cursor: "pointer",
                boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
                transition:
                  "box-shadow 0.2s, border-color 0.2s, background-color 0.2s, transform 0.2s",
                overflow: "hidden",
              }}
              onClick={() => onSelectTemplate(t.id)}
              onMouseOver={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 0 2px rgba(11,95,255,0.35), 0 6px 16px rgba(0,0,0,0.12)";
                e.currentTarget.style.borderColor = "var(--primary-500)";
                e.currentTarget.style.background = "#f8fafc";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.boxShadow = "0 1px 2px rgba(0,0,0,0.06)";
                e.currentTarget.style.borderColor = "#e5e7eb";
                e.currentTarget.style.background = "#fff";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {renderPreview(t)}
              <div
                style={{
                  padding: "10px 14px",
                  background: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderTop: "1px solid #e5e7eb",
                }}
              >
                <span style={{ color: "#111827", fontWeight: 600 }}>
                  {t.name}
                </span>
                <span style={{ color: "var(--primary-500)", fontWeight: 600 }}>
                  Use →
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ListTemplates;
