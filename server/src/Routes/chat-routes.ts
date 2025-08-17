import { Router } from "express";
import { verifytoken } from "../Utilities/token-manager.js";
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
  verifytoken,
  generateChatCompletion
);

chatRoutes.get("/all-chats", verifytoken, sendChatsToUser);
chatRoutes.delete("/delete", verifytoken, deleteChats);

export default chatRoutes;
