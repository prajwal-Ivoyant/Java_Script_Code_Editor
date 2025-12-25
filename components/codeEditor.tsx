import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import "./codeEditor.css";

interface CodeEditorProps {
    code: string;
    onChange: (value: string) => void;
}

export default function CodeEditor({ code, onChange }: CodeEditorProps) {
    const [output, setOutput] = useState("");

    const runCode = () => {
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
    };

    return (
        <>
            <Editor
                height="400px"
                width="100%"
                language="javascript"
                theme="vs-dark"
                value={code}
                onChange={(value) => onChange(value ?? "")}
            />

            <button onClick={runCode}>Run</button>

            <pre className="result">{output}</pre>
        </>
    );
}
