"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const index_js_1 = __importDefault(require("./Routes/index.js"));
const connection_js_1 = require("./db/connection.js");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// MIDDLEWARES
app.use((0, cors_1.default)({
    origin: "http://localhost:5173", // thay bằng domain frontend khi deploy
    credentials: true, // Cho phép gửi cookie
}));
app.use((0, cookie_parser_1.default)(process.env.COOKIE_SECRET));
app.use(express_1.default.json());
// Chỉ dùng trong development
app.use((0, morgan_1.default)("dev"));
// ROUTES
app.use("/api/v1", index_js_1.default);
// CONNECT DB & START SERVER
(0, connection_js_1.connectToDatabase)()
    .then(() => {
    app.listen(PORT, () => {
        console.log("SERVER IS RUNNING AND CONNECTED TO DATABASE on port " + PORT);
    });
})
    .catch((err) => {
    console.error("Database connection failed:", err);
});
