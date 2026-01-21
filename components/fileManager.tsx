import "./fileManager.css";
import { DeleteOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { useEditor } from "../src/context/EditorContext";
import { Modal } from "antd";

const { confirm } = Modal;

export default function ShowFiles() {
    const { files, setActiveFileKey, deleteFile } = useEditor();

    const showDeleteConfirm = (fileName: string) => {
        confirm({
            title: "Are you sure you want to delete this file?",
            icon: <ExclamationCircleFilled />,
            content: `File: ${fileName}`,
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk() {
                deleteFile(fileName);
            },
            onCancel() {

            },
        });
    };

    return (
        <div>
            {Object.values(files).map((file) => (
                <div className="filesDiv" key={file.name}>
                    <span onClick={() => setActiveFileKey(file.name)}>
                        {file.name}
                    </span>

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
