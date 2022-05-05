import React from "react";
import { useCanvas } from "../providers/CanvasProvider";

export const ClearCanvasButton = () => {
  const { clearCanvas } = useCanvas();

  return <button onClick={clearCanvas}>❌ Clear ❌</button>;
};
