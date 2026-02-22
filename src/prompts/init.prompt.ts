import { input, confirm, select } from "@inquirer/prompts";
import { ProjectConfig } from "../types/index.js";

export async function getProjectConfig(): Promise<ProjectConfig> {
  const name = await input({
    message: "Project name:",
    validate: (val) => {
      if (!val.trim()) return "Project name is required";
      if (!/^[a-z0-9-_]+$/.test(val.trim()))
        return "Only lowercase letters, numbers, hyphens and underscores";
      return true;
    },
  });

  const database = await confirm({
    message: "Include MongoDB with Mongoose?",
    default: true,
  });

  let auth = false;
  if (database) {
    auth = await confirm({
      message: "Include JWT authentication?",
      default: true,
    });
  }

  const validation = await confirm({
    message: "Include Zod validation?",
    default: true,
  });

  const rateLimiting = await confirm({
    message: "Include rate limiting?",
    default: true,
  });

  const docker = await confirm({
    message: "Include Docker configuration?",
    default: true,
  });

  const license = await select({
    message: "License:",
    choices: [
      { name: "MIT", value: "MIT" as const },
      { name: "Apache 2.0", value: "Apache-2.0" as const },
      { name: "ISC", value: "ISC" as const },
      { name: "None", value: "none" as const },
    ],
    default: "MIT",
  });

  const gitInit = await confirm({
    message: "Initialize git repository?",
    default: true,
  });

  return {
    name: name.trim(),
    database,
    auth,
    validation,
    rateLimiting,
    errorHandling: true,
    docker,
    gitInit,
    license,
  };
}
