import "./App.css";
import { FileAddOutlined } from "@ant-design/icons";

import TabsAbove from "../components/tabs";
import CodeEditor from "../components/codeEditor";
import ShowFiles from "../components/fileManager";
import AddFileModal from "../components/AddFileModal";

import { useEditor } from "./context/EditorContext";

function App() {
  const { activeFile, openAddFileModal } = useEditor();

  if (!activeFile) return null;

  return (
    <div className="container">
      <div className="listOfFiles">
        <div className="explorer">
          <span>Explorer</span>
          <div onClick={openAddFileModal}>
            <FileAddOutlined className="addNewBtn" />
          </div>
        </div>

        <hr />

        <ShowFiles />
      </div>

      <div className="right">
        <TabsAbove />
        <CodeEditor />
      </div>

      <AddFileModal />
    </div>
  );
}

export default App;
