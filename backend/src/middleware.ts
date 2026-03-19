import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request & { userId?: string },
  res: Response,
  next: NextFunction
) => {

  const token = req.cookies.token;

  if (!token) {
    return res.status(403).json({
      message: "Unauthorized"
    });
  }

  try {

    const decoded = jwt.verify(
      token,
      process.env.JWT_USER_SECRET as string
    ) as { userId: string };

    req.userId = decoded.userId;

    next();

  } catch (error) {

     return res.status(403).json({
      message: "Invalid token"
    });

  }
};