import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { userMiddleware } from "../middlewares/user.middleware";

const router = Router();

router.get("", userController.getAll);
router.get(
  "/:id",
  commonMiddleware.isIdValid,
  userMiddleware.getByIdOrThrow,
  userController.getById,
);

router.post("", commonMiddleware.isUserValidForCreating, userController.create);

router.delete(
  "/:id",
  commonMiddleware.isIdValid,
  userMiddleware.getByIdOrThrow,
  userController.deleteById,
);

router.put(
  "/:id",
  commonMiddleware.isIdValid,
  commonMiddleware.isUserValidForUpdating,
  userController.updateById,
);

export const userRouter = router;
