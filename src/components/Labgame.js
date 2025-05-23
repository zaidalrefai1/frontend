import React from "react";

const Labgame = ({ onExit }) => {
  return (
    <div
      style={{
        backgroundColor: "#111",
        color: "white",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>DNA Lab Mini-Game</h1>
      <button
        onClick={onExit}
        style={{
          fontSize: "20px",
          marginTop: "20px",
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        Back to Hub
      </button>
    </div>
  );
};

export default Labgame;
