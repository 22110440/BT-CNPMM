import React from "react";

export default function Modal({ show, onClose, children }) {
  if (!show) return null;

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.5)", display: "flex",
      justifyContent: "center", alignItems: "center"
    }}>
      <div style={{ background: "#fff", padding: "20px", borderRadius: "8px" }}>
        {children}
        <button onClick={onClose} style={{ marginTop: "10px" }}>Đóng</button>
      </div>
    </div>
  );
}
