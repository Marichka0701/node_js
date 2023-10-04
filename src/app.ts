import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/config";
import { userRouter } from "./routers/user.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 5000;

app.listen(5000, async () => {
  await mongoose.connect(`${configs.DB_URI}`);
  console.log(`Server running on PORT ${PORT}`);
});

app.use("/users", userRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  res.status(status).json(err.message);
});
