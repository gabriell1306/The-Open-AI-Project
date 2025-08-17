"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.verifyUser = exports.userLogin = exports.userSignup = exports.getAllUsers = void 0;
const User_js_1 = __importDefault(require("../Models/User.js"));
const bcrypt_1 = require("bcrypt");
const token_manager_js_1 = require("../Utilities/token-manager.js");
const constants_js_1 = require("../Utilities/constants.js");
const getAllUsers = async (req, res, next) => {
    // GET ALL USERS FROM DB
    try {
        const users = await User_js_1.default.find();
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
exports.getAllUsers = getAllUsers;
const userSignup = async (req, res, next) => {
    // USER SIGN UP
    try {
        const { name, email, password } = req.body;
        const existUser = await User_js_1.default.findOne({ email });
        if (existUser)
            return res.status(401).send("This Email Is Already registered");
        const hashedPaswword = await (0, bcrypt_1.hash)(password, 10);
        const user = new User_js_1.default({
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
        const token = (0, token_manager_js_1.createToken)(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(constants_js_1.COOKIE_NAME, token, {
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
exports.userSignup = userSignup;
const userLogin = async (req, res, next) => {
    // USER LOG IN
    try {
        const { email, password } = req.body;
        const user = await User_js_1.default.findOne({ email });
        if (!user)
            return res.status(401).send("User is not registered");
        const isPastwordCorrect = await (0, bcrypt_1.compare)(password, user.password);
        if (!isPastwordCorrect)
            return res.status(403).send("Incorrect Password");
        res.clearCookie(constants_js_1.COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });
        const token = (0, token_manager_js_1.createToken)(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(constants_js_1.COOKIE_NAME, token, {
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
exports.userLogin = userLogin;
const verifyUser = async (req, res, next) => {
    try {
        // USER TOKEN CHECK
        const user = await User_js_1.default.findById(res.locals.jwtData.id);
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
exports.verifyUser = verifyUser;
const logoutUser = async (req, res, next) => {
    try {
        // USER TOKEN CHECK
        const user = await User_js_1.default.findById(res.locals.jwtData.id);
        if (!user)
            return res
                .status(401)
                .send("User is not registered OR Token Malufunctioned");
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissioned didn't match");
        }
        res.clearCookie(constants_js_1.COOKIE_NAME, {
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
exports.logoutUser = logoutUser;
