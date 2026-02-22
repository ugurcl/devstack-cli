import { FileOutput } from "../../types/index.js";

export function generateCompression(): FileOutput[] {
  return [
    {
      path: "src/middlewares/compression.middleware.ts",
      content: `import compression from "compression";

export const compress = compression({
  level: 6,
  threshold: 1024,
  filter: (req, res) => {
    if (req.headers["x-no-compression"]) return false;
    return compression.filter(req, res);
  },
});
`,
    },
  ];
}
