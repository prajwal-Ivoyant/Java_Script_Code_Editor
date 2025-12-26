import "./fileManager.css";
import { DeleteOutlined } from '@ant-design/icons';

interface FileItem {
    name: string;
    language: string;
    value: string;
}

interface ShowFilesProps {
    files: Record<string, FileItem>;
    onFileSelect: (file: FileItem) => void;
    onDeleteFile: (fileName: string) => void;
}

export default function ShowFiles({
    files,
    onFileSelect,
    onDeleteFile,
}: ShowFilesProps) {
    return (
        <div>
            {Object.values(files).map((file) => (
                <div className="filesDiv" key={file.name}>
                    <span onClick={() => onFileSelect(file)}>
                        {file.name}
                    </span>



                    <div className="deleteBtn"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDeleteFile(file.name);
                        }}
                    >
                        <DeleteOutlined /></div>
                </div>
            ))}
        </div>
    );
}
