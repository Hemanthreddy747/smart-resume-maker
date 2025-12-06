import React, { useEffect, useState } from "react";
import { getAllResumes, deleteResume } from "./db";

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.35)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const modalStyle = {
  background: "var(--bg-primary)",
  borderRadius: 12,
  width: "min(720px, 90vw)",
  boxShadow: "var(--shadow-lg)",
  overflow: "hidden",
};

const headerStyle = {
  padding: "12px 16px",
  borderBottom: "1px solid var(--border-light)",
  background: "var(--bg-tertiary)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const listStyle = {
  maxHeight: "60vh",
  overflowY: "auto",
};

const itemStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "12px 16px",
  borderBottom: "1px solid var(--border-light)",
};

const button = {
  padding: "8px 12px",
  borderRadius: 6,
  border: "none",
  cursor: "pointer",
  fontSize: "clamp(12px, 2.5vw, 13px)",
  fontWeight: 600,
};

export default function SavedResumesModal({ isOpen, onClose, onOpenResume }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    getAllResumes()
      .then((res) => setItems(res))
      .finally(() => setLoading(false));
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div style={headerStyle}>
          <h4 style={{ margin: 0 }}>Saved Resumes</h4>
          <button
            style={{
              ...button,
              background: "var(--gray-600)",
              color: "var(--text-inverse)",
            }}
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <div style={listStyle}>
          {loading && <div style={{ padding: 16 }}>Loading...</div>}
          {!loading && items.length === 0 && (
            <div style={{ padding: 16, color: "var(--text-secondary)" }}>
              No saved resumes yet.
            </div>
          )}
          {!loading &&
            items.map((item) => (
              <div key={item.id} style={itemStyle}>
                <div>
                  <div style={{ fontWeight: 600 }}>{item.name}</div>
                  <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>
                    Template #{item.templateId} · Updated{" "}
                    {new Date(item.updatedAt).toLocaleString()}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    style={{
                      ...button,
                      background: "var(--primary-500)",
                      color: "var(--text-inverse)",
                    }}
                    onClick={() => onOpenResume(item)}
                  >
                    Open
                  </button>
                  <button
                    style={{
                      ...button,
                      background: "var(--error)",
                      color: "var(--text-inverse)",
                    }}
                    onClick={async () => {
                      await deleteResume(item.id);
                      const res = await getAllResumes();
                      setItems(res);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
