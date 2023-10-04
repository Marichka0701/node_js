import joi from "joi";

import { regexConstants } from "../constants/regex.constants";
import { EGender } from "../enums/EGender";

export class UserValidator {
  static firstName = joi.string().min(2).max(50).trim();
  static age = joi.number().min(0).max(150);
  static gender = joi.valid(...Object.values(EGender));
  static email = joi.string().regex(regexConstants.EMAIL);
  static password = joi.string().regex(regexConstants.PASSWORD);

  static create = joi.object({
    name: this.firstName.required(),
    age: this.age.required(),
    gender: this.gender.required(),
    email: this.email.required(),
    password: this.password.required(),
  });

  static update = joi.object({
    name: this.firstName,
    age: this.age,
    gender: this.gender,
  });
}
