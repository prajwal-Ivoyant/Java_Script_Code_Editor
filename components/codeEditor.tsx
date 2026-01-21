import { Editor } from "@monaco-editor/react";
import type * as Monaco from "monaco-editor";
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

    const handleEditorWillMount = (monaco: typeof Monaco) => {
        monaco.editor.defineTheme("tokyo-night", {
            base: "vs-dark",
            inherit: true,
            rules: [
                { token: "comment", foreground: "565f89" },
                { token: "string", foreground: "9ece6a" },
                { token: "keyword", foreground: "7aa2f7" },
                { token: "number", foreground: "ff9e64" },
                { token: "type", foreground: "2ac3de" },
            ],
            colors: {
                "editor.background": "#1a1b26",
                "editor.foreground": "#c0caf5",
                "editorLineNumber.foreground": "#565f89",
                "editorCursor.foreground": "#c0caf5",
                "editor.selectionBackground": "#33467c",
                "editor.inactiveSelectionBackground": "#292e42",
            },
        });
    };

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
                value={activeFile.value}
                beforeMount={handleEditorWillMount}
                theme="tokyo-night"
                onChange={(value) => updateFileContent(value ?? "")}
            />

            <button onClick={runCode}>Run</button>

            {/* JS Output */}
            <pre className="result">{output}</pre>

            {activeFile.language === "html" && (
                <iframe ref={iframeRef} title="result-frame" />
            )}
        </>
    );
}
