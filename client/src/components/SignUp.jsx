import React from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Button, Grid, Typography, TextField, Container } from "@mui/material";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [Input, setInput] = React.useState({
    fullName: "",
    email: "",
    password: "",
    address: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, address, fullName } = Input;
    try {
      const response = await axios.post("http://127.0.0.1:4000/create/user/", {
        fullName,
        email,
        password,
        address,
      });
      if (response.status === 201) {
        toast.success("You are Registered Successfully");
        setInput({
          fullName: "",
          email: "",
          password: "",
          address: "",
        });
      }
    } catch (error) {
      if (error.response.status === 400) {
        toast.error("User Already Exists Please Sign Up with Another Email");
      } else {
        toast.error("Something Went Wrong");
      }
    }
  };
  const handleInput = (e) => {
    return setInput({ ...Input, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Container fixed>
        <Toaster position="top-right" />

        <Grid
          container
          spacing={2}
          component="form"
          onSubmit={handleSubmit}
          marginTop="8"
          sx={{
            mt: 1,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            height: "100vh",
          }}
        >
          <Grid item lg={6} md={6} sm={10} xs={12}>
            <Typography component="h1" variant="h4" align="center">
              Sign up
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="fullName"
              label="Full Name"
              name="fullName"
              autoComplete="fullName"
              autoFocus
              onChange={handleInput}
              value={Input.name}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleInput}
              value={Input.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="address"
              label="Address"
              name="address"
              autoComplete="address"
              autoFocus
              onChange={handleInput}
              value={Input.address}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              autoComplete="password"
              type="password"
              autoFocus
              onChange={handleInput}
              value={Input.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to={"/"} style={{ textDecoration: "none" }}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/" style={{ textDecoration: "none" }}>
                  Already have an account? Sign In
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default SignUp;
