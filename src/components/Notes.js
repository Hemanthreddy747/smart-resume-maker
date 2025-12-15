import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { MdDelete } from "react-icons/md";
import "./Notes.css";

const Notes = () => {
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, "notes"),
      where("userId", "==", currentUser.uid),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const notesData = [];
      querySnapshot.forEach((doc) => {
        notesData.push({ id: doc.id, ...doc.data() });
      });
      setNotes(notesData);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!heading.trim() || !content.trim()) return;

    try {
      await addDoc(collection(db, "notes"), {
        userId: currentUser.uid,
        heading: heading.trim(),
        content: content.trim(),
        timestamp: new Date(),
      });
      setHeading("");
      setContent("");
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "notes", id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const columns = [
    {
      accessorKey: "heading",
      header: "Heading",
    },
    {
      accessorKey: "content",
      header: "Content",
    },
    {
      accessorKey: "timestamp",
      header: "Date & Time",
      cell: ({ getValue, row }) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>
            {getValue().toDate().toLocaleString("en-GB", { hour12: false })}
          </span>
          <button
            onClick={() => handleDelete(row.original.id)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "red",
            }}
          >
            <MdDelete size={24} />
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: notes,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="notes-container">
      <h1>Notes</h1>
      <form onSubmit={handleAddNote} className="notes-form">
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
        <button type="submit">Add Note</button>
      </form>
      <div className="notes-table-container">
        <table className="notes-table">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length}>No notes found.</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="pagination">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </button>
          <span>
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notes;
