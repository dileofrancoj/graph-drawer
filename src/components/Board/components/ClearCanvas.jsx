import React from "react";
import { useCanvas } from "../../../providers/CanvasProvider";
import { useNodes } from "../../../providers/NodesProvider";

const ClearCanvasButton = () => {
  const { clearCanvas } = useCanvas();
  const { deleteAllNodes } = useNodes();

  const handleClick = () => {
    deleteAllNodes();
    clearCanvas();
  };
  return <button onClick={handleClick}>❌ Borrar ❌</button>;
};

export default ClearCanvasButton;
