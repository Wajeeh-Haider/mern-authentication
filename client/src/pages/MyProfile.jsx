import React, { useEffect } from "react";
import {
  Avatar,
  Button,
  Container,
  Grid,
  Typography,
  Modal,
  Fade,
  Backdrop,
  useMediaQuery,
} from "@mui/material";
import ReactLoading from "react-loading";
import { useDispatch, useSelector } from "react-redux";
import { accessToken, getDataAndRefreshToken, logout } from "../actions";
import ChangePassword from "../components/ChangePassword";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import UpdateProfile from "../components/UpdateProfile";
import Pusher from "pusher-js";
import { toast } from "react-hot-toast";

const MyProfile = () => {
  const [open, setOpen] = React.useState(false);
  const [users, setUser] = React.useState([]);
  const [PusherUser, setPusherUser] = React.useState([]);
  const [openUpdateModal, setOpenUpdateModal] = React.useState(false);
  const myInfo = useSelector((state) => state.getMyInfoReducer);
  const myInfoRefresh = useSelector((state) => state.refreshTokenReducer);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const query = useMediaQuery("(min-width:700px)");
  let firstRender = true;

  const getData = () => {
    dispatch(accessToken()).then(() => {
      const get = JSON.parse(localStorage.getItem("persist:Auth"));
      const data = JSON.parse(get.getMyInfoReducer);
      myInfo.myData == null ? setUser(data?.myData) : setUser(myInfo?.myData);
    });

    if (myInfo.error === 400 || myInfo.error === 404) {
      dispatch(logout());
      dispatch(logoutUser());
      Navigate("/timeout");
    }
  };

  const getInfoAndRefreshToken = () => {
    dispatch(getDataAndRefreshToken()).then(() => {
      if (myInfoRefresh.error === 400 || myInfoRefresh.error === 404) {
        dispatch(logout());
        Navigate("/timeout");
      } else {
        setUser(myInfoRefresh.myData.user);
      }
    });
  };
  useEffect(() => {
    if (firstRender) {
      getData();
      firstRender = false;
    }
  }, [dispatch, firstRender]);

  useEffect(() => {
    let interval = setInterval(() => {
      getInfoAndRefreshToken();
    }, 1000 * 60 * 5); // 5 minutes
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const pusher = new Pusher("dc54355a02fdd703dc39", {
      cluster: "mt1",
    });
    const channel = pusher.subscribe("updateUser");
    channel.bind("updated", (data) => {
      setPusherUser(data);
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [PusherUser]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "white",
    borderRadius: "10px",
    boxShadow: 24,
    width: !query ? "90%" : "50%",
    padding: "30px",
  };

  return (
    <>
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
            <Typography component="h2" variant="h5" sx={{ marginTop: "10px" }}>
              Name:
              {PusherUser == [] || PusherUser == {} || PusherUser.length == 0
                ? users && users.fullName
                : PusherUser.fullName}
            </Typography>
            <Typography component="h2" variant="h5" sx={{ marginTop: "10px" }}>
              Address :
              {PusherUser == [] || PusherUser == {} || PusherUser.length == 0
                ? users && users.address
                : PusherUser.address}
            </Typography>
            <Typography component="h2" variant="h5" sx={{ marginTop: "10px" }}>
              Email : {users && users.email}
            </Typography>
            <Typography component="h2" variant="h5" sx={{ marginTop: "10px" }}>
              Status : {users && users.status}
            </Typography>
            <Grid container justifyContent={"space-between"}>
              <Grid item>
                <Button
                  onClick={() => setOpenUpdateModal(true)}
                  variant={"contained"}
                  sx={{ marginTop: "10px" }}
                >
                  Update
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={() => setOpen(true)}
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

        <Modal
          open={openUpdateModal}
          onClose={() => setOpenUpdateModal(false)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openUpdateModal}>
            <Box sx={style}>
              <UpdateProfile
                setOpenUpdateModal={setOpenUpdateModal}
                myInfo={myInfo}
              />
            </Box>
          </Fade>
        </Modal>
      </Container>
    </>
  );
};

export default MyProfile;
