import express from "express";
import * as user from "../controllers/userController.js"
import { authMiddleware } from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/user/register", user.createUserController);
userRouter.post('/user/login', user.loginUserController);
userRouter.get("/user/getUsers", authMiddleware, user.getAllUsersController)

export default userRouter;
