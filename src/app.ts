import express, { Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/config";
import { User } from "./models/User.model";
import { IUser } from "./types/user.type";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 5000;

app.listen(5000, async () => {
  await mongoose.connect(`${configs.DB_URI}`);
  console.log(`Server running on PORT ${PORT}`);
});

app.get(
  "/users",
  async (req: Request, res: Response): Promise<Response<IUser[]>> => {
    const users = await User.find();
    return res.json(users);
  },
);

app.post(
  "/users",
  async (req: Request, res: Response): Promise<Response<IUser>> => {
    const createdUser = req.body;
    await User.create({ ...createdUser });

    return res.json(createdUser);
  },
);

app.delete(
  "/users/:email",
  async (req: Request, res: Response): Promise<Response<IUser>> => {
    const { email } = req.params;
    const deletedUser = await User.deleteOne({ email });

    return res.json(deletedUser);
  },
);

app.put(
  "/users:/email",
  async (req: Request, res: Response): Promise<Response<IUser>> => {
    const updatedUser = req.body;
    const { email } = req.params;

    await User.findOneAndUpdate({ email }, { ...updatedUser });
    return res.json(updatedUser);
  },
);
