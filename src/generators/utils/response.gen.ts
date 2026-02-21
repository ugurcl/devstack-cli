import { FileOutput } from "../types/index.js";

export function generateResponse(): FileOutput[] {
  return [
    {
      path: "src/utils/response.util.ts",
      content: `import { Response } from "express";

interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export const sendSuccess = (res: Response, data: unknown, statusCode = 200) => {
  res.status(statusCode).json({ success: true, data });
};

export const sendPaginated = (
  res: Response,
  data: unknown,
  pagination: PaginationMeta,
  statusCode = 200
) => {
  res.status(statusCode).json({ success: true, data, pagination });
};

export const sendError = (res: Response, message: string, statusCode = 400) => {
  res.status(statusCode).json({ success: false, message });
};

export const sendCreated = (res: Response, data: unknown) => {
  sendSuccess(res, data, 201);
};

export const sendNoContent = (res: Response) => {
  res.status(204).send();
};
`,
    },
  ];
}
