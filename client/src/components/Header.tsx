import { AppBar, IconButton, Toolbar } from "@mui/material";
import Logo from "./shared/Logo";
import { useAuth } from "../context/AuthContext";
import NavigationLink from "./shared/NavigationLink";

function Header() {
  const auth = useAuth();

  return (
    <div>
      <AppBar
        sx={{
          bgcolor: "transparent",
          position: "static",
          boxShadow: "none",
          mt: -4,
        }}
      >
        <Toolbar sx={{ display: "flex" }}>
          <Logo />

          <div>
            {auth?.isLoggedIn ? (
              <>
                <NavigationLink
                  bg="#EDEDED"
                  to="/chat"
                  text="Go to chat"
                  textColor="#363537"
                />

                <NavigationLink
                  bg="#6488c6ff"
                  to="/"
                  text="logout"
                  textColor="#f0f2f7ff"
                  onClick={auth.logout}
                />
              </>
            ) : (
              <>
                <NavigationLink
                  bg="#EDEDED"
                  to="/login"
                  text="Login"
                  textColor="#363537"
                />

                <NavigationLink
                  bg="#6488c6ff"
                  to="/signup"
                  text="sign up"
                  textColor="#f0f2f7ff"
                />
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
