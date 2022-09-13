import React from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Button, Grid, Typography, TextField, Container } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import validator from "validator";
import { ValidationGroup, Validate, AutoDisabler } from "mui-validate";

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
  console.log(Validate);
  return (
    <>
      <Container fixed>
        <Toaster position="top-right" />
        <ValidationGroup>
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
              <Validate
                name="fullName"
                required={[true, "Please enter your name"]}
                regex={[/^[A-Z a-z]+$/, "Please enter a valid name"]}
                custom={[
                  (value) => value.length >= 3,
                  "name cannot be less than 3 characters",
                ]}
              >
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
              </Validate>
              <Validate
                name="email"
                required={[true, "Please enter your email"]}
                regex={[
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  "Please enter a valid email",
                ]}
              >
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
              </Validate>
              <Validate
                name="address"
                required={[true, "Please enter your address"]}
              >
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
              </Validate>
              <Validate
                name="password"
                required={[true, "Please enter your password"]}
                custom={[
                  (value) => value.length >= 6,
                  "password must be at least 6 characters",
                ]}
              >
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
              </Validate>
              <AutoDisabler>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
              </AutoDisabler>
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
        </ValidationGroup>
      </Container>
    </>
  );
};

export default SignUp;
