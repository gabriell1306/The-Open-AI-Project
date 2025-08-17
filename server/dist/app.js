import express from "express";
import morgan from "morgan";
import appRouter from "./Routes/index.js";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import cors from "cors";
config();
const app = express();
// MIDDLEWARES
app.use(cors({
    origin: "https://the-open-ai-project.vercel.app/", // hoặc domain frontend của bạn
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Cho phép gửi cookie
}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());
// ITS MEAN THIS APP USING THE JSON IN AND OUTCOMING
// AND THEN WE WILL USE PARSE TO CONVERT JSON TO JS
// REMOVE THIS WHEN THIS APPLICATION IS MOVE TO PRODUCTION
app.use(morgan("dev"));
app.use("/api/v1", appRouter);
export { app };
//# sourceMappingURL=app.js.map