import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { red } from "@mui/material/colors";
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import {
  deleteChats,
  getUserChats,
  sendChatRequest,
} from "../helpers/api-communicator";
import toast from "react-hot-toast";

const chatmessages = [
  {
    role: "user",
    content: "Hello, who are you?",
  },
  {
    role: "assistant",
    content:
      "Hi! I’m your AI assistant, here to help you with any questions you have.",
  },
  {
    role: "user",
    content: "Can you recommend me a frontend framework?",
  },
  {
    role: "assistant",
    content:
      "Sure! If you enjoy building interactive UIs, I recommend ReactJS. It’s fast, flexible, and has a large community.",
  },
  {
    role: "user",
    content: "Thanks!",
  },
  {
    role: "assistant",
    content: "You’re welcome! Let me know if you need anything else.",
  },
  {
    role: "user",
    content: "Thanks!",
  },
  {
    role: "assistant",
    content: "You’re welcome! Let me know if you need anything else.",
  },
  {
    role: "user",
    content: "Thanks!",
  },
  {
    role: "assistant",
    content: "You’re welcome! Let me know if you need anything else.",
  },
  {
    role: "user",
    content: "Thanks!",
  },
  {
    role: "assistant",
    content: "You’re welcome! Let me know if you need anything else.",
  },
  {
    role: "user",
    content: "Thanks!",
  },
  {
    role: "assistant",
    content: "You’re welcome! Let me know if you need anything else.",
  },
  {
    role: "user",
    content: "Thanks!",
  },
  {
    role: "assistant",
    content: "You’re welcome! Let me know if you need anything else.",
  },
  {
    role: "user",
    content: "Thanks!",
  },
  {
    role: "assistant",
    content: "You’re welcome! Let me know if you need anything else.",
  },
  {
    role: "user",
    content: "Thanks!",
  },
  {
    role: "assistant",
    content: "You’re welcome! Let me know if you need anything else.",
  },
  {
    role: "user",
    content: "Thanks!",
  },
  {
    role: "assistant",
    content: "You’re welcome! Let me know if you need anything else.",
  },
  {
    role: "user",
    content: "Thanks!",
  },
  {
    role: "assistant",
    content: "You’re welcome! Let me know if you need anything else.",
  },
];

type Message = {
  role: "user" | "assistant";
  content: string;
};

function Chat() {
  const auth = useAuth();
  const naviagte = useNavigate();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  const handleSubmit = async () => {
    // console.log(inputRef.current?.value);
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage: Message = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);

    const chatData = await sendChatRequest(content);
    setChatMessages([...chatData.chats]);
  };

  const handleDeleteChat = async () => {
    try {
      toast.loading("Deleting Chats", { id: "deletechats" });
      await deleteChats();
      toast.success("Deleted Chats Successfully", { id: "deletechats" });
    } catch (error) {
      console.log(error);
      toast.error("Deleting chats failed", { id: "deletechats" });
    }
  };

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth?.user) {
      toast.loading("Loading Chats", { id: "loadchats" });
      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          toast.success("Successfully loaded chats", { id: "loadchats" });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Loading Failed", { id: "loadchats" });
        });
    }
  }, [auth]);

  useEffect(() => {
    if (!auth?.user) {
      return naviagte("/login");
    }
  }, [auth]);

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: {
            md: "flex",
            xs: "none",
            sm: "none",
          },
          flex: 0.2,
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "320px",
            bgcolor: "rgb(17,29,39)",
            borderRadius: 3,
            flexDirection: "column",
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "grey",
              color: "black",
              fontWeight: 700,
            }}
          >
            {auth?.user?.name?.[0]}
            {auth?.user?.name?.split(" ")?.[1]?.[0]}
            {/* <FaRegUser /> */}
          </Avatar>

          <Typography
            sx={{
              mx: "auto",
              fontFamily: "work sans",
            }}
          >
            You are talking to a Chatbox
          </Typography>

          <Typography
            sx={{
              mx: "auto",
              fontFamily: "work sans",
              my: 1,
              p: 2,
            }}
          >
            You can ask some questions related Knowledge, Business, Advices,
            Educaiton, etc. But avoid sharing personal information
          </Typography>
          <Button
            onClick={handleDeleteChat}
            sx={{
              width: "200px",
              color: "white",
              fontWeight: "700",
              borderRadius: 3,
              textTransform: "uppercase",
              mx: "auto",
              bgcolor: red[300],
              ":hover": {
                bgcolor: red.A400,
              },
            }}
          >
            clear conversation
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          px: 3,
          mt: -2,
        }}
      >
        <Typography
          sx={{
            fontSize: "40px",
            color: "white",
            mb: 2,
            mx: "auto",
          }}
        >
          Model - openai/gpt-oss-20b
        </Typography>

        <Box
          sx={{
            width: "100%",
            height: "60vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            scrollBehavior: "smooth",

            /* custom scrollbar */
            "&::-webkit-scrollbar": {
              width: "5px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#888",
              borderRadius: "8px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#555",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#f1f1f1",
            },

            /* Firefox */
            scrollbarWidth: "thin",
            scrollbarColor: "#888 #f1f1f1",
          }}
        >
          {chatMessages.map((chat, index) => (
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
        </Box>

        <div
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: 8,
            backgroundColor: "rgb(17,27,39)",
            display: "flex",
            margin: "auto",
            marginTop: "10px",
          }}
        >
          <input
            ref={inputRef}
            type="text"
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "10px",
              border: "none",
              outline: "none",
              color: " white",
              fontSize: "20px",
            }}
          />
          <IconButton
            onClick={handleSubmit}
            sx={{
              ml: "auto",
              color: "white",
            }}
          >
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
}

export default Chat;
