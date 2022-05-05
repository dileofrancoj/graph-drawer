import React, { useEffect } from "react";
import { useCanvas } from "../providers/CanvasProvider";

function Canvas() {
  const { canvasRef, prepareCanvas, startDrawing, finishDrawing, drawNodes } =
    useCanvas();

  useEffect(() => {
    prepareCanvas();
  }, []);

  return (
    <canvas
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onClick={drawNodes}
      ref={canvasRef}
      width="100%"
      height="90vh"
    />
  );
}

export default Canvas;
