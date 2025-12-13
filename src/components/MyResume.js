import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getAllResumes, deleteResume } from "./db";
import "./MyResume.css";
import ResumeView from "./ResumeView";
import ConfirmModal from "./ConfirmModal";

const MyResume = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadResumes();
  }, []);

  const loadResumes = async () => {
    try {
      setLoading(true);
      const data = await getAllResumes();
      setResumes(data);
    } catch (error) {
      console.error("Failed to load resumes:", error);
    } finally {
      setLoading(false);
    }
  };

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmTarget, setConfirmTarget] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState("");

  const handleDelete = async (id) => {
    try {
      await deleteResume(id);
      await loadResumes();
    } catch (error) {
      console.error("Failed to delete resume:", error);
    }
  };

  const handleDeleteClick = (id, name) => {
    const pretty = name || "this resume";
    setConfirmTarget(id);
    setConfirmMessage(
      `Are you sure you want to delete "${pretty}"? This action cannot be undone.`
    );
    setConfirmOpen(true);
  };

  const handleConfirm = async () => {
    if (!confirmTarget) {
      setConfirmOpen(false);
      return;
    }
    try {
      await handleDelete(confirmTarget);
    } finally {
      setConfirmOpen(false);
      setConfirmTarget(null);
      setConfirmMessage("");
    }
  };

  const handleEdit = (resume) => {
    navigate("/edit-template", {
      state: {
        resume: resume.content,
        templateId: resume.templateId,
      },
    });
  };

  const viewRef = useRef(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [viewImages, setViewImages] = useState([]);
  const [isGeneratingPreview, setIsGeneratingPreview] = useState(false);
  const [viewResume, setViewResume] = useState(null);

  const handleView = (resume) => {
    setViewResume({ content: resume.content, templateId: resume.templateId });
    setViewOpen(true);
    setViewImages([]);
  };

  useEffect(() => {
    if (!viewOpen || !viewResume || !viewRef.current) return;

    let cancelled = false;

    const generate = async () => {
      setIsGeneratingPreview(true);
      try {
        const html2pdf = (await import("html2pdf.js")).default;
        const element = viewRef.current;

        const opt = {
          margin: 0,
          filename: "preview.pdf",
          image: { type: "jpeg", quality: 1 },
          html2canvas: { scale: 2, useCORS: true, windowWidth: 794 },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
          pagebreak: { mode: ["avoid-all", "css", "legacy"] },
        };

        const pdfBlob = await html2pdf().set(opt).from(element).output("blob");

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

          await page.render({ canvasContext: context, viewport: viewport })
            .promise;

          const imageUrl = canvas.toDataURL("image/png");
          imageUrls.push(imageUrl);
        }

        if (!cancelled) setViewImages(imageUrls);
      } catch (error) {
        console.error("Preview generation error:", error);
        if (!cancelled) setViewImages([]);
      } finally {
        if (!cancelled) setIsGeneratingPreview(false);
      }
    };

    const t = setTimeout(generate, 300);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [viewOpen, viewResume]);

  const formatDate = (timestamp) => {
    if (!timestamp) return "";
    const d = new Date(timestamp);
    const timeStr = d.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const dateStr = d.toLocaleDateString("en-US");

    return (
      <div className="last-modified">
        <div className="lm-time">{timeStr}</div>
        <div className="lm-date">{dateStr}</div>
      </div>
    );
  };

  const escapeHtml = (str) =>
    String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const breakLongWordsHtml = (text, max = 12) => {
    if (!text) return "";
    const escaped = escapeHtml(text);
    return escaped.replace(new RegExp("(\\S{" + max + "})", "g"), "$1<wbr/>");
  };

  if (loading) {
    return (
      <div className="my-resume-container">
        <div className="loading">Loading your resumes...</div>
      </div>
    );
  }

  return (
    <div className="my-resume-container">
      <div className="my-resume-header">
        <h1>My Resumes</h1>
        <button
          className="btn-create"
          onClick={() => navigate("/edit-template")}
        >
          + Create New Resume
        </button>
      </div>

      {resumes.length === 0 ? (
        <div className="empty-state">
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h2>No resumes yet</h2>
          <p>Create your first resume to get started</p>
          <button
            className="btn-primary"
            onClick={() => navigate("/edit-template")}
          >
            Create Resume
          </button>
        </div>
      ) : (
        <div className="table-container">
          <table className="resume-table">
            <thead>
              <tr>
                <th>Resume Name</th>
                <th>Template ID</th>
                <th>Last Modified</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {resumes.map((resume) => (
                <tr key={resume.id}>
                  <td
                    className="resume-name"
                    dangerouslySetInnerHTML={{
                      __html: breakLongWordsHtml(resume.name, 12),
                    }}
                  />
                  <td>{resume.templateId}</td>
                  <td>{formatDate(resume.updatedAt)}</td>
                  <td className="actions">
                    <button
                      className="btn-action btn-edit"
                      onClick={() => handleEdit(resume)}
                      title="Edit"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {/* <span className="btn-text">Edit</span> */}
                    </button>
                    <button
                      className="btn-action btn-view"
                      onClick={() => handleView(resume)}
                      title="View"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 5c5 0 9 4 9 7s-4 7-9 7-9-4-9-7 4-7 9-7z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="2.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                      {/* <span className="btn-text">View</span> */}
                    </button>
                    <button
                      className="btn-action btn-delete"
                      onClick={() => handleDeleteClick(resume.id, resume.name)}
                      title="Delete"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {/* <span className="btn-text">Delete</span> */}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Bootstrap-style Preview modal */}
      {viewOpen && (
        <>
          <div
            className="modal fade show"
            style={{ display: "block" }}
            tabIndex="-1"
            role="dialog"
            aria-modal="true"
          >
            <div
              className="modal-dialog modal-xl modal-dialog-centered"
              role="document"
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Resume Preview</h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setViewOpen(false)}
                  />
                </div>
                <div
                  className="modal-body"
                  style={{ minHeight: 300, background: "#f3f4f6", padding: 20 }}
                >
                  {isGeneratingPreview ? (
                    <div className="loading">Generating preview...</div>
                  ) : viewImages.length > 0 ? (
                    <div className="preview-images">
                      {viewImages.map((src, i) => (
                        <img
                          key={i}
                          src={src}
                          alt={`Page ${i + 1}`}
                          style={{
                            width: "100%",
                            display: "block",
                            marginBottom: i < viewImages.length - 1 ? 12 : 0,
                            border: "1px solid #e5e7eb",
                            borderRadius: 8,
                            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                            background: "#fff",
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="loading">No preview available</div>
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setViewOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" />

          {/* Hidden element used for PDF/image generation */}
          <div style={{ position: "absolute", left: "-9999px", top: 0 }}>
            <div ref={viewRef}>
              <ResumeView
                data={viewResume?.content}
                editable={false}
                forPrint={true}
                isPreview={true}
                templateId={viewResume?.templateId || 1}
              />
            </div>
          </div>
        </>
      )}

      {/* Universal confirmation modal */}
      <ConfirmModal
        show={confirmOpen}
        title="Delete Resume"
        message={confirmMessage}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirm}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
};

export default MyResume;
