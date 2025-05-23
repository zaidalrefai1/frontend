import React, { useEffect, useState } from "react";
import GameCanvas from "./components/GameCanvas";
import LabGame from "./components/Labgame";
import { fetchGameState, updateLocation } from "./api";

function App() {
  const [scene, setScene] = useState("loading");
  const [gameState, setGameState] = useState(null);

  useEffect(() => {
    fetchGameState()
      .then((res) => {
        setGameState(res.data);
        setScene(res.data.scene);
      })
      .catch((err) => {
        console.error("Failed to load game state:", err);
        alert("Failed to load game state.");
      });
  }, []);
  
  const goToScene = (newScene) => {
    setScene(newScene);
    updateLocation(newScene);
  };

  if (!gameState) return <div style={{ color: "white" }}>Loading...</div>;

  if (scene === "dna_lab") {
    return <LabGame onExit={() => goToScene("hub")} />;
  }

  return <GameCanvas scene={scene} onSceneChange={goToScene} />;
}

export default App;
