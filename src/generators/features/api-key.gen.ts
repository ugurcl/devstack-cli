import { FileOutput } from "../../types/index.js";

export function generateApiKey(): FileOutput[] {
  return [
    {
      path: "src/middlewares/apiKey.middleware.ts",
      content: `import { Request, Response, NextFunction } from "express";
import env from "../config/env.js";

export const apiKeyAuth = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers["x-api-key"] as string;

  if (!apiKey) {
    return res.status(401).json({
      success: false,
      message: "API key is required",
    });
  }

  const validKeys = (env.API_KEYS || "").split(",").map((k: string) => k.trim());

  if (!validKeys.includes(apiKey)) {
    return res.status(403).json({
      success: false,
      message: "Invalid API key",
    });
  }

  next();
};
`,
    },
  ];
}
