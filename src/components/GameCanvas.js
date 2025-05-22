import React from "react";
import hubMap from "../assets/hub_map.png";
import forestMap from "../assets/dna_forest.png";
import playerImg from "../assets/player.png";

const GameCanvas = ({ scene, onSceneChange }) => {
  const bg = scene === "hub" ? hubMap : forestMap;

  return (
    <div style={{ position: "relative", width: "800px", height: "600px" }}>
      <img src={bg} alt="scene" style={{ width: "100%", height: "100%" }} />
      <img
        src={playerImg}
        alt="player"
        style={{ position: "absolute", top: "50%", left: "50%", width: "40px" }}
      />
      <button
        onClick={() => onSceneChange("dna_lab")}
        style={{
          position: "absolute",
          bottom: 20,
          left: 20,
          padding: "10px",
          fontSize: "16px",
        }}
      >
        Enter DNA Lab
      </button>
    </div>
  );
};

export default GameCanvas;
