import React from "react";
import {
  Avatar,
  Button,
  Container,
  Grid,
  Typography,
  Modal,
  Fade,
} from "@mui/material";
import ReactLoading from "react-loading";
import { useDispatch, useSelector } from "react-redux";
import { accessToken, getDataAndRefreshToken, logout } from "../actions";
import ChangePassword from "../components/ChangePassword";
import Backdrop from "@mui/material/Backdrop";
import { Box } from "@mui/system";

const MyProfile = () => {
  const [open, setOpen] = React.useState(false);
  const [users, setUser] = React.useState();
  const myInfo = useSelector((state) => state.myInfoReducer);
  const myInfoRefresh = useSelector((state) => state.refreshTokenReducer);
  const dispatch = useDispatch();
  let firstRenders = true;

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const handleOpen = () => {
    return setOpen(true);
  };
  const handleClose = () => {
    return setOpen(false);
  };
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
    }, 14 * 60 * 1000); // 14 minutes
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
            sx={{ height: "70vh" }}
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={3}
              sx={{
                marginTop: "30px",
                display: "flex",
                justifyContent: "center",
              }}
            >
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
                  <Button
                    onClick={handleOpen}
                    variant={"contained"}
                    sx={{ marginTop: "10px" }}
                  >
                    Change Password
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <Box sx={style}>
                <ChangePassword setOpen={setOpen} />
              </Box>
            </Fade>
          </Modal>
        </Container>
      </main>
    </>
  );
};

export default MyProfile;
