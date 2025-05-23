import React, { useEffect, useRef, useState, useCallback } from "react";
import hubMap from "../assets/hub_map.png";
import forestMap from "../assets/dna_forest.png";
import labMap from "../assets/dna_lab.png";
import playerImg from "../assets/player.png";

const GameCanvas = ({ scene, onSceneChange }) => {
  const canvasRef = useRef(null);
  const [images, setImages] = useState({});
  const [player, setPlayer] = useState({ x: 400, y: 300 });
  const keys = useRef({});
  const speed = 4;

  const getCollisionAreas = useCallback(() => {
    if (scene === "hub") {
      return [{ x: 320, y: 80, width: 160, height: 60, nextScene: "dna_forest" }];
    } else if (scene === "dna_forest") {
      return [{ x: 350, y: 440, width: 100, height: 100, nextScene: "dna_lab" }];
    }
    return [];
  }, [scene]);

  const checkCollisions = useCallback(
    (x, y) => {
      for (const area of getCollisionAreas()) {
        if (
          x < area.x + area.width &&
          x + 40 > area.x &&
          y < area.y + area.height &&
          y + 40 > area.y
        ) {
          onSceneChange(area.nextScene);
          return true;
        }
      }
      return false;
    },
    [getCollisionAreas, onSceneChange]
  );

  const updatePosition = useCallback(() => {
    let dx = 0,
      dy = 0;
    if (keys.current["ArrowUp"]) dy -= speed;
    if (keys.current["ArrowDown"]) dy += speed;
    if (keys.current["ArrowLeft"]) dx -= speed;
    if (keys.current["ArrowRight"]) dx += speed;
  
    if (dx !== 0 || dy !== 0) {
      const newX = Math.max(0, Math.min(800 - 40, player.x + dx));
      const newY = Math.max(0, Math.min(600 - 40, player.y + dy));
      if (!checkCollisions(newX, newY)) {
        setPlayer((prev) => ({ x: newX, y: newY }));
      }
    }
  }, [player, checkCollisions]);

  const drawScene = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log("Current scene:", scene);
    if (images[scene]) ctx.drawImage(images[scene], 0, 0, 800, 600);
    if (scene !== "dna_lab" && images["player"]) {
      ctx.drawImage(images["player"], player.x, player.y, 40, 40);
    }
    if (scene === "dna_forest") {
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.fillRect(5, 550, 120, 30);
      ctx.fillStyle = "black";
      ctx.font = "16px Arial";
      ctx.fillText("Back to Hub", 20, 570);
    }
  }, [images, player, scene]);

  useEffect(() => {
    const loaded = {};
    const loadImg = (name, src) => {
      return new Promise((res, rej) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          console.log(`Loaded image: ${name}`);
          loaded[name] = img;
          res();
        };
        img.onerror = (err) => {
          console.error(`Failed to load image: ${name}`, err);
          rej(err);
        };
      });
    };
  
    Promise.all([
      loadImg("hub", hubMap),
      loadImg("dna_forest", forestMap),
      loadImg("dna_lab", labMap),
      loadImg("player", playerImg),
    ])
      .then(() => setImages(loaded))
      .catch((e) => console.error("Image loading failed", e));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      updatePosition();
      drawScene();
    }, 1000 / 60);
    return () => clearInterval(interval);
  }, [updatePosition, drawScene]);

  useEffect(() => {
    const handleKeyDown = (e) => (keys.current[e.key] = true);
    const handleKeyUp = (e) => (keys.current[e.key] = false);
    const handleClick = (e) => {
      if (scene === "dna_forest") {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        if (x >= 5 && x <= 125 && y >= 550 && y <= 580) {
          onSceneChange("hub");
        }
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("click", handleClick);
    };
  }, [scene, onSceneChange]);

  return (
    <div
      style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}
    >
      <canvas ref={canvasRef} width={800} height={600} style={{ border: "2px solid white" }} />
    </div>
  );
};

export default GameCanvas;
