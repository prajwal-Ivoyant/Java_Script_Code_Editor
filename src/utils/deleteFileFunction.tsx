

interface FileItem {
    name: string;
    language: string;
    value: string;
}


// returns new files object
export const removeFile = (files: Record<string, FileItem>, name: string):
    Record<string, FileItem> => {
    const updated = { ...files };
    delete updated[name];
    return updated;
};
