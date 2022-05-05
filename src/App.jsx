import Board from "./components/Board";
import Canvas from "./components/Canvas";
import { ClearCanvasButton } from "./components/ClearCanvas";
import { CanvasProvider } from "./providers/CanvasProvider";
import { NodesProvider } from "./providers/NodesProvider";

function App() {
  return (
    <NodesProvider>
      <CanvasProvider>
        <Board />
      </CanvasProvider>
    </NodesProvider>
  );
}

export default App;
