import axios from "axios";

export const userlogin = async (email: string, password: string) => {
  const res = await axios.post(
    "https://the-open-ai-project.onrender.com/api/v1/user/login",
    { email, password },
    { withCredentials: true }
  );
  if (res.status !== 200) throw new Error("Unable to login");
  return res.data;
};

export const userSignup = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await axios.post(
    "https://the-open-ai-project.onrender.com/api/v1/user/signup",
    { name, email, password },
    { withCredentials: true }
  );
  if (res.status !== 200) throw new Error("Unable to signup");
  return res.data;
};

export const checkAuthStatus = async () => {
  const res = await axios.get(
    "https://the-open-ai-project.onrender.com/api/v1/user/auth-status",
    { withCredentials: true }
  );
  if (res.status !== 200) throw new Error("Unable to authenticate");
  return res.data;
};

export const sendChatRequest = async (message: string) => {
  const res = await axios.post(
    "https://the-open-ai-project.onrender.com/api/v1/chat/new",
    { message },
    { withCredentials: true }
  );
  if (res.status !== 200) throw new Error("Unable to send chat");
  return res.data;
};

export const getUserChats = async () => {
  const res = await axios.get(
    "https://the-open-ai-project.onrender.com/api/v1/chat/all-chats",

    { withCredentials: true }
  );
  if (res.status !== 200) throw new Error("Unable to send chats");
  return res.data;
};

export const deleteChats = async () => {
  const res = await axios.delete(
    "https://the-open-ai-project.onrender.com/api/v1/chat/delete",

    { withCredentials: true }
  );
  if (res.status !== 200) throw new Error("Unable to delete chat");
  return res.data;
};

export const logOutUser = async () => {
  const res = await axios.get(
    "https://the-open-ai-project.onrender.com/api/v1/user/delete",

    { withCredentials: true }
  );
  if (res.status !== 200) throw new Error("Unable to log out");
  return res.data;
};
