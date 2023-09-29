import { model, Schema } from "mongoose";

import { EGender } from "../enums/EGender";

const userSchema = new Schema({
  name: {
    type: String,
  },
  age: {
    type: Number,
    min: [1, "min age is 1"],
    max: [150, "max age is 150"],
  },
  gender: {
    type: String,
    enum: EGender,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const User = model("user", userSchema);
