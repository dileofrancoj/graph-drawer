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
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
    setCoords({ ...coords, initialX: offsetX, initialY: offsetY });
  };

  const finishDrawing = () => {
    contextRef.current.closePath();

    setIsDrawing(false);
  };

  const drawNodes = () => {
    contextRef.current.beginPath();
    contextRef.current.arc(
      coords.initialX,
      coords.initialY,
      30,
      0,
      2 * Math.PI
    );
    contextRef.current.font = "20px Arial";
    const createdNode = createNode();
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
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => useContext(CanvasContext);
