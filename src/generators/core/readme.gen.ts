import { ProjectConfig, FileOutput } from "../../types/index.js";

export function generateReadme(config: ProjectConfig): FileOutput[] {
  let content = `# ${config.name}

Generated with [devstack-cli](https://www.npmjs.com/package/devstack-cli).

## Getting Started

\`\`\`bash
npm install
cp .env.example .env
npm run dev
\`\`\`

## Scripts

| Command | Description |
|---------|-------------|
| \`npm run dev\` | Start development server with hot reload |
| \`npm run build\` | Compile TypeScript |
| \`npm start\` | Run production build |

## Features

`;

  const features: string[] = [
    "Express + TypeScript — strict mode, ESM imports",
    "Error handling — AppError class, async wrapper, global error middleware",
  ];

  if (config.database) features.push("MongoDB + Mongoose — connection config");
  if (config.auth) features.push("JWT Authentication — register, login, refresh, logout");
  if (config.validation) features.push("Zod Validation — request body validation middleware");
  if (config.rateLimiting) features.push("Rate Limiting — express-rate-limit preconfigured");
  if (config.docker) features.push("Docker — Dockerfile + docker-compose with MongoDB");

  content += features.map((f) => `- ${f}`).join("\n");

  if (config.auth) {
    content += `

## API Endpoints

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | \`/api/auth/register\` | Create account |
| POST | \`/api/auth/login\` | Get access token |
| POST | \`/api/auth/refresh\` | Rotate tokens |
| POST | \`/api/auth/logout\` | Clear refresh cookie |
`;
  }

  content += "\n";

  return [
    {
      path: "README.md",
      content,
    },
  ];
}
