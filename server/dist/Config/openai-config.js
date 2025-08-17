"use strict";
// import { Configuration } from "openai";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureGroq = void 0;
// export const configureOpenAI = () => {
//   const config = new Configuration({
//     apiKey: process.env.OPEN_AI_SECRET,
//     organization: process.env.OPENAI_ORGANIZATION,
//   });
//   return config;
// };
const groq_sdk_1 = __importDefault(require("groq-sdk"));
const configureGroq = () => {
    return new groq_sdk_1.default({
        apiKey: process.env.GROQ_API_KEY,
    });
};
exports.configureGroq = configureGroq;
