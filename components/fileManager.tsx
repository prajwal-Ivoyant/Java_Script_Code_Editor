import "./fileManager.css";

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

                    <button
                        className="deleteBtn"
                        onClick={(e) => {
                            e.stopPropagation(); // 🔴 IMPORTANT
                            onDeleteFile(file.name);
                        }}
                    >
                        ❌
                    </button>
                </div>
            ))}
        </div>
    );
}
