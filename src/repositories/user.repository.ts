import { DeleteResult } from "mongodb";

import { User } from "../models/User.model";
import { IUser } from "../types/user.type";

class UserRepository {
  public async getAll(): Promise<IUser[]> {
    return await User.find();
  }

  public async getById(id: string): Promise<IUser> {
    return await User.findById(id);
  }

  public async create(user: IUser) {
    return await User.create({ ...user });
  }

  public async deleteById(id: string): Promise<DeleteResult> {
    return await User.deleteOne({ _id: id });
  }

  public async updateById(id: string, data: IUser): Promise<IUser> {
    return await User.findByIdAndUpdate(id, data, { returnDocument: "after" });
  }
}

export const userRepository = new UserRepository();
