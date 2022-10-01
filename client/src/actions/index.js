import axios from "axios";
import { toast } from "react-hot-toast";

const instance = axios.create({
  baseURL: "http://127.0.0.1:4000",
  withCredentials: true,
  credentials: "include",
});

export const login = () => {
  return {
    type: "LOGIN",
  };
};

export const logout = () => {
  return {
    type: "LOGOUT",
  };
};

export const SigninRequest = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "LOGIN_REQUEST" });
    await instance
      .post("/login", {
        email,
        password,
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
          dispatch(login());
        }
      });
  } catch (error) {
    dispatch({
      type: "LOGIN_FAIL",
      payload: error.response && error?.response?.status,
    });
    if (error?.response?.status === 404) {
      toast.error("Invalid Credentials! Sign Up to Continue :)");
    } else if (error?.response?.status === 400) {
      toast.error("Please Verify Your Email");
    } else if (error?.response?.status === 406) {
      toast.error("Please Enter Correct Password");
    } else {
      toast.error("Something Went Wrong");
    }
  }
};

export const SignUpUser =
  (fullName, email, password, address) => async (dispatch) => {
    try {
      dispatch({ type: "SIGNUP_REQUEST" });
      await instance
        .post("/create/user/", {
          fullName,
          email,
          password,
          address,
        })
        .then((response) => {
          if (response.status === 201) {
            dispatch({ type: "SIGNUP_SUCCESS", payload: response.data });
            toast.success("You are Registered Successfully");
          }
        });
    } catch (error) {
      dispatch({
        type: "SIGNUP_FAIL",
        payload: error.response && error?.response?.status,
      });
      if (error.response.status === 400)
        return toast.error(
          "User Already Exists Please Sign Up with Another Email"
        );
      toast.error("Something Went Wrong");
    }
  };

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({ type: "LOGOUT_REQUEST" });
    await instance.post("/logout").then((response) => {
      if (response.status === 200) {
        dispatch({ type: "LOGOUT_SUCCESS" });
        toast.success("Logged out successfully");
      }
    });
  } catch (error) {
    dispatch({
      type: "LOGOUT_FAIL",
    });
    toast.error("Something Went Wrong");
  }
};

export const accessToken = () => async (dispatch) => {
  try {
    dispatch({ type: "GET_INFO_REQUEST" });
    const request = await instance.get("/api/getmyinfo");
    const data = await request.data;
    dispatch({ type: "GET_INFO_SUCCESSFULL", payload: data });
  } catch (error) {
    dispatch({
      type: "GET_INFO_REQUEST_FAILED",
      payload: error.response && error?.response?.status,
    });
    console.log(error);
  }
};

export const getDataAndRefreshToken = () => async (dispatch) => {
  try {
    dispatch({ type: "GET_INFO_REQUEST_REFRESH" });
    const request = await instance.get("/api/refresh");
    const data = await request.data;
    dispatch({ type: "GET_INFO_REFRESH_TOKEN", payload: data });
  } catch (error) {
    dispatch({ type: "REFRESH_TOKEN_REQUEST_FAILED", payload: error.response });
  }
};

export const ChangePassword =
  (oldPassword, newPassword) => async (dispatch) => {
    try {
      dispatch({ type: "CHANGE_PASSWORD_REQUEST" });
      await instance.post("/api/changepassword", {
        oldPassword,
        newPassword,
      });
      dispatch({ type: "CHANGE_PASSWORD_SUCCESS" });
      toast.success("Password Changed Successfully");
    } catch (error) {
      dispatch({
        type: "CHANGE_PASSWORD_FAILURE",
        payload: error.response && error?.response?.message,
      });
    }
  };

export const updateProfile = (fullName, address) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_PROFILE_REQUEST" });
    await instance.post("/api/updateprofile", {
      fullName,
      address,
    });
    dispatch({ type: "UPDATE_PROFILE_SUCCESS" });
  } catch (error) {
    dispatch({
      type: "UPDATE_PROFILE_FAILURE",
      payload: error.response && error?.response?.message,
    });
  }
};
