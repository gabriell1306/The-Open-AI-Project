import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Avatar, Box, Typography } from "@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

function extractCodeFromString(message: string) {
  if (message.includes("```")) {
    const blocks = message.split("```");
    return blocks;
  }
  return null;
}

function isCodeBlock(str: string) {
  return (
    str.includes("=") ||
    str.includes(";") ||
    str.includes("[") ||
    str.includes("]") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("#") ||
    str.includes("//")
  );
}

const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "assistant";
}) => {
  const messageBlocks = extractCodeFromString(content);
  const auth = useAuth();

  const renderText = (text: string, key: number) => (
    <Typography
      key={key}
      fontSize="20px"
      sx={{
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        overflowWrap: "break-word",
        textAlign: "left",
      }}
    >
      {text}
    </Typography>
  );

  return role === "assistant" ? (
    <Box
      sx={{
        display: "flex",
        p: 1,
        my: 1,
        bgcolor: "#004d5612",
        gap: 3,
      }}
    >
      <Avatar sx={{ ml: 0 }}>
        <img src="openai.png" alt="openai" width="30px" />
      </Avatar>

      <Box>
        {!messageBlocks && renderText(content, 0)}

        {messageBlocks &&
          messageBlocks.length > 0 &&
          messageBlocks.map((block, index) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter
                key={index}
                style={vscDarkPlus}
                language="javascript"
              >
                {block}
              </SyntaxHighlighter>
            ) : (
              renderText(block, index)
            )
          )}
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        p: 2,
        bgcolor: "#32415fff",
        my: 2,
        gap: 2,
      }}
    >
      <Avatar sx={{ ml: 0, color: "black" }}>
        {auth?.user?.name?.[0]}
        {auth?.user?.name?.split(" ")?.[1]?.[0]}
      </Avatar>
      <Box>{renderText(content, 0)}</Box>
    </Box>
  );
};

export default ChatItem;
