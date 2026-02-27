import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import responseManager from "@managers/index";
import { env } from "@config/env.config";

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  

  if (!token) {
    return responseManager.authorizationError(res, "Access token is missing", "Access token is missing", 401);
  }

  jwt.verify(token, env.JWT_SECRET, (err: any, user: any) => {
    if (err) {
      return responseManager.authorizationError(res, "Invalid access token", "Invalid access token", 403);
    }
    (req as any).user = user;
    next();
  });
};