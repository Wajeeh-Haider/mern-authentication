import React from "react";
import { Avatar, Button, Container, Grid, Typography } from "@mui/material";
import ReactLoading from "react-loading";
import { useDispatch, useSelector } from "react-redux";
import { accessToken, getDataAndRefreshToken, logout } from "../actions";

const MyProfile = () => {
  const [users, setUser] = React.useState();
  const myInfo = useSelector((state) => state.myInfoReducer);
  const myInfoRefresh = useSelector((state) => state.refreshTokenReducer);
  const dispatch = useDispatch();
  let firstRenders = true;

  const sendRequests = () => {
    dispatch(accessToken());
    setUser(myInfo?.myData?.user);
  };

  const refreshToken = () => {
    dispatch(getDataAndRefreshToken());
    setUser(myInfoRefresh?.myData.user);
  };

  React.useEffect(() => {
    if (firstRenders) {
      firstRenders = false;
      sendRequests();
    }
  }, []);

  React.useEffect(() => {
    let interval = setInterval(() => {
      refreshToken();
    }, 4 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (!users)
    return (
      <ReactLoading
        type="bubbles"
        color="#1976D2"
        height="5%"
        width="5%"
        className="loader"
      />
    );

  return (
    <>
      <main>
        <Container>
          <Grid
            container
            spacing={4}
            justifyContent="center"
            alignItems={"center"}
            sx={{ margin: "auto", height: "70vh" }}
          >
            <Grid item xs={12} sm={12} md={3}>
              <Avatar
                style={{
                  width: "150px",
                  height: "150px",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <Typography
                component="h2"
                variant="h5"
                sx={{ marginTop: "10px" }}
              >
                Name: {users.fullName}
              </Typography>
              <Typography
                component="h2"
                variant="h5"
                sx={{ marginTop: "10px" }}
              >
                Address : {users.address}
              </Typography>
              <Typography
                component="h2"
                variant="h5"
                sx={{ marginTop: "10px" }}
              >
                Email : {users.email}
              </Typography>
              <Typography
                component="h2"
                variant="h5"
                sx={{ marginTop: "10px" }}
              >
                Status : {users.status}
              </Typography>
              <Grid container justifyContent={"space-between"}>
                <Grid item>
                  <Button variant={"contained"} sx={{ marginTop: "10px" }}>
                    Update
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant={"contained"} sx={{ marginTop: "10px" }}>
                    Change Password
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </main>
    </>
  );
};

export default MyProfile;
