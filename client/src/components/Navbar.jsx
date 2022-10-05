import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  CssBaseline,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, logoutUser } from "../actions/index";
import FeedIcon from "@mui/icons-material/Feed";
import AccountCircle from "@mui/icons-material/AccountCircle";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const logoutRequest = () => {
    dispatch(logout());
    dispatch(logoutUser());
    Navigate("/");
    localStorage.clear();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <AppBar
        position="relative"
        style={{ position: "relative", top: 0, left: 0, margin: 0, zIndex: 1 }}
      >
        <Toolbar>
          <IconButton size="large" color="inherit">
            <FeedIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/home" style={{ textDecoration: "none", color: "white" }}>
              Mern Auth
            </Link>
          </Typography>

          {/* <Button color="inherit" onClick={logoutRequest}>
            Logout
          </Button> */}
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={(event) => setAnchorEl(event.currentTarget)}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <Link
                  to="/me"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Profile
                </Link>
              </MenuItem>
              <MenuItem onClick={logoutRequest}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
