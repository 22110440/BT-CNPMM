import React from "react";

export default function Button({ label, onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        padding: "8px 16px",
        background: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        margin: "4px",
        cursor: "pointer"
      }}
    >
      {label}
    </button>
  );
}
