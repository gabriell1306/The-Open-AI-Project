import { Box } from "@mui/material";
import { TypingAnimation } from "../components/typer/TypingAnimation";

function Home() {
  // const theme = useTheme();
  // const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));
  // useMediaQuery;
  return (
    <Box width={"100%"} height={"100%"}>
      <Box
        display={"flex"}
        width={"100%"}
        flexDirection={"column"}
        alignItems={"center"}
        mx={"auto"}
        mt={3}
      >
        <Box>
          <TypingAnimation />
        </Box>

        {/* <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: { md: "row", xs: "column", sm: "column" },
            gap: { md: 55, xs: 10 },
            alignItems: "center",
            justifyContent: "center",
            my: 10,
          }}
        >
          <img
            style={{ width: "350px", height: "100%" }}
            src="/image-removebg-preview.png"
            alt=""
          />
          <img
            className="image-inverted"
            style={{ width: "220px", height: "100%" }}
            src="/openai-Photoroom.png"
            alt=""
          />
        </Box> */}

        <Box
          sx={{
            display: "flex",
            width: "100%",
            mx: "auto",
            mt: 10,
          }}
        >
          <img
            src="Screenshot4.png"
            alt=""
            style={{
              display: "flex",
              margin: "auto",
              width: "60%",
              borderRadius: 20,
              boxShadow: "-5px -5px 105px #D8DEE9",
              marginTop: 20,
              marginBottom: 20,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
