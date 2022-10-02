import { Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";

const SessionTimeout = () => {
  return (
    <>
      <div>
        <main>
          <Container>
            <Grid
              container
              spacing={8}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <Grid item>
                <Typography variant="h3">Session Timeout</Typography>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <Button variant="contained" startIcon={<HomeIcon />}>
                    Back To Home
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Container>
        </main>
      </div>
    </>
  );
};

export default SessionTimeout;
