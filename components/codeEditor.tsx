
import { Editor } from '@monaco-editor/react'
import { useState, useEffect } from 'react'

import './codeEditor.css'

interface codeEditorProps {
    code: string;
}


export default function CodeEditor({ code }: codeEditorProps) {

    const [editorcode, setEditorCode] = useState(code);
    const [output, setOutput] = useState("");

    useEffect(() => {
        setEditorCode(code)
    }, [code]);


    const runCode = () => {
        let logs: string[] = []

        const originalLog = console.log
        console.log = (...args) => {
            logs.push(args.join(" "))
        }

        try {
            const result = eval(code)
            if (result !== undefined) {
                logs.push(String(result))
            }
            setOutput(logs.join("\n"))
        } catch (err) {

        }


        console.log = originalLog
    }


    return (
        <>
            <Editor
                height="400px"
                width="100%"
                language="javascript"
                theme="vs-dark"
                value={editorcode}
                onChange={(value) => setEditorCode(value ?? "")}
            />

            <button onClick={runCode}>
                Run
            </button>

            <pre className='result'>
                {output}
            </pre>
        </>
    );
}