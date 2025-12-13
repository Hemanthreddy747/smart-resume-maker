import React from "react";
import { useNavigate } from "react-router-dom";
import dummyTemplates from "./dummyTemplates";
import ResumeView from "./ResumeView";

const TemplatesPreview = () => {
  const navigate = useNavigate();
  const templates = dummyTemplates.slice(0, 3); // Get first 3 templates

  const handleSelectTemplate = (id) => {
    navigate(`/edit-template?template=${id}`);
  };

  return (
    <section
      className="templates-preview-section"
      style={{ padding: "60px 0", background: "#fff" }}
    >
      <div className="container">
        <h2
          style={{
            textAlign: "center",
            marginBottom: "40px",
            fontSize: "2.5rem",
            fontWeight: "bold",
          }}
        >
          Choose from Professional Templates
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "30px",
          }}
        >
          {templates.map((template) => (
            <div
              key={template.id}
              className="template-card"
              style={{
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                overflow: "hidden",
                position: "relative",
                transition: "box-shadow 0.3s, border-color 0.3s",
                cursor: "pointer",
              }}
              onClick={() => handleSelectTemplate(template.id)}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
                e.currentTarget.style.borderColor = "#007bff";
                const button = e.currentTarget.querySelector(".choose-btn");
                if (button) button.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "#e0e0e0";
                const button = e.currentTarget.querySelector(".choose-btn");
                if (button) button.style.opacity = "0";
              }}
            >
              <div style={{ height: "500px", overflow: "hidden" }}>
                <div
                  style={{
                    transform: "scale(0.7)",
                    transformOrigin: "top left",
                    width: "142.86%",
                    height: "142.86%",
                  }}
                >
                  <ResumeView
                    data={template.content}
                    editable={false}
                    isPreview={true}
                    templateId={template.id}
                  />
                </div>
              </div>
              <div style={{ padding: "20px", textAlign: "center" }}>
                <h3
                  style={{ margin: 0, fontSize: "1.2rem", fontWeight: "600" }}
                >
                  {template.name}
                </h3>
              </div>
              <button
                className="btn choose-btn"
                style={{
                  position: "absolute",
                  bottom: "80px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  opacity: 0,
                  transition: "opacity 0.3s",
                  padding: "10px 20px",
                  fontSize: "0.9rem",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "25px",
                  cursor: "pointer",
                }}
                onClick={() => handleSelectTemplate(template.id)}
              >
                Choose this template
              </button>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <button
            className="btn"
            onClick={() => navigate("/list-templates")}
            style={{
              padding: "12px 24px",
              fontSize: "1rem",
              backgroundColor: "white",
              color: "#007bff",
              border: "1px solid #007bff",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            View All Templates
          </button>
        </div>
      </div>
    </section>
  );
};

export default TemplatesPreview;
