import "./App.css";
import filesData from "./data/files";
import { useState, useEffect } from "react";

import TabsAbove from "../components/tabs";
import CodeEditor from "../components/codeEditor";
import ShowFiles from "../components/fileManager";

import { createFile } from "./utils/addFileFunction";
import { removeFile } from "./utils/deleteFileFunction";
import { FileAddOutlined } from "@ant-design/icons";

interface FileItem {
  name: string;
  language: string;
  value: string;
}

// localStorage
const FILES_KEY = "editor-files";
const ACTIVE_FILE_KEY = "active-file";

const loadFiles = (): Record<string, FileItem> => {
  const saved = localStorage.getItem(FILES_KEY);
  return saved ? JSON.parse(saved) : filesData;
};

const loadActiveFileKey = (files: Record<string, FileItem>): string => {
  const saved = localStorage.getItem(ACTIVE_FILE_KEY);
  return saved && files[saved] ? saved : Object.keys(files)[0];
};

function App() {
  // load from localStorage
  const [files, setFiles] = useState<Record<string, FileItem>>(loadFiles);

  const [activeFileKey, setActiveFileKey] = useState<string>(() =>
    loadActiveFileKey(loadFiles())
  );

  useEffect(() => {
    localStorage.setItem(FILES_KEY, JSON.stringify(files));
  }, [files]);

  useEffect(() => {
    localStorage.setItem(ACTIVE_FILE_KEY, activeFileKey);
  }, [activeFileKey]);

  const activeFile = files[activeFileKey];
  if (!activeFile) return null;

  const addNewFile = () => {
    const name = prompt("Enter file name (e.g. main.js)");
    if (!name) return;




  const updateFileContent = (newValue: string) => {
    setFiles((prev) => ({
      ...prev,
      [activeFileKey]: {
        ...prev[activeFileKey],
        value: newValue,
      },
    }));
  };

  return (

    if (files[name]) {
      alert("File already exists");
      return;
    }

    const updatedFiles = createFile(files, name);
    setFiles(updatedFiles);
    setActiveFileKey(name);
  };

  const deleteFile = (name: string) => {
    const updatedFiles = removeFile(files, name);
    const remaining = Object.keys(updatedFiles);

    if (remaining.length === 0) return;

    setFiles(updatedFiles);

    if (activeFileKey === name) {
      setActiveFileKey(remaining[0]);
    }
  };

  const updateFileContent = (newValue: string) => {
    setFiles((prev) => ({
      ...prev,
      [activeFileKey]: {
        ...prev[activeFileKey],
        value: newValue,
      },
    }));
  };

  return (
    <div className="container">
      <div className="listOfFiles">
        <div className="explorer">
          <span>Explorer</span>
          <div onClick={addNewFile}>
            <FileAddOutlined className="addNewBtn" />
          </div>
        </div>

        <hr />

        <ShowFiles
          files={files}
          onFileSelect={(file) => setActiveFileKey(file.name)}
          onDeleteFile={deleteFile}
        />

      </div>

      <div className="right">
        <TabsAbove
          files={files}
          activeKey={activeFileKey}
          onTabChange={setActiveFileKey}
        />

        <CodeEditor
          code={activeFile.value}
          onChange={updateFileContent}
        />
      </div>
    </div>
  );
}

export default App;
