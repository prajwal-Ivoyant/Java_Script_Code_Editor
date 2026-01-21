import { Modal, Input } from "antd";
import { useState } from "react";
import { useEditor } from "../src/context/EditorContext";

export default function AddFileModal() {
    const {
        showAddFileModal,
        closeAddFileModal,
        confirmAddFile,
    } = useEditor();

    const [fileName, setFileName] = useState("");

    const handleOk = () => {
        confirmAddFile(fileName.trim());
        setFileName("");
    };

    const handleCancel = () => {
        closeAddFileModal();
        setFileName("");
    };

    return (
        <Modal
            title="Create New File"
            open={showAddFileModal}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Create"
        >
            <Input
                placeholder="Enter file name (e.g. index.html)"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                onPressEnter={handleOk}
            />
        </Modal>
    );
}
