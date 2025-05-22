import React from "react";

const DNATile = ({ base }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", base);
  };

  return (
    <div
      className="tile"
      draggable
      onDragStart={handleDragStart}
      style={{
        margin: "10px",
        padding: "20px",
        backgroundColor: "lightblue",
        border: "2px solid #333",
        borderRadius: "10px",
        cursor: "grab",
      }}
    >
      {base}
    </div>
  );
};

export default DNATile;
