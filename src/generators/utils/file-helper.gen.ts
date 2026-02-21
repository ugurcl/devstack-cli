import { FileOutput } from "../../types/index.js";

export function generateFileHelper(): FileOutput[] {
  return [
    {
      path: "src/utils/file.util.ts",
      content: `const UNITS = ["B", "KB", "MB", "GB", "TB"] as const;

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 B";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const size = bytes / Math.pow(1024, i);
  return \`\${size.toFixed(i === 0 ? 0 : 1)} \${UNITS[i]}\`;
};

export const getFileExtension = (filename: string): string => {
  const lastDot = filename.lastIndexOf(".");
  if (lastDot === -1) return "";
  return filename.slice(lastDot).toLowerCase();
};

export const getFileName = (filepath: string): string => {
  return filepath.replace(/^.*[\\\\/]/, "").replace(/\\.[^.]+$/, "");
};

export const isAllowedFileType = (
  filename: string,
  allowedTypes: string[]
): boolean => {
  const ext = getFileExtension(filename);
  return allowedTypes.includes(ext);
};

export const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];
export const DOCUMENT_EXTENSIONS = [".pdf", ".doc", ".docx", ".xls", ".xlsx", ".pptx"];
export const VIDEO_EXTENSIONS = [".mp4", ".webm", ".avi", ".mov"];

export const isImage = (filename: string): boolean => {
  return isAllowedFileType(filename, IMAGE_EXTENSIONS);
};

export const isDocument = (filename: string): boolean => {
  return isAllowedFileType(filename, DOCUMENT_EXTENSIONS);
};

export const isVideo = (filename: string): boolean => {
  return isAllowedFileType(filename, VIDEO_EXTENSIONS);
};
`,
    },
  ];
}
