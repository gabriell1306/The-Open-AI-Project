import User from "../Models/User.js";
import { compare, hash } from "bcryptjs"; // Sử dụng bcryptjs để tránh lỗi native module
import { createToken } from "../Utilities/token-manager.js";
import { COOKIE_NAME } from "../Utilities/constants.js";
// LẤY TOÀN BỘ NGƯỜI DÙNG TỪ DATABASE
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find(); // Truy vấn tất cả người dùng
        return res.status(200).json({ message: "OK", users });
    }
    catch (error) {
        console.error("Get users error:", error); // Ghi log lỗi
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};
// ĐĂNG KÝ NGƯỜI DÙNG MỚI
export const userSignup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        // Kiểm tra email đã tồn tại chưa
        const existUser = await User.findOne({ email });
        if (existUser)
            return res.status(401).send("Email đã được đăng ký");
        // Mã hóa mật khẩu
        const hashedPassword = await hash(password, 10);
        // Tạo người dùng mới
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        // Tạo token đăng nhập
        const token = createToken(user._id.toString(), user.email, "7d");
        // Thiết lập thời gian hết hạn cookie
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        // Gửi cookie chứa token về client
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            expires,
            httpOnly: true,
            signed: true,
        });
        return res
            .status(200)
            .json({ message: "OK", email: user.email, name: user.name });
    }
    catch (error) {
        console.error("Signup error:", error); // Ghi log lỗi
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};
// ĐĂNG NHẬP NGƯỜI DÙNG
export const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // Tìm người dùng theo email
        const user = await User.findOne({ email });
        if (!user)
            return res.status(401).send("Người dùng chưa đăng ký");
        // So sánh mật khẩu
        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect)
            return res.status(403).send("Sai mật khẩu");
        // Xóa cookie cũ nếu có
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            signed: true,
            path: "/",
        });
        // Tạo token mới
        const token = createToken(user._id.toString(), user.email, "7d");
        // Thiết lập thời gian hết hạn cookie
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        // Gửi cookie chứa token về client
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            expires,
            httpOnly: true,
            signed: true,
        });
        return res
            .status(200)
            .json({ message: "OK", email: user.email, name: user.name });
    }
    catch (error) {
        console.error("Login error:", error); // Ghi log lỗi
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};
// KIỂM TRA TOKEN NGƯỜI DÙNG
export const verifyUser = async (req, res, next) => {
    try {
        // Tìm người dùng theo ID từ token
        const user = await User.findById(res.locals.jwtData.id);
        if (!user)
            return res.status(401).send("Người dùng không tồn tại hoặc token lỗi");
        // Kiểm tra quyền truy cập
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Không có quyền truy cập");
        }
        return res
            .status(200)
            .json({ message: "OK", email: user.email, name: user.name });
    }
    catch (error) {
        console.error("Verify error:", error); // Ghi log lỗi
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};
// ĐĂNG XUẤT NGƯỜI DÙNG
export const logoutUser = async (req, res, next) => {
    try {
        // Tìm người dùng theo ID từ token
        const user = await User.findById(res.locals.jwtData.id);
        if (!user)
            return res.status(401).send("Người dùng không tồn tại hoặc token lỗi");
        // Kiểm tra quyền truy cập
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Không có quyền truy cập");
        }
        // Xóa cookie đăng nhập
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            signed: true,
            path: "/",
        });
        return res.status(200).json({ message: "OK" });
    }
    catch (error) {
        console.error("Logout error:", error); // Ghi log lỗi
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};
//# sourceMappingURL=user-controller.js.map