<<<<<<< Updated upstream


import './fileManager.css'

=======
import "./fileManager.css";
import { DeleteOutlined } from '@ant-design/icons';
>>>>>>> Stashed changes
interface FileItem {
    name: string;
    language: string;
    value: string;
}

interface ShowFilesProps {
    files: Record<string, FileItem>;
    onFileSelect: (file: FileItem) => void;
}


<<<<<<< Updated upstream
export default function ShowFiles({ files, onFileSelect }: ShowFilesProps) {
    return (
        <div >
            {Object.values(files).map((file) => (
                <div className='filesDiv' key={file.name} onClick={() => onFileSelect(file)}>{file.name}</div>
=======
                    <div className="deleteBtn"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDeleteFile(file.name);
                        }}
                    >
                        <DeleteOutlined className="deleteBtn" /></div>
                </div>
>>>>>>> Stashed changes
            ))}
        </div>
    );
}