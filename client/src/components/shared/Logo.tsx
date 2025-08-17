import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <div
      style={{
        display: "flex",
        marginRight: "auto",
        alignItems: "center",
      }}
    >
      <Link to={"/"}>
        <img
          src="logo.png"
          alt="openai.png"
          width={"100%"}
          height={"70px"}
          // className="image-inverted"
        />
      </Link>

      <Typography
        sx={{
          display: { md: "block", sm: "none", xs: "none" },
          mr: "auto",
          ml: -2,
          fontWeight: "800",
          textShadow: "2px 2px 20px #000",
          fontSize: 18,
          letterSpacing: "4px",
          cursor: "default", // Không hiển thị dạng pointer hay text
          userSelect: "none", // Không cho bôi đen văn bản
        }}
      >
        - The openAI Project
      </Typography>
    </div>
  );
}

export default Logo;
