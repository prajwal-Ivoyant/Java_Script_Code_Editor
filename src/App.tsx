import "./App.css";
import filesData from "./data/files";
import { useState, useEffect } from "react";

import TabsAbove from "../components/tabs";
import CodeEditor from "../components/codeEditor";
import ShowFiles from "../components/fileManager";

function App() {
  const [files, setFiles] = useState(filesData);

  // which file is open
  const [activeFileKey, setActiveFileKey] = useState(
    Object.keys(filesData)[0]
  );

  const activeFile = files[activeFileKey];


  // 🔹 persist files
  useEffect(() => {
    localStorage.setItem("editor-files", JSON.stringify(files));
  }, [files]);

  // 🔹 persist active tab
  useEffect(() => {
    localStorage.setItem("active-file", activeFileKey);
  }, [activeFileKey]);





  const getLanguage = (fileName: string) => {
    if (fileName.endsWith(".js")) return "javascript";
    if (fileName.endsWith(".html")) return "html";
    if (fileName.endsWith(".css")) return "css";
    return "plaintext";
  };


  const addNewFile = () => {
    const name = prompt("Enter file name (e.g. main.js)");
    if (!name) return;

    if (files[name]) {
      alert("File already exists");
      return;
    }

    setFiles((prev) => ({
      ...prev,
      [name]: {
        name,
        language: getLanguage(name),
        value: "",
      },
    }));

    setActiveFileKey(name);
  };




  const deleteFile = (name: string) => {
    const updated = { ...files };
    delete updated[name];

    const remaining = Object.keys(updated);
    if (remaining.length === 0) return;

    setFiles(updated);

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
          <p>Explorer</p>
          <button onClick={addNewFile}>＋</button>
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
