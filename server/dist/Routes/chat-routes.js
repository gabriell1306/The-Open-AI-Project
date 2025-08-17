"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const token_manager_js_1 = require("../Utilities/token-manager.js");
const validators_js_1 = require("../Utilities/validators.js");
const chat_controller_js_1 = require("../Controllers/chat-controller.js");
// PROTECTED API
const chatRoutes = (0, express_1.Router)();
chatRoutes.post("/new", (0, validators_js_1.validate)(validators_js_1.chatComppleteValidator), token_manager_js_1.verifytoken, chat_controller_js_1.generateChatCompletion);
chatRoutes.get("/all-chats", token_manager_js_1.verifytoken, chat_controller_js_1.sendChatsToUser);
chatRoutes.delete("/delete", token_manager_js_1.verifytoken, chat_controller_js_1.deleteChats);
exports.default = chatRoutes;
