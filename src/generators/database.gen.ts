import { FileOutput } from "../types/index.js";

export function generateDatabase(): FileOutput[] {
  return [
    {
      path: "src/config/db.ts",
      content: `import mongoose from "mongoose";
import env from "./env.js";

const connectDB = async () => {
  const conn = await mongoose.connect(env.MONGODB_URI);
  console.log(\`MongoDB connected: \${conn.connection.host}\`);
};

export default connectDB;
`,
    },
  ];
}
