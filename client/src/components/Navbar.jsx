import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../actions/index";

export default function Navbar({ users }) {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const logoutRequest = async () => {
    try {
      await axios
        .post("http://127.0.0.1:4000/logout", {
          withCredentials: true,
          credentials: "include",
        })
        .then((response) => {
          if (response.status === 200) {
            dispatch(logout());
          }
        })
        .then(() => {
          Navigate("/");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit" onClick={logoutRequest}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
