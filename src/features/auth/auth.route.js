import express from "express";
import { LoginUserSchema, RegisterUserSchema } from "../users/users.schema.js";
import * as authController from "./auth.controller.js";
import validate from "../../middlewares/validations.middleware.js";

const router = express.Router();

router.post(
  "/register",
  validate({ bodySchema: RegisterUserSchema }),
  authController.register
);

router.post(
  "/login",
  validate({ bodySchema: LoginUserSchema }),
  authController.login
);

export default router;
