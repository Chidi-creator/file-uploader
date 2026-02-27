import { IUser } from "@models/types/user";
import User from "@models/User";
import { Types } from "mongoose";
import { DatabaseError } from "@managers/error.manager";

class UserRepository {
  async registerUser(data: Partial<IUser>): Promise<IUser> {
    try {
      const user = await User.create(data);
      return user;
    } catch (error: any) {
      throw new DatabaseError("Error creating User");
    }
  }

  async findUserById(userId: Types.ObjectId): Promise<IUser | null> {
    try {
      const user = await User.findById(userId);
      return user;
    } catch (error: any) {
      throw new DatabaseError("Error fetching User");
    }
  }

  async updateUserById(
    userId: Types.ObjectId,
    updateData: Partial<IUser>
  ): Promise<IUser | null> {
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { $set: updateData },
        { new: true }
      );
      return user
    } catch (error: any) {
      throw new DatabaseError("Error Updating User");
    }
  }

  async findUserByEmail(email: string): Promise<IUser | null> {
    try {
      const user = await User.findOne({email}).lean(); // Lean gives plain object
      return user || null;
    } catch (error: any) {
      throw new DatabaseError("Error fetching user by email");
    }
  }

  async findAllUsers(): Promise<IUser[]> {
    try {
      const users = await User.find();
      return users;
    } catch (error: any) {
      throw new DatabaseError("Error fetching all users");
    }
  }



  async deleteUserById(userId: Types.ObjectId): Promise<IUser | null> {
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { $set: { deletedAt: new Date() } },
        { new: true }
      );
      return user;
    } catch (error: any) {
      throw new Error("Error soft deleting user");
    }
  }

  async restoreUserById(userId: Types.ObjectId): Promise<IUser | null> {
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { $set: { deletedAt: null } },
        { new: true }
      );
      return user;
    } catch (error: any) {
      throw new Error("Error restoring user");
    }
  }
}

export default UserRepository;
