import React from "react";
import { nanoid } from "nanoid";

const NodesContext = React.createContext();
const { Provider } = NodesContext;
export const NodesProvider = ({ children }) => {
  const [nodes, setNodes] = React.useState([]);

  const createNode = () => {
    const id = nanoid();
    const [randomCharacter] =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    const createdNode = { id, name: randomCharacter.toUpperCase() };

    setNodes([...nodes, createdNode]);
    console.log(nodes);
    return createdNode;
  };

  const deleteAllNodes = () => {
    setNodes([]);
  };

  return (
    <Provider value={{ nodes, createNode, deleteAllNodes }}>
      {children}
    </Provider>
  );
};

export const useNodes = () => {
  const context = React.useContext(NodesContext);
  if (!context) throw new Error("useNodes must be used with in NodesContext");
  return context;
};
