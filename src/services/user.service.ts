import { userRepository } from "../repositories/user.repository";
import { IUser } from "../types/user.type";

class UserService {
  public async getAll(): Promise<IUser[]> {
    return await userRepository.getAll();
  }

  public async getById(id: string): Promise<IUser | null> {
    return await userRepository.getById(id);
  }

  public async create(user: IUser) {
    return await userRepository.create(user);
  }

  public async deleteById(id: string) {
    return await userRepository.deleteById(id);
  }

  public async updateById(id: string, data: IUser) {
    return await userRepository.updateById(id, data);
  }
}

export const userService = new UserService();
