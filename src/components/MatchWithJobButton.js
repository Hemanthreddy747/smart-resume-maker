import React from "react";

const MatchWithJobButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 12px",
        background: "#0ea5e9",
        color: "#ffffff",
        border: "none",
        borderRadius: 6,
        cursor: "pointer",
        fontSize: "clamp(12px, 2.2vw, 13px)",
        fontWeight: 600,
        whiteSpace: "nowrap",
      }}
      title="Match with job description"
    >
      Match with Job Description
    </button>
  );
};

export default MatchWithJobButton;
