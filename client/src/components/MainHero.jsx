import React from "react";
import { Container, Typography, Grid, Button } from "@mui/material";

const MainHero = ({ myData }) => {
  return (
    <>
      <main>
        <div>
          <Container
            maxWidth="xs"
            style={{ marginTop: "100px", marginBottom: "50px" }}
          >
            <Typography variant="h4" align="center" gutterBottom>
              {myData && myData.fullName}
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              <Grid item>
                <Button variant="contained">Hello There</Button>
              </Grid>
              <Grid item>
                <Button variant="outlined">Hi There</Button>
              </Grid>
            </Grid>
          </Container>
        </div>
      </main>
    </>
  );
};

export default MainHero;
