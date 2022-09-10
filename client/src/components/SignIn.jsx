import React from "react";
import {
  Container,
  Button,
  Grid,
  Typography,
  TextField,
  Box,
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../actions";

const SignIn = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [Input, setInput] = React.useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    return setInput({ ...Input, [e.target.name]: e.target.value });
  };

  const SigninRequest = async () => {
    try {
      if (Input.email === "" || Input.password === "") {
        toast.error("Please Fill All The Fields");
      } else {
        await axios
          .post("http://127.0.0.1:4000/login", {
            email: Input.email,
            password: Input.password,
          })
          .then((response) => {
            if (response.status === 200) {
              dispatch(login());
              Navigate("/home");
            }
          });
      }
    } catch (error) {
      if (error?.response?.status === 404) {
        toast.error("Invalid Credentials! Sign Up to Continue :)");
      } else if (error?.response?.status === 400) {
        toast.error("Please Verify Your Email");
      } else {
        toast.error("Something Went Wrong");
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    SigninRequest();
  };

  const forgetPassword = () => {
    toast.success("This feature will be added soon");
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Toaster toastOptions={{ position: "top-right" }} gutter={8} />

      <Container fixed>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h4">
            Sign in
          </Typography>
          <Box
            component="form"
            marginTop="8"
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              value={Input.email}
              onChange={handleInput}
            />
            <TextField
              margin="normal"
              fullWidth
              id="password"
              label="Password"
              name="password"
              type="password"
              value={Input.password}
              onChange={handleInput}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Button variant="outlined" onClick={forgetPassword}>
                  Forgot password?
                </Button>
              </Grid>
              <Grid item>
                <Link to="/sign-up" style={{ textDecoration: "none" }}>
                  <Button variant="outlined">
                    {"Don't have an account? Sign Up"}
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default SignIn;
