import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllResumes, deleteResume } from "./db";
import "./MyResume.css";

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

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this resume?")) {
      try {
        await deleteResume(id);
        await loadResumes();
      } catch (error) {
        console.error("Failed to delete resume:", error);
      }
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

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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
                  <td className="resume-name">{resume.name}</td>
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
                      Edit
                    </button>
                    <button
                      className="btn-action btn-delete"
                      onClick={() => handleDelete(resume.id)}
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
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyResume;
