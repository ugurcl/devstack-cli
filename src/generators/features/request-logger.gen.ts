import { FileOutput } from "../../types/index.js";

export function generateRequestLogger(): FileOutput[] {
  return [
    {
      path: "src/middlewares/requestLogger.middleware.ts",
      content: `import { Request, Response, NextFunction } from "express";

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const log = [
      new Date().toISOString(),
      req.method,
      req.originalUrl,
      res.statusCode,
      \`\${duration}ms\`,
    ].join(" | ");

    if (res.statusCode >= 400) {
      console.error(log);
    } else {
      console.log(log);
    }
  });

  next();
};
`,
    },
  ];
}
