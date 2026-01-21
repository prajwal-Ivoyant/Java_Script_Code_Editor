import { createContext, useContext, useEffect, useState, useRef } from "react";
import filesData from "../data/files";
import { createFile } from "../utils/addFileFunction";
import { removeFile } from "../utils/deleteFileFunction";

//=> file interface
interface FileItem {
  name: string;
  language: string;
  value: string;
}

//=> context interface
interface EditorContextType {
  files: Record<string, FileItem>;
  activeFileKey: string;
  activeFile: FileItem;
  setActiveFileKey: (key: string) => void;
  deleteFile: (name: string) => void;
  updateFileContent: (value: string) => void;
  updateFileLanguage: (language: string) => void;

  //=> code runner
  runCode: () => void;
  output: string;
  iframeRef: React.RefObject<HTMLIFrameElement | null>;

  //=> add file modal
  showAddFileModal: boolean;
  openAddFileModal: () => void;
  closeAddFileModal: () => void;
  confirmAddFile: (fileName: string) => void;
}

//=> create context
const EditorContext = createContext<EditorContextType | null>(null);

const FILES_KEY = "editor-files";
const ACTIVE_FILE_KEY = "active-file";

//=> load files from localStorage
const loadFiles = (): Record<string, FileItem> => {
  if (typeof window === "undefined") return filesData;
  const saved = localStorage.getItem(FILES_KEY);
  return saved ? JSON.parse(saved) : filesData;
};

//=> load active file key
const loadActiveFileKey = (files: Record<string, FileItem>) => {
  if (typeof window === "undefined") return Object.keys(files)[0];
  const saved = localStorage.getItem(ACTIVE_FILE_KEY);
  return saved && files[saved] ? saved : Object.keys(files)[0];
};

//=> provider component
export function EditorProvider({ children }: { children: React.ReactNode }) {
  //=> files state
  const [files, setFiles] = useState<Record<string, FileItem>>(loadFiles);

  //=> active file key state
  const [activeFileKey, setActiveFileKey] = useState(() =>
    loadActiveFileKey(loadFiles())
  );

  //=> active file
  const activeFile = files[activeFileKey];

  //=> code output state
  const [output, setOutput] = useState("");

  //=> iframe ref for html rendering
  const iframeRef = useRef<HTMLIFrameElement>(null);

  //=> add file modal state
  const [showAddFileModal, setShowAddFileModal] = useState(false);

  //=> persist files
  useEffect(() => {
    localStorage.setItem(FILES_KEY, JSON.stringify(files));
  }, [files]);

  //=> persist active file
  useEffect(() => {
    localStorage.setItem(ACTIVE_FILE_KEY, activeFileKey);
  }, [activeFileKey]);

  //=> delete file
  const deleteFile = (name: string) => {
    const updated = removeFile(files, name);
    const remaining = Object.keys(updated);
    if (remaining.length === 0) return;

    setFiles(updated);

    if (activeFileKey === name) {
      setActiveFileKey(remaining[0]);
    }
  };

  //=> update file content
  const updateFileContent = (value: string) => {
    setFiles((prev) => ({
      ...prev,
      [activeFileKey]: {
        ...prev[activeFileKey],
        value,
      },
    }));
  };

  //=> update file language
  const updateFileLanguage = (language: string) => {
    setFiles((prev) => ({
      ...prev,
      [activeFileKey]: {
        ...prev[activeFileKey],
        language,
      },
    }));
  };

  //=> open add file modal
  const openAddFileModal = () => {
    setShowAddFileModal(true);
  };

  //=> close add file modal
  const closeAddFileModal = () => {
    setShowAddFileModal(false);
  };

  //=> confirm add file
  const confirmAddFile = (name: string) => {
    if (!name || files[name]) return;

    const updated = createFile(files, name);
    setFiles(updated);
    setActiveFileKey(name);
    setShowAddFileModal(false);
  };

  //=> run code based on language
  const runCode = () => {
    const code = activeFile.value;
    const lang = activeFile.language;

    //=> reset output
    setOutput("");

    //=> javascript execution
    if (lang === "javascript") {
      let logs: string[] = [];

      const originalLog = console.log;
      console.log = (...args) => {
        logs.push(args.join(" "));
      };

      try {
        const result = eval(code);
        if (result !== undefined) {
          logs.push(String(result));
        }
        setOutput(logs.join("\n"));
      } catch (err: any) {
        setOutput(err.message);
      }

      console.log = originalLog;
      return;
    }

    //=> html + css rendering
    if (lang === "html") {
      const cssFile = Object.values(files).find(
        (file) => file.language === "css"
      );

      const cssCode = cssFile ? cssFile.value : "";

      if (iframeRef.current) {
        const doc = `
<!DOCTYPE html>
<html>
  <head>
    <style>
${cssCode}
    </style>
  </head>
  <body>
${code}
  </body>
</html>
        `;

        iframeRef.current.srcdoc = doc;
      }
      return;
    }

    //=> typescript not supported
    if (lang === "typescript") {
      setOutput("TypeScript execution not supported yet.");
      return;
    }

    //=> python not supported
    if (lang === "python") {
      setOutput("Python execution not supported in browser.");
      return;
    }
  };

  //=> provide context values
  return (
    <EditorContext.Provider
      value={{
        files,
        activeFileKey,
        activeFile,
        setActiveFileKey,
        deleteFile,
        updateFileContent,
        updateFileLanguage,

        //=> code runner
        runCode,
        output,
        iframeRef,

        //=> add file modal api
        showAddFileModal,
        openAddFileModal,
        closeAddFileModal,
        confirmAddFile,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

//=> custom hook
export const useEditor = () => {
  const context = useContext(EditorContext);

  if (!context) {
    throw new Error("useEditor must be used inside an EditorProvider");
  }

  return context;
};
