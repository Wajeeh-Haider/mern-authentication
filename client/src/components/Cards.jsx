import React from "react";
import {
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActions,
} from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const Cards = () => {
  const renderGrid = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <>
      <main>
        <div>
          <Container>
            <Grid container spacing={4}>
              {renderGrid.map((items) => {
                return (
                  <Grid
                    item
                    sm={6}
                    xs={12}
                    md={4}
                    key={items}
                    style={{ marginTop: "50px" }}
                  >
                    <Card>
                      <CardMedia
                        component="img"
                        image="https://source.unsplash.com/random"
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography variant="h5" gutterBottom>
                          Hi there I make a card
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Lizards are a widespread group of squamate reptiles,
                          with over 6,000 species, ranging across all continents
                          except Antarctica
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button variant="contained">Share</Button>
                        <Button
                          variant="outlined"
                          endIcon={<ArrowRightAltIcon />}
                        >
                          Learn More
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Container>
        </div>
      </main>
    </>
  );
};

export default Cards;
