import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";
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
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    const fetchResumes = async () => {
      try {
        if (currentUser) {
          const querySnapshot = await getDocs(
            collection(db, "users", currentUser.uid, "resumes")
          );
          const resumes = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setItems(resumes);
        } else {
          const resumes = await getAllResumes();
          setItems(resumes);
        }
      } catch (error) {
        console.error("Error fetching resumes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchResumes();
  }, [isOpen, currentUser]);

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
                    Template #{item.templateId} · Created{" "}
                    {new Date(item.createdAt).toLocaleString()}
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
                    onClick={() => setDeleteConfirm(item)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {deleteConfirm && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1001,
          }}
          onClick={() => setDeleteConfirm(null)}
        >
          <div
            style={{
              background: "var(--bg-primary)",
              borderRadius: 8,
              width: "min(400px, 90vw)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                padding: "16px 20px",
                borderBottom: "1px solid var(--border-light)",
              }}
            >
              <h5 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>
                Confirm Delete
              </h5>
            </div>
            <div style={{ padding: "20px" }}>
              <p style={{ margin: 0, color: "var(--text-primary)" }}>
                Are you sure you want to delete "{deleteConfirm.name}"? This
                action cannot be undone.
              </p>
            </div>
            <div
              style={{
                padding: "12px 20px",
                borderTop: "1px solid var(--border-light)",
                display: "flex",
                justifyContent: "flex-end",
                gap: 10,
              }}
            >
              <button
                style={{
                  ...button,
                  background: "var(--gray-200)",
                  color: "var(--text-primary)",
                }}
                onClick={() => setDeleteConfirm(null)}
              >
                Cancel
              </button>
              <button
                style={{
                  ...button,
                  background: "var(--error)",
                  color: "var(--text-inverse)",
                }}
                onClick={async () => {
                  try {
                    if (currentUser) {
                      await deleteDoc(
                        doc(
                          db,
                          "users",
                          currentUser.uid,
                          "resumes",
                          deleteConfirm.id
                        )
                      );
                      const querySnapshot = await getDocs(
                        collection(db, "users", currentUser.uid, "resumes")
                      );
                      const resumes = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                      }));
                      setItems(resumes);
                    } else {
                      await deleteResume(deleteConfirm.id);
                      const resumes = await getAllResumes();
                      setItems(resumes);
                    }
                    setDeleteConfirm(null);
                  } catch (error) {
                    console.error("Error deleting resume:", error);
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
