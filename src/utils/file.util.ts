import path from "path";
import fs from "fs-extra";
import { FileOutput } from "../types/index.js";

export async function writeProjectFiles(
  projectDir: string,
  files: FileOutput[]
): Promise<void> {
  for (const file of files) {
    const filePath = path.join(projectDir, file.path);
    await fs.ensureDir(path.dirname(filePath));
    await fs.writeFile(filePath, file.content, "utf-8");
  }
}

export async function projectExists(projectDir: string): Promise<boolean> {
  return fs.pathExists(projectDir);
}
