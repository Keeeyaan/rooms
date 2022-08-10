import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { AppBar, Toolbar, Typography, Box, IconButton } from "@mui/material";
import BlurOnIcon from "@mui/icons-material/BlurOn";

import HeaderLoggedIn from "./HeaderLoggedIn";
import HeaderLoggedOut from "./HeaderLoggedOut";
import HeaderRoom from "./HeaderRoom";

const Header = () => {
  const isLoggedIn = useSelector((state) => state.auth.user);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            component={Link}
            to={"/"}
          >
            <BlurOnIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            ROOMS
          </Typography>

          <Box>
            {isLoggedIn ? (
              <>
                <HeaderRoom />
                <HeaderLoggedIn />
              </>
            ) : (
              <HeaderLoggedOut />
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
