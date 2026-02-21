import { ProjectConfig, FileOutput } from "../../types/index.js";

export function generateApp(config: ProjectConfig): FileOutput[] {
  return [
    { path: "src/app.ts", content: generateAppTs(config) },
    { path: "src/server.ts", content: generateServerTs(config) },
    { path: "src/routes/index.ts", content: generateRouteIndex(config) },
  ];
}

function generateAppTs(config: ProjectConfig): string {
  const imports: string[] = [
    `import express from "express";`,
    `import cors from "cors";`,
    `import helmet from "helmet";`,
    `import morgan from "morgan";`,
  ];

  if (config.auth) {
    imports.push(`import cookieParser from "cookie-parser";`);
  }

  if (config.rateLimiting) {
    imports.push(`import { limiter } from "./middlewares/rateLimiter.middleware.js";`);
  }

  imports.push(`import routes from "./routes/index.js";`);
  imports.push(`import errorHandler from "./middlewares/error.middleware.js";`);
  imports.push(`import AppError from "./utils/appError.js";`);

  const middlewares: string[] = [
    `app.use(helmet());`,
    `app.use(cors());`,
    `app.use(morgan("dev"));`,
    `app.use(express.json());`,
    `app.use(express.urlencoded({ extended: true }));`,
  ];

  if (config.auth) {
    middlewares.push(`app.use(cookieParser());`);
  }

  if (config.rateLimiting) {
    middlewares.push(`app.use(limiter);`);
  }

  return `${imports.join("\n")}

const app = express();

${middlewares.join("\n")}

app.use("/api", routes);

app.all("*", (req, _res, next) => {
  next(new AppError(\`Route \${req.originalUrl} not found\`, 404));
});

app.use(errorHandler);

export default app;
`;
}

function generateServerTs(config: ProjectConfig): string {
  if (config.database) {
    return `import app from "./app.js";
import env from "./config/env.js";
import connectDB from "./config/db.js";

const start = async () => {
  await connectDB();
  app.listen(env.PORT, () => {
    console.log(\`Server running on port \${env.PORT}\`);
  });
};

start();
`;
  }

  return `import app from "./app.js";
import env from "./config/env.js";

app.listen(env.PORT, () => {
  console.log(\`Server running on port \${env.PORT}\`);
});
`;
}

function generateRouteIndex(config: ProjectConfig): string {
  if (config.auth) {
    return `import { Router } from "express";
import authRoutes from "./auth.route.js";

const router = Router();

router.use("/auth", authRoutes);

router.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

export default router;
`;
  }

  return `import { Router } from "express";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

export default router;
`;
}
