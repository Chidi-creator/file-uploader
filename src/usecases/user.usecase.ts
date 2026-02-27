import { IUser } from "@models/types/user";
import UserRepository from "@repositories/user.repository";
import { Types } from "mongoose";
import { ValidationError } from "@managers/error.manager";

class UserUseCase {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  async findAllUsers(): Promise<IUser[]> {
    return this.userRepository.findAllUsers();
  }
  async registerUser(body: Partial<IUser>): Promise<IUser> {
    return await this.userRepository.registerUser(body);
  }
  async findUserById(userId: Types.ObjectId): Promise<IUser | null> {
    return await this.userRepository.findUserById(userId);
  }
  async updateUserById(
    userId: Types.ObjectId,
    updateData: Partial<IUser>
  ): Promise<IUser | null> {
    return this.userRepository.updateUserById(userId, updateData);
  }
  async findUserByEmail(email: string): Promise<IUser | null> {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new ValidationError("Invalid email format");
    }
    const user = await this.userRepository.findUserByEmail(email);
    return user;
  }

  async deleteUserById(userId: Types.ObjectId): Promise<IUser | null> {
    return await this.userRepository.deleteUserById(userId);
  }
  async restoreUserById(userId: Types.ObjectId): Promise<IUser | null> {
    return await this.userRepository.restoreUserById(userId);
  }
}

export default UserUseCase;
