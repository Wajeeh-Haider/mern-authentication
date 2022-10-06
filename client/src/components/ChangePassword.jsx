import React from "react";
import {
  Typography,
  Grid,
  TextField,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { ChangePassword as PasswordChange } from "../actions";
import { useSelector } from "react-redux";

const ChangePassword = ({ setOpen }) => {
  const [Input, setInput] = React.useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setInput({ ...Input, [e.target.name]: e.target.value });
  };

  const { oldPassword, newPassword, confirmPassword } = Input;

  const handleSubmit = (e) => {
    e.preventDefault();
    if ((oldPassword, newPassword, confirmPassword === "")) {
      alert("Please fill all the fields");
    } else if (oldPassword === newPassword || oldPassword === confirmPassword) {
      alert("Old Password and New Password cannot be same");
    } else if (newPassword !== confirmPassword) {
      alert("New password and confirm password must be same");
    } else {
      dispatch(PasswordChange(oldPassword, newPassword , setOpen));
    }
  };

  return (
    <>
      <Button variant="standard" onClick={() => setOpen(false)}>
        x
      </Button>
      <Grid
        container
        spacing={3}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Grid item component="form" xs={12} sm={6}>
          <Typography variant="h5" gutterBottom>
            Change Password
          </Typography>
          <TextField
            required
            id="oldPassword"
            name="oldPassword"
            label="Current Password"
            fullWidth
            autoComplete="oldPassword"
            style={{ marginTop: "10px" }}
            onChange={handleChange}
            value={oldPassword}
          />
          <TextField
            required
            id="newPassword"
            name="newPassword"
            label="New Password"
            fullWidth
            autoComplete="newPassword"
            style={{ marginTop: "10px" }}
            onChange={handleChange}
            value={newPassword}
          />
          <TextField
            required
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            fullWidth
            autoComplete="confirmPassword"
            style={{ marginTop: "10px" }}
            onChange={handleChange}
            value={confirmPassword}
          />
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            type="submit"
            style={{ marginTop: "10px" }}
          >
            Change Password
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ChangePassword;
