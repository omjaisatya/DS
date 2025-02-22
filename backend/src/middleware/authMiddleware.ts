import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/envConfig";
import { TokenPayload } from "../types/authTypes";

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization");

  if (!token) {
    res.status(401).json({ message: "Access denied. No token provided." });
    return;
  }
  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET) as {
      userId: string;
      email: string;
    };
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
  }
};

export default authMiddleware;
