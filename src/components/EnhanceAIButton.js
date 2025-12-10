import React from "react";

const EnhanceAIButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 12px",
        background: "var(--primary-500)",
        color: "var(--text-inverse)",
        border: "none",
        borderRadius: 6,
        cursor: "pointer",
        fontSize: "clamp(12px, 2.2vw, 13px)",
        fontWeight: 600,
        whiteSpace: "nowrap",
      }}
      title="Enhance  with AI"
    >
      Enhance with AI
    </button>
  );
};

export default EnhanceAIButton;
