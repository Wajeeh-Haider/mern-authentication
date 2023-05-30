import React from "react";
import { Container, Typography, Grid, Button } from "@mui/material";

const MainHero = ({ myData }) => {
  return (
    <>
      <main>
        <div>
          <Container style={{ marginTop: "100px" }}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} sm={6} textAlign={"center"}>
                <Typography variant="h3" component="h1" gutterBottom>
                  House of Professionals
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                  We are a team of talented professionals making your life
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </div>
      </main>
    </>
  );
};

export default MainHero;
