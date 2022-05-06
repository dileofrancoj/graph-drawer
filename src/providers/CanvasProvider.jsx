import React, { useContext, useRef, useState } from "react";
import { useNodes } from "./NodesProvider";

const CanvasContext = React.createContext();

export const CanvasProvider = ({ children }) => {
  const { createNode } = useNodes();

  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [coords, setCoords] = useState({
    initialX: 0,
    finalX: 0,
    initialY: 0,
    finalY: 0,
  });

  const prepareCanvas = () => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;
    contextRef.current = context;
  };

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    setCoords({ ...coords, initialX: offsetX, initialY: offsetY });
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = (type) => {
    if (type === "node") return drawNodes();
    return drawLine();
  };

  const drawLine = () => {
    contextRef.current.lineWidth = 1;
    contextRef.current.strokeStyle = "#f00";

    contextRef.current.beginPath();
    contextRef.current.moveTo(coords.initialX, coords.initialY);
    contextRef.current.lineTo(coords.finalX, coords.finalY);
    contextRef.current.stroke();
  };

  const drawNodes = () => {
    const createdNode = createNode();
    contextRef.current.beginPath();
    contextRef.current.arc(
      coords.initialX,
      coords.initialY,
      30,
      0,
      2 * Math.PI
    );
    contextRef.current.font = "20px Arial";

    contextRef.current.fillText(
      createdNode.name,
      coords.initialX - 6,
      coords.initialY + 7
    );
    contextRef.current.stroke();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <CanvasContext.Provider
      value={{
        canvasRef,
        contextRef,
        prepareCanvas,
        startDrawing,
        finishDrawing,
        clearCanvas,
        drawNodes,
        draw,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => useContext(CanvasContext);
