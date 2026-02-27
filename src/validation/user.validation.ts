import Joi, { object } from "joi";
import { IUser } from "../models/types/user";

export const validateUser = (object: IUser) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(object);
};

export const validateUserLogin = (object: IUser) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    return schema.validate(object);
}

export const validateUserUpdate = (object: IUser) => {
    const schema = Joi.object({
        username: Joi.string().optional(),
        email: Joi.string().email().optional(),
        password: Joi.string().optional(),
    });
    return schema.validate(object);
}

