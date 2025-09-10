import React from "react";

export default function Card({ children }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "12px",
        background: "#fff"
      }}
    >
      {children}
    </div>
  );
}
