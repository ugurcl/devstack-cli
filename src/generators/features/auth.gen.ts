import { FileOutput } from "../../types/index.js";

export function generateAuth(): FileOutput[] {
  return [
    { path: "src/models/user.model.ts", content: generateUserModel() },
    { path: "src/utils/token.util.ts", content: generateTokenUtil() },
    { path: "src/middlewares/auth.middleware.ts", content: generateAuthMiddleware() },
    { path: "src/controllers/auth.controller.ts", content: generateAuthController() },
    { path: "src/routes/auth.route.ts", content: generateAuthRoute() },
  ];
}

function generateUserModel(): string {
  return `import mongoose, { Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  comparePassword(candidate: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (candidate: string): Promise<boolean> {
  return bcrypt.compare(candidate, this.password);
};

const User = mongoose.model<IUser>("User", userSchema);

export default User;
`;
}

function generateTokenUtil(): string {
  return `import jwt, { SignOptions } from "jsonwebtoken";
import env from "../config/env.js";

export const generateAccessToken = (userId: string): string => {
  return jwt.sign({ id: userId }, env.JWT_ACCESS_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRES_IN as SignOptions["expiresIn"],
  });
};

export const generateRefreshToken = (userId: string): string => {
  return jwt.sign({ id: userId }, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN as SignOptions["expiresIn"],
  });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as { id: string };
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as { id: string };
};
`;
}

function generateAuthMiddleware(): string {
  return `import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError.js";
import { verifyAccessToken } from "../utils/token.util.js";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

const auth = (req: Request, _res: Response, next: NextFunction) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return next(new AppError("Authentication required", 401));
  }

  try {
    const decoded = verifyAccessToken(header.split(" ")[1]);
    req.userId = decoded.id;
    next();
  } catch {
    next(new AppError("Invalid or expired token", 401));
  }
};

export default auth;
`;
}

function generateAuthController(): string {
  return `import { Request, Response, NextFunction } from "express";
import User from "../models/user.model.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/token.util.js";

const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const register = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, name } = req.body;

  const exists = await User.findOne({ email });
  if (exists) {
    return next(new AppError("Email already in use", 400));
  }

  const user = await User.create({ email, password, name });

  const accessToken = generateAccessToken(String(user._id));
  const refreshToken = generateRefreshToken(String(user._id));

  res.cookie("refreshToken", refreshToken, REFRESH_COOKIE_OPTIONS);
  res.status(201).json({ accessToken });
});

export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    return next(new AppError("Invalid email or password", 401));
  }

  const accessToken = generateAccessToken(String(user._id));
  const refreshToken = generateRefreshToken(String(user._id));

  res.cookie("refreshToken", refreshToken, REFRESH_COOKIE_OPTIONS);
  res.json({ accessToken });
});

export const refresh = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.refreshToken;
  if (!token) {
    return next(new AppError("Refresh token not found", 401));
  }

  const decoded = verifyRefreshToken(token);
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(new AppError("User not found", 401));
  }

  const accessToken = generateAccessToken(String(user._id));
  const refreshToken = generateRefreshToken(String(user._id));

  res.cookie("refreshToken", refreshToken, REFRESH_COOKIE_OPTIONS);
  res.json({ accessToken });
});

export const logout = (_req: Request, res: Response) => {
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out" });
};
`;
}

function generateAuthRoute(): string {
  return `import { Router } from "express";
import { register, login, refresh, logout } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);

export default router;
`;
}
