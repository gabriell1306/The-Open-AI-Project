import mongoose from "mongoose";
import { randomUUID } from "crypto";

const chatSchema = new mongoose.Schema({
  id: {
    type: String,
    default: randomUUID(),
  },
  //   TWO ROLES WHEN USING THE OPEN AI FOR ASSISTANCE - AI AND USER
  role: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  chats: [chatSchema],
});

export default mongoose.model("User", userSchema);
