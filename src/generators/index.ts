import { ProjectConfig, FileOutput } from "../types/index.js";
import { generateBase } from "./core/base.gen.js";
import { generateApp } from "./core/app.gen.js";
import { generateError } from "./core/error.gen.js";
import { generateDatabase } from "./features/database.gen.js";
import { generateAuth } from "./features/auth.gen.js";
import { generateValidation } from "./features/validation.gen.js";
import { generateRateLimit } from "./features/rate-limit.gen.js";
import { generateDocker } from "./features/docker.gen.js";
import { generateRegex } from "./regex.gen.js";
import { generateValidate } from "./validate.gen.js";
import { generateTransform } from "./transform.gen.js";
import { generateResponse } from "./response.gen.js";
import { generateQueryBuilder } from "./query-builder.gen.js";
import { generateSchemas } from "./schemas.gen.js";
import { generateSlug } from "./slug.gen.js";

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
  files.push(...generateTransform());
  files.push(...generateResponse());

  if (config.database) {
    files.push(...generateQueryBuilder());
    files.push(...generateSlug());
  }

  if (config.validation) {
    files.push(...generateSchemas(config));
  }

  return files;
}
