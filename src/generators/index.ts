import { ProjectConfig, FileOutput } from "../types/index.js";
import { generateBase } from "./base.gen.js";
import { generateApp } from "./app.gen.js";
import { generateError } from "./error.gen.js";
import { generateDatabase } from "./database.gen.js";
import { generateAuth } from "./auth.gen.js";
import { generateValidation } from "./validation.gen.js";
import { generateRateLimit } from "./rate-limit.gen.js";
import { generateDocker } from "./docker.gen.js";
import { generateRegex } from "./regex.gen.js";
import { generateValidate } from "./validate.gen.js";

export function generateProject(config: ProjectConfig): FileOutput[] {
  const files: FileOutput[] = [];

  files.push(...generateBase(config));
  files.push(...generateApp(config));
  files.push(...generateError());

  if (config.database) {
    files.push(...generateDatabase());
  }

  if (config.auth) {
    files.push(...generateAuth());
  }

  if (config.validation) {
    files.push(...generateValidation());
  }

  if (config.rateLimiting) {
    files.push(...generateRateLimit());
  }

  if (config.docker) {
    files.push(...generateDocker(config));
  }

  files.push(...generateRegex());
  files.push(...generateValidate());

  return files;
}
