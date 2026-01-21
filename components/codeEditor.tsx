import { Editor } from "@monaco-editor/react";
import "./codeEditor.css";
import { useEditor } from "../src/context/EditorContext";

export default function CodeEditor() {
    const {
        activeFile,
        updateFileContent,
        runCode,
        output,
        iframeRef,
    } = useEditor();

    if (!activeFile) return null;

    return (
        <>
            <label htmlFor="language-select">Language</label>
            {/* <select
                id="language-select"
                value={activeFile.language}
                onChange={(e) => updateFileLanguage(e.target.value)}
            >
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="python">Python</option>
            </select> */}

            <Editor
                height="400px"
                width="100%"
                language={activeFile.language}
                theme="vs-dark"
                value={activeFile.value}
                onChange={(value) => updateFileContent(value ?? "")}
            />

            <button onClick={runCode}>Run</button>

            {/* JS Output */}
            <pre className="result">{output}</pre>

            {/* HTML/CSS Output */}
            <iframe
                ref={iframeRef}
                title="result-frame"
                style={{
                    width: "100%",
                    height: "300px",
                    border: "1px solid #444",
                    marginTop: "10px",
                    background: "white",
                }}
            />
        </>
    );
}
