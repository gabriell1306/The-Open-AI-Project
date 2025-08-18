import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.tsx";
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.tsx";
import axios from "axios";
import { Toaster } from "react-hot-toast";

// AXIOS SẼ MẶC ĐỊNH LẤY BASEURL ĐỂ GIAO TIẾP
axios.defaults.baseURL = "https://the-open-ai-project.onrender.com/api/v1";

// Cho phép Axios tự động đính kèm cookie (ví dụ: chứa token)
// trong các request, kể cả khi frontend và backend khác domain.// (kể cả khi frontend và backend ở 2 domain khác nhau).
axios.defaults.withCredentials = true;

const theme = createTheme({
  typography: {
    fontFamily: "Roboto Slab, serif",
    allVariants: {
      color: "white",
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Toaster position="top-right" />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
