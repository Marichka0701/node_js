import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.error";
import { userRepository } from "../repositories/user.repository";

class UserMiddleware {
  public async getByIdOrThrow(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await userRepository.getById(id);
      if (!user) {
        throw new ApiError("User not found", 404);
      }

      if (req.res) {
        req.res.locals = user;
      }

      next();
    } catch (e) {
      next(e);
    }
  }

  // public async deleteByIdOrThrow(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction,
  // ) {
  //   try {
  //     const { id } = req.params;
  //
  //     const user = await userRepository.getById(id);
  //     if (!user) {
  //       throw new ApiError("User not found", 404);
  //     }
  //
  //     next();
  //   } catch (e) {
  //     next(e);
  //   }
  // }

  // public isUserFound(req: Request, res: Response, next: NextFunction) {
  //   try {
  //
  //   } catch (e) {
  //     next(e);
  //   }
  // }
}

export const userMiddleware = new UserMiddleware();
