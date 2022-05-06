import React, { useEffect } from "react";
import ClearCanvas from "./components/ClearCanvas";
import { useCanvas } from "../../providers/CanvasProvider";

function Board() {
  const { canvasRef, prepareCanvas, startDrawing, finishDrawing, drawNodes } =
    useCanvas();

  useEffect(() => {
    prepareCanvas();
  }, []);

  return (
    <>
      <ClearCanvas />

      <canvas
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onClick={drawNodes}
        ref={canvasRef}
        width="400"
        height="400"
      />
    </>
  );
}

export default Board;
