import express from "express";
import {
  getCurrentUser,
  loginController,
  registerController,
} from "../controllers/PublicController.js";
import { authMiddleware } from "../middlewares/authMIddleware.js";

const userRouter = express.Router();

userRouter.post("/register", registerController);
userRouter.post("/login", loginController);
userRouter.get("/me", authMiddleware, getCurrentUser);
export default userRouter;
