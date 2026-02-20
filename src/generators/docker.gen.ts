import { ProjectConfig, FileOutput } from "../types/index.js";

export function generateDocker(config: ProjectConfig): FileOutput[] {
  return [
    { path: "Dockerfile", content: generateDockerfile() },
    { path: "docker-compose.yml", content: generateCompose(config) },
    { path: ".dockerignore", content: generateDockerignore() },
  ];
}

function generateDockerfile(): string {
  return `FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY dist ./dist

EXPOSE 5000

CMD ["node", "dist/server.js"]
`;
}

function generateCompose(config: ProjectConfig): string {
  let content = `services:
  app:
    build: .
    ports:
      - "\${PORT:-5000}:5000"
    env_file:
      - .env
    restart: unless-stopped`;

  if (config.database) {
    content += `
    depends_on:
      - mongo

  mongo:
    image: mongo:7
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db
    restart: unless-stopped

volumes:
  mongo_data:`;
  }

  content += "\n";

  return content;
}

function generateDockerignore(): string {
  return `node_modules
dist
.env
.git
*.md
`;
}
