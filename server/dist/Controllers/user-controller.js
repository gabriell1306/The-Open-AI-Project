import User from "../Models/User.js";
import { compare, hash } from "bcrypt";
import { createToken } from "../Utilities/token-manager.js";
import { COOKIE_NAME } from "../Utilities/constants.js";
export const getAllUsers = async (req, res, next) => {
    // GET ALL USERS FROM DB
    try {
        const users = await User.find();
        return res.status(200).json({
            message: "OK",
            users,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "ERROR",
            cause: error.message,
        });
    }
};
export const userSignup = async (req, res, next) => {
    // USER SIGN UP
    try {
        const { name, email, password } = req.body;
        const existUser = await User.findOne({ email });
        if (existUser)
            return res.status(401).send("This Email Is Already registered");
        const hashedPaswword = await hash(password, 10);
        const user = new User({
            name,
            email,
            password: hashedPaswword,
        });
        await user.save();
        // res.clearCookie(COOKIE_NAME, {
        //   httpOnly: true,
        //   domain: "localhost",
        //   signed: true,
        //   path: "/",
        // });
        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });
        return res.status(200).json({
            message: "OK",
            email: user.email,
            name: user.name,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "ERROR",
            cause: error.message,
        });
    }
};
export const userLogin = async (req, res, next) => {
    // USER LOG IN
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user)
            return res.status(401).send("User is not registered");
        const isPastwordCorrect = await compare(password, user.password);
        if (!isPastwordCorrect)
            return res.status(403).send("Incorrect Password");
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });
        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });
        return res.status(200).json({
            message: "OK",
            email: user.email,
            name: user.name,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "ERROR",
            cause: error.message,
        });
    }
};
export const verifyUser = async (req, res, next) => {
    try {
        // USER TOKEN CHECK
        const user = await User.findById(res.locals.jwtData.id);
        if (!user)
            return res
                .status(401)
                .send("User is not registered OR Token Malufunctioned");
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissioned didn't match");
        }
        console.log(res.locals.jwtData.id, user._id.toString());
        return res.status(200).json({
            message: "OK",
            email: user.email,
            name: user.name,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "ERROR",
            cause: error.message,
        });
    }
};
export const logoutUser = async (req, res, next) => {
    try {
        // USER TOKEN CHECK
        const user = await User.findById(res.locals.jwtData.id);
        if (!user)
            return res
                .status(401)
                .send("User is not registered OR Token Malufunctioned");
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissioned didn't match");
        }
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });
        return res.status(200).json({
            message: "OK",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "ERROR",
            cause: error.message,
        });
    }
};
//# sourceMappingURL=user-controller.js.map