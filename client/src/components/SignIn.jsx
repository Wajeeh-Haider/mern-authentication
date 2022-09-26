import React from "react";
import {
  Container,
  Button,
  Grid,
  Typography,
  TextField,
  Box,
} from "@mui/material";
import validator from "validator";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions";
import useMediaQuery from "@mui/material/useMediaQuery";

const SignIn = () => {
  const isLogged = useSelector((state) => state.authReducer);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [Input, setInput] = React.useState({
    email: "",
    password: "",
  });
  const matches = useMediaQuery("(min-width:1200px)");
  const query = useMediaQuery("(min-width:346px)");

  matches ? console.log(true) : console.log(false);

  const handleInput = (e) => {
    return setInput({ ...Input, [e.target.name]: e.target.value });
  };

  const SigninRequest = async () => {
    try {
      const { email, password } = Input;
      if (email === "" || password === "") {
        toast.error("Please Fill All The Fields");
        if (!validator.isEmail(email)) {
          toast.error("Please Enter Valid Email");
        }
      } else {
        await axios
          .post("http://127.0.0.1:4000/login", {
            email,
            password,
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
      } else if (error?.response?.status === 406) {
        toast.error("Please Enter Correct Password");
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

  React.useEffect(() => {
    isLogged.isAuthenticated ? Navigate("/home") : Navigate("/");
  }, [isLogged]);
  return (
    <>
      <Toaster toastOptions={{ position: "top-right" }} gutter={8} />
      <Container fixed>
        <Typography
          component="h1"
          variant="h3"
          sx={{ textAlign: "center", marginTop: "50px", marginBottom: "30px" }}
        >
          Sign in
        </Typography>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ height: "60vh" }}
          xs={{ direction: "row-reverse" }}
        >
          <Grid item sm={12} xs={12} md={6}>
            <img
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8bGFwdG9wfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt="Image"
              width="100%"
              style={{ borderRadius: "10px" }}
            />
          </Grid>
          <Grid
            item
            sm={12}
            xs={12}
            md={6}
            component="form"
            onSubmit={handleSubmit}
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

            <Grid
              container
              justifyContent={!matches ? "center" : "space-between"}
            >
              <Grid
                item
                sx={{
                  marginTop: !matches ? "20px" : "0px",
                  marginRight: !matches ? "10px" : "0px",
                }}
              >
                <Button variant="outlined" onClick={forgetPassword}>
                  Forgot password?
                </Button>
              </Grid>
              <Grid
                item
                sx={{
                  marginTop: !matches ? "20px" : "0px",
                  marginLeft: !matches ? "10px" : "0px",
                }}
              >
                <Link to="/sign-up" style={{ textDecoration: "none" }}>
                  <Button variant="outlined" size={!query ? "small" : ""}>
                    {"Don't have an account? Sign Up"}
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default SignIn;
