import path from "path";
import { execSync } from "child_process";
import ora from "ora";
import { getProjectConfig } from "../prompts/init.prompt.js";
import { generateProject } from "../generators/index.js";
import { writeProjectFiles, projectExists } from "../utils/file.util.js";
import { logger } from "../utils/logger.util.js";

export async function initCommand(): Promise<void> {
  logger.title("devstack — project scaffolder");

  const config = await getProjectConfig();
  const projectDir = path.resolve(process.cwd(), config.name);

  if (await projectExists(projectDir)) {
    logger.error(`Directory "${config.name}" already exists`);
    process.exit(1);
  }

  logger.blank();

  const spinner = ora("Generating project files...").start();
  const files = generateProject(config);
  await writeProjectFiles(projectDir, files);
  spinner.succeed(`Generated ${files.length} files`);

  const installSpinner = ora("Installing dependencies...").start();
  try {
    execSync("npm install", { cwd: projectDir, stdio: "pipe" });
    installSpinner.succeed("Dependencies installed");
  } catch {
    installSpinner.fail("Failed to install dependencies");
    logger.warning("Run 'npm install' manually in the project directory");
  }

  if (config.gitInit) {
    const gitSpinner = ora("Initializing git...").start();
    try {
      execSync("git init", { cwd: projectDir, stdio: "pipe" });
      execSync("git add -A", { cwd: projectDir, stdio: "pipe" });
      execSync('git commit -m "init project with devstack"', {
        cwd: projectDir,
        stdio: "pipe",
      });
      gitSpinner.succeed("Git repository initialized");
    } catch {
      gitSpinner.fail("Failed to initialize git");
    }
  }

  logger.blank();
  logger.success(`Project "${config.name}" created`);
  logger.blank();
  logger.info(`  cd ${config.name}`);
  logger.info("  npm run dev");
  logger.blank();
}
