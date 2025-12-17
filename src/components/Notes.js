import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { MdDelete } from "react-icons/md";
import "./Notes.css";
import LoginModal from "./LoginModal";

const Notes = () => {
  const { currentUser } = useAuth();
  const [notes, setNotes] = useState([]);
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editHeading, setEditHeading] = useState("");
  const [editContent, setEditContent] = useState("");
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, `users/${currentUser.uid}/notes`),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const notesData = [];
      querySnapshot.forEach((doc) => {
        notesData.push({ id: doc.id, ...doc.data() });
      });
      setNotes(notesData);
    });

    return unsubscribe;
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      setShowLogin(true);
      return;
    }
    if (!heading.trim() || !content.trim()) return;

    setLoading(true);
    try {
      await addDoc(collection(db, `users/${currentUser.uid}/notes`), {
        heading: heading.trim(),
        content: content.trim(),
        timestamp: new Date(),
      });
      setHeading("");
      setContent("");
    } catch (error) {
      console.error("Error adding note:", error);
    }
    setLoading(false);
  };

  const handleEdit = (note) => {
    setEditingId(note.id);
    setEditHeading(note.heading);
    setEditContent(note.content);
  };

  const handleSaveEdit = async (id) => {
    if (!currentUser) {
      setShowLogin(true);
      return;
    }
    if (!editHeading.trim() || !editContent.trim()) return;

    try {
      await updateDoc(doc(db, `users/${currentUser.uid}/notes`, id), {
        heading: editHeading.trim(),
        content: editContent.trim(),
      });
      setEditingId(null);
      setEditHeading("");
      setEditContent("");
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditHeading("");
    setEditContent("");
  };

  const handleDelete = async (id) => {
    if (!currentUser) {
      setShowLogin(true);
      return;
    }
    try {
      await deleteDoc(doc(db, `users/${currentUser.uid}/notes`, id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="notes-container">
      <h1>Notes</h1>
      <form onSubmit={handleSubmit} className="note-form">
        <input
          type="text"
          placeholder="Heading"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Add Note"}
        </button>
      </form>
      <div className="table-responsive">
        <table className="notes-table">
          <thead>
            <tr>
              <th>Heading</th>
              <th>Content</th>
              <th>Date & Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note) => (
              <tr key={note.id}>
                <td>
                  {editingId === note.id ? (
                    <input
                      type="text"
                      value={editHeading}
                      onChange={(e) => setEditHeading(e.target.value)}
                    />
                  ) : (
                    note.heading
                  )}
                </td>
                <td>
                  {editingId === note.id ? (
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                    />
                  ) : (
                    note.content
                  )}
                </td>
                <td>
                  {new Date(note.timestamp.seconds * 1000).toLocaleString()}
                </td>
                <td>
                  {editingId === note.id ? (
                    <>
                      <button onClick={() => handleSaveEdit(note.id)}>
                        Save
                      </button>
                      <button onClick={handleCancelEdit}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(note)}>Edit</button>
                      <button
                        onClick={() => handleDelete(note.id)}
                        title="Delete"
                      >
                        <MdDelete />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <LoginModal
        show={showLogin}
        onClose={() => setShowLogin(false)}
        onLoginSuccess={() => setShowLogin(false)}
      />
    </div>
  );
};

export default Notes;
