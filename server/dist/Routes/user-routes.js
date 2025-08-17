import { Router } from "express";
import { getAllUsers, logoutUser, userLogin, userSignup, verifyUser, } from "../Controllers/user-controller.js";
import { loginValidator, signupValidator, validate, } from "../Utilities/validators.js";
import { verifytoken } from "../Utilities/token-manager.js";
const userRoutes = Router();
userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(signupValidator), userSignup);
userRoutes.post("/login", validate(loginValidator), userLogin);
userRoutes.get("/auth-status", verifytoken, verifyUser);
userRoutes.get("/delete", verifytoken, logoutUser);
export default userRoutes;
//# sourceMappingURL=user-routes.js.map