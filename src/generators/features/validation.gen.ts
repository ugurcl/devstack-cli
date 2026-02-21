import { FileOutput } from "../types/index.js";

export function generateValidation(): FileOutput[] {
  return [
    {
      path: "src/middlewares/validate.middleware.ts",
      content: `import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import AppError from "../utils/appError.js";

const validate = (schema: ZodSchema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const message = result.error.errors.map((e) => e.message).join(", ");
      return next(new AppError(message, 400));
    }

    req.body = result.data;
    next();
  };
};

export default validate;
`,
    },
  ];
}
