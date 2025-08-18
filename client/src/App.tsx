import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
import { useAuth } from "./context/AuthContext";
import Footer from "./components/Footer";
import "./index.css";
import "./app.css";

function App() {
  const auth = useAuth();

  return (
    <main>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {auth?.isLoggedIn && auth.user && (
          <Route path="/chat" element={<Chat />} />
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </main>
  );
}

export default App;
