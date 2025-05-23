import React from "react";

const LabGame = ({ onExit }) => {
  return (
    <div
      style={{
        backgroundColor: "#111",
        color: "white",
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>DNA Lab Mini-Game</h1>
      <button onClick={onExit} style={{ fontSize: "20px", marginTop: "20px" }}>
        Exit to Hub
      </button>
    </div>
  );
};

export default LabGame;
