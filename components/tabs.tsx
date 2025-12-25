import { Tabs } from "antd";
import type { TabsProps } from "antd";

interface FileItem {
    name: string;
    language: string;
    value: string;
}

interface TabsAboveProps {
    files: Record<string, FileItem>;
    activeKey: string;
    onTabChange: (key: string) => void;
}

export default function TabsAbove({ files, activeKey, onTabChange }: TabsAboveProps) {

    const items: TabsProps["items"] = Object.values(files).map((file) => ({
        key: file.name,
        label: file.name,
    }));

    return (
        <Tabs
            items={items}
            activeKey={activeKey}
            onChange={onTabChange}
        />
    );
}
