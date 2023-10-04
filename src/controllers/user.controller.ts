import { NextFunction, Request, Response } from "express";

import { userRepository } from "../repositories/user.repository";
import { userService } from "../services/user.service";
import { IUser } from "../types/user.type";

class UserController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<IUser[]> | void> {
    try {
      const users = await userService.getAll();

      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req?.res?.locals as IUser;

      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req?.res?.locals as IUser;

      const createdUser = await userRepository.create(user);
      return res.json(createdUser).status(201);
    } catch (e) {
      next(e);
    }
  }

  public async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      await userService.deleteById(id);

      return res.status(200);
    } catch (e) {
      next(e);
    }
  }

  public async updateById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const validDataForUpdating = req?.res?.locals as IUser;

      const updatedUser = await userService.updateById(
        id,
        validDataForUpdating,
      );

      return res.json(updatedUser).status(200);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
