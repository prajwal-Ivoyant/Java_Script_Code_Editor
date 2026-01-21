

interface FileItem {
    name: string;
    language: string;
    value: string;
}

// detect language => not running
export const getLanguage = (fileName: string): string => {
    if (fileName.endsWith(".js")) return "javascript";
    if (fileName.endsWith(".html")) return "html";
    if (fileName.endsWith(".css")) return "css";
    return "plaintext";
};

//=> returns new files object
export const createFile = (
    files: Record<string, FileItem>,
    name: string
): Record<string, FileItem> => {
    return {
        ...files,
        [name]: {
            name,
            language: getLanguage(name),
            value: "",
        },
    };
};

