import { Router } from "express";
import { verifyToken } from "../Utilities/token-manager.js";
import { chatComppleteValidator, validate } from "../Utilities/validators.js";
import {
  deleteChats,
  generateChatCompletion,
  sendChatsToUser,
} from "../Controllers/chat-controller.js";

// PROTECTED API
const chatRoutes = Router();
chatRoutes.post(
  "/new",
  validate(chatComppleteValidator),
  verifyToken,
  generateChatCompletion
);

chatRoutes.get("/all-chats", verifyToken, sendChatsToUser);
chatRoutes.delete("/delete", verifyToken, deleteChats);

export default chatRoutes;
