import { Button, Container, Grid } from "@mui/material";
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
                mt: 1,
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                height: "100vh",
              }}
            >
              <Grid
                item
                sx={{
                  mt: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <iframe src="https://embed.lottiefiles.com/animation/80698"></iframe>
                <br />
                <Link to="/" style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    sx={{
                      mt: 1,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      alignContent: "center",
                    }}
                    startIcon={<HomeIcon />}
                  >
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
