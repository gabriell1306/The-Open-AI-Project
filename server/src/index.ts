import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import appRouter from "./Routes/index.js";
import { connectToDatabase } from "./db/connection.js";

config();

const app = express();
const PORT = process.env.PORT || 5000;

// MIDDLEWARES
app.use(
  cors({
    origin: "https://the-open-ai-project-site.onrender.com", // thay bằng domain frontend khi deploy
    credentials: true, // Cho phép gửi cookie
  })
);

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());

// Chỉ dùng trong development
app.use(morgan("dev"));

// ROUTES
app.use("/api/v1", appRouter);

// CONNECT DB & START SERVER
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        "SERVER IS RUNNING AND CONNECTED TO DATABASE on port " + PORT
      );
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });

app.get("/", (req, res) => {
  res.json({ message: "API is running 🚀" });
});
