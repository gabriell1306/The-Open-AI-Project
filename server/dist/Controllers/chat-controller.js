"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteChats = exports.sendChatsToUser = exports.generateChatCompletion = void 0;
const User_js_1 = __importDefault(require("../Models/User.js"));
const openai_config_js_1 = require("../Config/openai-config.js");
const generateChatCompletion = async (req, res, next) => {
    try {
        const { message } = req.body;
        // Check message hợp lệ
        if (!message || !message.trim()) {
            return res.status(400).json({ message: "Message cannot be empty" });
        }
        // Tìm user
        const user = await User_js_1.default.findById(res.locals.jwtData.id);
        if (!user) {
            return res
                .status(401)
                .json({ message: "User not registered or token invalid" });
        }
        // Chuyển lịch sử chat từ DB sang định dạng Groq yêu cầu
        const chats = user.chats.map((chat) => ({
            role: chat.role,
            content: chat.content,
        }));
        // Thêm tin nhắn mới từ user
        chats.push({ role: "user", content: message });
        user.chats.push({ role: "user", content: message });
        // Khởi tạo Groq SDK
        const groq = (0, openai_config_js_1.configureGroq)();
        // Gọi API Groq
        const chatResponse = await groq.chat.completions.create({
            model: "llama3-8b-8192", // Bạn có thể đổi sang llama3-70b-8192 nếu muốn
            messages: chats,
            temperature: 0.7,
        });
        // Lấy tin nhắn trả về từ AI
        const aiMessage = chatResponse.choices[0].message;
        // Lưu vào DB
        user.chats.push({
            role: aiMessage.role,
            content: aiMessage.content || "",
        });
        await user.save();
        // Trả về toàn bộ lịch sử chat
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.error("Groq chat error:", error);
        return res.status(500).json({
            message: "Something went wrong with Groq",
            details: error.message || error,
        });
    }
};
exports.generateChatCompletion = generateChatCompletion;
const sendChatsToUser = async (req, res, next) => {
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
            chats: user.chats,
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
exports.sendChatsToUser = sendChatsToUser;
const deleteChats = async (req, res, next) => {
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
        // @ts-ignore
        user.chats = [];
        await user.save();
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
exports.deleteChats = deleteChats;
