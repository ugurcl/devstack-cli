import { FileOutput } from "../types/index.js";

export function generateError(): FileOutput[] {
  return [
    {
      path: "src/utils/appError.ts",
      content: `class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
`,
    },
    {
      path: "src/utils/catchAsync.ts",
      content: `import { Request, Response, NextFunction } from "express";

const catchAsync = (fn: (req: Request<any>, res: Response, next: NextFunction) => Promise<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

export default catchAsync;
`,
    },
    {
      path: "src/middlewares/error.middleware.ts",
      content: `import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError.js";

const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
    return;
  }

  res.status(500).json({
    status: "error",
    message: "Something went wrong",
  });
};

export default errorHandler;
`,
    },
  ];
}
