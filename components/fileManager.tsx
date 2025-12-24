

import './fileManager.css'

interface FileItem {
    name: string;
    language: string;
    value: string;
}

interface ShowFilesProps {
    files: Record<string, FileItem>;
    onFileSelect: (file: FileItem) => void;
}


export default function ShowFiles({ files, onFileSelect }: ShowFilesProps) {
    return (
        <div >
            {Object.values(files).map((file) => (
                <div className='filesDiv' key={file.name} onClick={() => onFileSelect(file)}>{file.name}</div>
            ))}
        </div>
    );
}