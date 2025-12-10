import React, { useState, useRef, useEffect } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import dummyTemplates from "./dummyTemplates";
import "./TemplateStyles.css";
import SavedResumesModal from "./SavedResumesModal";
import ListTemplates from "./ListTemplates";
import { saveResume } from "./db";
import ResumeView from "./ResumeView";

import EnhanceAIButton from "./EnhanceAIButton";
import MatchWithJobButton from "./MatchWithJobButton";
import { showSuccess, showError } from "./Toasts";

// ResumeView moved to ./ResumeView

const EditTemplate = () => {
  const [selected, setSelected] = useState(null);
  const [resume, setResume] = useState(null);
  const printRef = useRef(null);
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [isSavedModalOpen, setSavedModalOpen] = useState(false);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState(null);
  const [pdfImageUrls, setPdfImageUrls] = useState([]);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const navigate = useNavigate();

  // Auto-select template when arriving via /edit-template?template=<id>
  useEffect(() => {
    // If navigation state contains a resume, prefer it
    const state = location.state;
    if (state?.resume && state?.templateId) {
      setSelected(state.templateId);
      setResume({ ...state.resume });
      return;
    }
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
  }, [searchParams, location.state]);

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
      showError("Please install html2pdf.js: npm install html2pdf.js");
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
      showError("Please install html2pdf.js: npm install html2pdf.js");
      console.error("PDF generation error:", error);
    }
  };

  return (
    <>
      {!selected && (
        <ListTemplates
          onOpenSaved={() => setSavedModalOpen(true)}
          onSelectTemplate={(id) => navigate(`/edit-template?template=${id}`)}
          renderPreview={(t) => (
            <div
              style={{
                padding: 0,
                maxHeight: 520,
                overflow: "hidden",
                position: "relative",
                background: "#fff",
              }}
            >
              <div
                style={{
                  transform: "scale(0.5)",
                  transformOrigin: "top left",
                  width: "200%",
                  height: "200%",
                }}
              >
                <ResumeView
                  data={t.content}
                  editable={false}
                  isPreview={true}
                  templateId={t.id}
                />
              </div>
            </div>
          )}
        />
      )}

      {selected && resume && (
        <div
          style={{
            padding: "clamp(12px, 2.5vw, 28px)",
            background: "#1a2335ff",
            backgroundAttachment: "fixed",
            minHeight: "100vh",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: window.innerWidth <= 1024 ? "column" : "row",
              gap: "clamp(16px, 3vw, 16px)",
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
                  padding: 8,
                  borderRadius: 8,
                  marginBottom: 12,
                  display: "flex",
                  alignItems: "center",
                  minHeight: 80,
                }}
              >
                <h4
                  style={{
                    margin: 0,
                    fontSize: "clamp(16px, 2.5vw, 20px)",
                    fontWeight: 600,
                    color: "#333",
                  }}
                >
                  Edit Resume
                </h4>
                <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
                  <EnhanceAIButton
                    onClick={() =>
                      showSuccess("Enhance  with AI - feature coming soon")
                    }
                  />
                  <MatchWithJobButton
                    onClick={() =>
                      showSuccess(
                        "Match with Job Description - feature coming soon"
                      )
                    }
                  />
                </div>
              </div>
              <div
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: 8,
                  overflow: "hidden",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
                  background: "#fff",
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
                // flex: window.innerWidth <= 1024 ? "1" : "0 0 45%",
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
                  minHeight: 80,
                }}
              >
                <h4
                  style={{
                    margin: 0,
                    fontSize: "clamp(16px, 2.5vw, 20px)",
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
                        showSuccess("Resume saved to browser.");
                      } catch (e) {
                        console.error(e);
                        showError("Failed to save resume.");
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
                  border: "1px solid #e5e7eb",
                  borderRadius: 8,
                  overflow: "hidden",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
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
                      padding: "12px",
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
                            index < pdfImageUrls.length - 1 ? "12px" : "0",
                          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.15)",
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  !isGeneratingPdf && (
                    <div
                      style={{
                        color: "#444",
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
