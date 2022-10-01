import React from "react";
import { Typography, Grid, TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { updateProfile } from "../actions";

const UpdateProfile = ({ setOpenUpdateModal }) => {
  const [Input, setInput] = React.useState({
    fullName: "",
    address: "",
  });

  const dispatch = useDispatch();
  const handleChange = (e) => {
    setInput({ ...Input, [e.target.name]: e.target.value });
  };

  const { fullName, address } = Input;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !address) {
      alert("Please fill all the fields");
    } else {
      dispatch(updateProfile(fullName, address));
      if (dispatch({ type: "CHANGE_PASSWORD_SUCCESS" })) {
        setOpenUpdateModal(false);
      }
    }
  };

  return (
    <>
      <Button variant="standard" onClick={() => setOpenUpdateModal(false)}>
        x
      </Button>
      <Grid
        container
        spacing={3}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Grid item component="form" xs={12} sm={6}>
          <Typography variant="h5" gutterBottom>
            Update Profile
          </Typography>
          <TextField
            required
            id="fullName"
            name="fullName"
            label="Full Name"
            fullWidth
            autoComplete="fullName"
            style={{ marginTop: "10px" }}
            onChange={handleChange}
            value={fullName}
          />
          <TextField
            required
            id="address"
            name="address"
            label="Address"
            fullWidth
            autoComplete="address"
            style={{ marginTop: "10px" }}
            onChange={handleChange}
            value={address}
          />

          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            type="submit"
            style={{ marginTop: "10px" }}
          >
            Update
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default UpdateProfile;
