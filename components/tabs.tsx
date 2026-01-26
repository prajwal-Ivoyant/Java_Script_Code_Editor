import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { useEditor } from "../src/context/EditorContext";
import "./tabs.css";

export default function TabsAbove() {
    const { files, activeFileKey, setActiveFileKey, runCode } = useEditor();

    const items: TabsProps["items"] = Object.values(files).map((file) => ({
        key: file.name,
        label: file.name,
    }));

    return (
        <>
            <div className="tabs_run">
                <Tabs
                    className="TabsStyle"
                    items={items}
                    activeKey={activeFileKey}
                    onChange={setActiveFileKey}
                />
                <button onClick={runCode} className="runBtn">Run</button>
            </div>

        </>
    );
}
