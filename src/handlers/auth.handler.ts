import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUser } from "@models/types/user";
import { Types } from "mongoose";
import UserUseCase from "@usecases/user.usecase";
import { AuthService } from "@service/auth.service";
import responseManager from "@managers/index";

import { validateUser } from "@validation/user.validation";
import {
  ConflictError,
  NotFoundError,
  ValidationError,
} from "@managers/error.manager";

class AuthHandler {
  private userUseCase: UserUseCase;
  private authService: AuthService;
  constructor() {
    this.userUseCase = new UserUseCase();
    this.authService = new AuthService();
  }

  public registerUser = async (req: Request, res: Response) => {
    try {
      const { email, password, username }: IUser = req.body;

      const { error } = validateUser(req.body);

      if (error) {
        throw new ValidationError(
          `Validation failed ${error.details.map((e) => e.message).join(",")}`
        );
      }

      // Check if user already exists
      const userExists = await this.userUseCase.findUserByEmail(email);
      if (userExists) {
        throw new ConflictError("User with this email exists");
      }

      const hashedPassword = await bcrypt.hash(password as string, 10);
      const data = {
        email: email as string,
        password: hashedPassword,
        username: username as string,
      };

      // Create new user
      const user = await this.userUseCase.registerUser(data);
      const token = this.authService.generateToken({
        _id: user._id as Types.ObjectId,
        email: user.email,
      });

    
     
      return responseManager.success(
        res,
        { user, token },
        "User registered successfully"
      );
    } catch (error: any) {
      return responseManager.handleError(res, error);
    }
  };
  public login = async (req: Request, res: Response) => {
    try {
      const data: Partial<IUser> = req.body;

      const user = await this.userUseCase.findUserByEmail(data.email as string);
      if (!user) {
        throw new NotFoundError("User not found");
      }
      const isMatch = await bcrypt.compare(
        data.password as string,
        user.password
      );
      if (!isMatch) {
        throw new ValidationError("Invalid credentials");
      }
      const token = this.authService.generateToken({
        _id: user._id as Types.ObjectId,
        email: user.email,
      });
      return responseManager.success(res, { user, token });
    } catch (error: any) {
      return responseManager.handleError(res, error);
    }
  };
}

export default AuthHandler;
