import React from "react";

function DNAForest({ onEnterLab, onBack }) {
  return (
    <div
      style={{
        backgroundColor: "#112",
        color: "white",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Welcome to DNA Forest</h1>
      <button onClick={onEnterLab} style={{ fontSize: "18px", margin: "10px" }}>
        Enter DNA Lab
      </button>
      <button onClick={onBack} style={{ fontSize: "18px", margin: "10px" }}>
        Back to Hub
      </button>
    </div>
  );
}

export default DNAForest;