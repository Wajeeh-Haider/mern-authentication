import React from "react";
import { useNavigate } from "react-router-dom";
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
import ChangePassword from "../components/ChangePassword";
import { Box } from "@mui/system";
import UpdateProfile from "../components/UpdateProfile";
import { useDispatch, useSelector } from "react-redux";
import { accessToken, logout, logoutUser } from "../actions";

const MyProfile = () => {
  const [open, setOpen] = React.useState(false);
  const [openUpdateModal, setOpenUpdateModal] = React.useState(false);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const query = useMediaQuery("(min-width:700px)");
  const userInfo = useSelector((state) => state?.getMyInfoReducer);
  const { myData } = userInfo;

  if (userInfo?.error === 400 || userInfo?.error === 404) {
    dispatch(logout());
    dispatch(logoutUser());
    Navigate("/timeout");
  }

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

  React.useEffect(() => {
    dispatch(accessToken());
  }, [dispatch]);

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
              Name: {myData && myData.fullName}
            </Typography>
            <Typography component="h2" variant="h5" sx={{ marginTop: "10px" }}>
              Address :{myData && myData.address}
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
              <UpdateProfile setOpenUpdateModal={setOpenUpdateModal} />
            </Box>
          </Fade>
        </Modal>
      </Container>
    </>
  );
};

export default MyProfile;
