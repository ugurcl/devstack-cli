import { ProjectConfig, FileOutput } from "../../types/index.js";

export function generateBase(config: ProjectConfig): FileOutput[] {
  const deps: Record<string, string> = {
    express: "^4.21.0",
    dotenv: "^16.4.5",
    cors: "^2.8.5",
    helmet: "^7.1.0",
    morgan: "^1.10.0",
  };

  const devDeps: Record<string, string> = {
    typescript: "^5.3.3",
    "@types/node": "^20.11.0",
    "@types/express": "^4.17.21",
    "@types/cors": "^2.8.17",
    "@types/morgan": "^1.9.9",
    "tsx": "^4.7.0",
  };

  if (config.database) {
    deps["mongoose"] = "^8.1.0";
  }

  if (config.auth) {
    deps["jsonwebtoken"] = "^9.0.2";
    deps["bcryptjs"] = "^2.4.3";
    deps["cookie-parser"] = "^1.4.6";
    devDeps["@types/jsonwebtoken"] = "^9.0.5";
    devDeps["@types/bcryptjs"] = "^2.4.6";
    devDeps["@types/cookie-parser"] = "^1.4.6";
  }

  if (config.validation) {
    deps["zod"] = "^3.22.4";
  }

  if (config.rateLimiting) {
    deps["express-rate-limit"] = "^7.1.5";
  }

  deps["compression"] = "^1.7.4";
  devDeps["@types/compression"] = "^1.7.5";

  const packageJson = {
    name: config.name,
    version: "1.0.0",
    private: true,
    scripts: {
      dev: "tsx watch src/server.ts",
      build: "tsc",
      start: "node dist/server.js",
    },
    dependencies: deps,
    devDependencies: devDeps,
  };

  const tsconfig = {
    compilerOptions: {
      target: "ES2022",
      module: "NodeNext",
      moduleResolution: "NodeNext",
      lib: ["ES2022"],
      outDir: "dist",
      rootDir: "src",
      strict: true,
      esModuleInterop: true,
      skipLibCheck: true,
      forceConsistentCasingInFileNames: true,
      resolveJsonModule: true,
      declaration: true,
    },
    include: ["src/**/*"],
    exclude: ["node_modules", "dist"],
  };

  const envLines = [
    "PORT=5000",
    "NODE_ENV=development",
  ];

  if (config.database) {
    envLines.push(`MONGODB_URI=mongodb://localhost:27017/${config.name}`);
  }

  if (config.auth) {
    envLines.push("JWT_ACCESS_SECRET=your-access-secret-key");
    envLines.push("JWT_REFRESH_SECRET=your-refresh-secret-key");
    envLines.push("JWT_ACCESS_EXPIRES_IN=15m");
    envLines.push("JWT_REFRESH_EXPIRES_IN=7d");
  }

  return [
    {
      path: "package.json",
      content: JSON.stringify(packageJson, null, 2) + "\n",
    },
    {
      path: "tsconfig.json",
      content: JSON.stringify(tsconfig, null, 2) + "\n",
    },
    {
      path: ".env.example",
      content: envLines.join("\n") + "\n",
    },
    {
      path: ".env",
      content: envLines.join("\n") + "\n",
    },
    {
      path: ".gitignore",
      content: `node_modules/
dist/
.env
.DS_Store
`,
    },
    {
      path: "src/config/env.ts",
      content: generateEnvConfig(config),
    },
  ];
}

function generateEnvConfig(config: ProjectConfig): string {
  let content = `import dotenv from "dotenv";

dotenv.config();

const env = {
  PORT: parseInt(process.env.PORT || "5000", 10),
  NODE_ENV: process.env.NODE_ENV || "development",`;

  if (config.database) {
    content += `
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/${config.name}",`;
  }

  if (config.auth) {
    content += `
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "access-secret",
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "refresh-secret",
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || "7d",`;
  }

  content += `
};

export default env;
`;

  return content;
}
