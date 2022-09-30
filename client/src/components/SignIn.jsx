import React from "react";
import { Container, Button, Grid, Typography, TextField } from "@mui/material";
import validator from "validator";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import { SigninRequest } from "../actions";

const SignIn = () => {
  const [Input, setInput] = React.useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const isLogged = useSelector((state) => state.authReducer);
  const userLogin = useSelector((state) => state.loginReducer);

  const matches = useMediaQuery("(min-width:1200px)");
  const query = useMediaQuery("(min-width:346px)");

  const handleInput = (e) => {
    return setInput({ ...Input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = Input;
    if (email === "" || password === "") {
      toast.error("Please Fill All The Fields");
    } else if (!validator.isEmail(email)) {
      toast.error("Please Enter Valid Email");
    } else {
      dispatch(SigninRequest(email, password));
    }
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
