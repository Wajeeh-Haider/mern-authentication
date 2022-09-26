import React from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Button, Grid, Typography, TextField, Container } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";

const SignUp = () => {
  const Navigate = useNavigate();
  const [Input, setInput] = React.useState({
    fullName: "",
    email: "",
    password: "",
    address: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, email, password, address } = Input;
    if (fullName === "" || email === "" || password === "" || address === "") {
      toast.error("Please Fill All The Fields");
    } else if (!validator.isEmail(email)) {
      toast.error("Please Enter Valid Email");
    } else {
      await axios
        .post("http://127.0.0.1:4000/create/user/", {
          fullName,
          email,
          password,
          address,
        })
        .then((response) => {
          if (response.status === 201) {
            toast.success("You are Registered Successfully");
            setInput({
              fullName: "",
              email: "",
              password: "",
              address: "",
            });
            Navigate("/");
          }
        })
        .catch((error) => {
          if (error.response.status === 400) {
            toast.error(
              "User Already Exists Please Sign Up with Another Email"
            );
          } else {
            toast.error("Something Went Wrong");
          }
        });
    }
  };

  const handleInput = (e) => {
    setInput({ ...Input, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Container fixed>
        <Toaster position="top-right" />
        <Typography component="h1" variant="h3" sx={{ textAlign: "center" }}>
          Sign up
        </Typography>
        <Grid
          container
          spacing={10}
          component="form"
          onSubmit={handleSubmit}
          marginTop="8"
          justifyContent={"center"}
          alignItems={"center"}
          sx={{
            marginTop: "10px",
          }}
        >
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <img
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8bGFwdG9wfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt="Image"
              width="100%"
              style={{ borderRadius: "10px" }}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              margin="normal"
              fullWidth
              id="fullName"
              label="Full Name"
              name="fullName"
              autoFocus
              autoComplete="off"
              onChange={handleInput}
              value={Input.fullName}
            />

            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              autoComplete="off"
              onChange={handleInput}
              value={Input.email}
            />

            <TextField
              margin="normal"
              fullWidth
              id="address"
              label="Address"
              name="address"
              autoFocus
              autoComplete="off"
              onChange={handleInput}
              value={Input.address}
            />

            <TextField
              margin="normal"
              fullWidth
              id="password"
              label="Password"
              name="password"
              type="password"
              autoFocus
              autoComplete="off"
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
                  <Button variant="outlined">Forgot password?</Button>
                </Link>
              </Grid>
              <Grid item>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <Button variant="outlined">
                    Already have an account? Sign In
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

export default SignUp;
