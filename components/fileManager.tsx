import files from '../src/data/files'

import './fileManager.css'

export default function ShowFiles() {
    return (
        <div >
            {Object.values(files).map((file) => (
                <div className='filesDiv' key={file.name}>{file.name}</div>
            ))}
        </div>
    );
}