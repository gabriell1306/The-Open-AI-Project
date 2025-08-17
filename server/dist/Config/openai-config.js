// import { Configuration } from "openai";
// export const configureOpenAI = () => {
//   const config = new Configuration({
//     apiKey: process.env.OPEN_AI_SECRET,
//     organization: process.env.OPENAI_ORGANIZATION,
//   });
//   return config;
// };
import Groq from "groq-sdk";
export const configureGroq = () => {
    return new Groq({
        apiKey: process.env.GROQ_API_KEY,
    });
};
//# sourceMappingURL=openai-config.js.map