export interface ProjectConfig {
  name: string;
  database: boolean;
  auth: boolean;
  validation: boolean;
  rateLimiting: boolean;
  errorHandling: boolean;
  docker: boolean;
  gitInit: boolean;
  license: "MIT" | "Apache-2.0" | "ISC" | "none";
}

export interface FileOutput {
  path: string;
  content: string;
}
