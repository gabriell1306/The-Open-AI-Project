import { Router } from "express";
import {
  getAllUsers,
  logoutUser,
  userLogin,
  userSignup,
  verifyUser,
} from "../Controllers/user-controller.js";
import {
  loginValidator,
  signupValidator,
  validate,
} from "../Utilities/validators.js";
import { verifyToken } from "../Utilities/token-manager.js";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(signupValidator), userSignup);
userRoutes.post("/login", validate(loginValidator), userLogin);
userRoutes.get("/auth-status", verifyToken, verifyUser);
userRoutes.get("/delete", verifyToken, logoutUser);

export default userRoutes;
