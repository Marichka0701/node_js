import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { ApiError } from "../errors/api.error";
import { UserValidator } from "../validators/user.validator";

class CommonMiddleware {
  public async isIdValid(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (!mongoose.isObjectIdOrHexString(id)) {
        throw new ApiError("Not valid ID", 400);
      }

      next();
    } catch (e) {
      next(e);
    }
  }

  public async isUserValidForCreating(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { error, value } = UserValidator.create.validate(req.body);

      if (error) {
        throw new ApiError(error.message, 400);
      }

      if (req.res) {
        req.res.locals = value;
      }

      next();
    } catch (e) {
      next(e);
    }
  }

  public async isUserValidForUpdating(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { error, value } = UserValidator.update.validate(req.body);

      if (error) {
        throw new ApiError(error.message, 400);
      }

      if (req.res) {
        req.res.locals = value;
      }

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const commonMiddleware = new CommonMiddleware();
