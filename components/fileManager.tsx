import "./fileManager.css";
import { DeleteOutlined, ExclamationCircleFilled, FileOutlined } from "@ant-design/icons";
import { useEditor } from "../src/context/EditorContext";
import { Modal } from "antd";
import { useState } from "react";

const { confirm } = Modal;

export default function ShowFiles() {
    const { files, setActiveFileKey, deleteFile, renameFile } = useEditor();

    const [editingFile, setEditingFile] = useState<string | null>(null);
    const [newName, setNewName] = useState("");

    const showDeleteConfirm = (fileName: string) => {
        confirm({
            title: "Delete File",
            icon: <ExclamationCircleFilled style={{ color: "#ff4d4f" }} />,
            content: `File: ${fileName}`,
            okText: "Yes",
            okType: "danger",
            cancelText: "No",



            onOk() {
                deleteFile(fileName);
            },
        });
    };

    const handleRenameConfirm = (oldName: string) => {
        if (!newName || newName === oldName) {
            setEditingFile(null);
            return;
        }

        renameFile(oldName, newName);
        setEditingFile(null);
    };

    return (
        <div>
            {Object.values(files).map((file) => (
                <div className="filesDiv" key={file.name}>

                    {editingFile === file.name ? (
                        <input
                            className="renameInput"
                            value={newName}
                            autoFocus
                            onChange={(e) => setNewName(e.target.value)}
                            onBlur={() => handleRenameConfirm(file.name)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleRenameConfirm(file.name);
                                }
                                if (e.key === "Escape") {
                                    setEditingFile(null);
                                }
                            }}
                        />
                    ) : (
                        <span
                            onClick={() => setActiveFileKey(file.name)}
                            onDoubleClick={() => {
                                setEditingFile(file.name);
                                setNewName(file.name);
                            }}
                        >
                            <FileOutlined />
                            <span>{file.name}</span>
                        </span>
                    )}

                    {/* Delete button */}
                    <div
                        className="deleteBtn"
                        onClick={(e) => {
                            e.stopPropagation();
                            showDeleteConfirm(file.name);
                        }}
                    >
                        <DeleteOutlined />
                    </div>
                </div>
            ))}
        </div>
    );
}
