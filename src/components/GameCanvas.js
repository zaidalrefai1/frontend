import React, { useState, useEffect } from "react";
import hubMap from "../assets/hub_map.png";
import forestMap from "../assets/dna_forest.png";
import playerImg from "../assets/player.png";

const GameCanvas = ({ scene, onSceneChange }) => {
  const [position, setPosition] = useState({ top: 50, left: 50 });

  const handleKeyDown = (e) => {
    setPosition((prev) => {
      let { top, left } = prev;
      if (e.key === "ArrowUp" || e.key === "w") top -= 2;
      if (e.key === "ArrowDown" || e.key === "s") top += 2;
      if (e.key === "ArrowLeft" || e.key === "a") left -= 2;
      if (e.key === "ArrowRight" || e.key === "d") left += 2;
      return { top: Math.max(0, Math.min(100, top)), left: Math.max(0, Math.min(100, left)) };
    });
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const bg = scene === "hub" ? hubMap : forestMap;

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
      {/* Background */}
      <img src={bg} alt="scene" style={{ width: "100%", height: "100%", objectFit: "cover" }} />

      {/* Player avatar */}
      <img
        src={playerImg}
        alt="player"
        style={{
          position: "absolute",
          top: `${position.top}%`,
          left: `${position.left}%`,
          transform: "translate(-50%, -50%)",
          width: "40px",
        }}
      />

      {/* Hitboxes */}
      {scene === "hub" && (
        <div
          onClick={() => onSceneChange("dna_forest")}
          style={{
            position: "absolute",
            left: "80%",
            top: "80%",
            width: "50px",
            height: "50px",
            cursor: "pointer",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          }}
          title="Go to DNA Forest"
        />
      )}

      {scene === "dna_forest" && (
        <div
          onClick={() => onSceneChange("dna_lab")}
          style={{
            position: "absolute",
            left: "10%",
            top: "10%",
            width: "50px",
            height: "50px",
            cursor: "pointer",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          }}
          title="Go to DNA Lab"
        />
      )}
    </div>
  );
};

export default GameCanvas;
