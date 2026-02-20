export interface ProjectConfig {
  name: string;
  database: boolean;
  auth: boolean;
  validation: boolean;
  rateLimiting: boolean;
  errorHandling: boolean;
  docker: boolean;
  gitInit: boolean;
}

export interface FileOutput {
  path: string;
  content: string;
}
