import jwt from "jsonwebtoken";
import { env } from "@config/env.config";
import { AuthenticatedUser } from "./types/auth";

export class AuthService {
  public generateToken = (user: AuthenticatedUser): string => {
    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
      },

      env.JWT_SECRET,
      { expiresIn: "3d" }
    );
    return token;
  };
}