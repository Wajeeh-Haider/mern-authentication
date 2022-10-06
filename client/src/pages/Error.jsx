import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import HomeIcon from "@mui/icons-material/Home";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Error = () => {
  const isLogged = useSelector((state) => state.authReducer);
  const myInfo = useSelector((state) => state.getMyInfoReducer);
  const myInfoRefresh = useSelector((state) => state.refreshTokenReducer);
  const { error } = myInfo;
  const { error: refreshError } = myInfoRefresh;
  error === null;
  refreshError === null;
  return (
    <>
      <Container>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "80vh" }}
        >
          <Typography>Error 404 Page Not Found</Typography>
          <Link
            to={isLogged.isAuthenticated ? "/home" : "/"}
            style={{ textDecoration: "none" }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{ color: "white" }}
              startIcon={<HomeIcon />}
            >
              Go to Home Page
            </Button>
          </Link>
        </Grid>
      </Container>
    </>
  );
};

export default Error;
