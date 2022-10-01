import express from "express";
const UserRoute = express.Router();
import {
  createUser,
  deleteUser,
  Login,
  Logout,
  getMyInfo,
  allData,
  changePassword,
  updateProfile,
} from "../controllers/UserControllers.js";
import verifyEmail from "../utils/VerifyEmail.js";
import { isAuthenticated, refreshToken } from "../middleware/auth.js";

UserRoute.post("/create/user", createUser);
UserRoute.post("/login", Login);
UserRoute.delete("/delete/:id", deleteUser);
UserRoute.get("/allData", allData);
UserRoute.post("/logout", isAuthenticated, Logout);
UserRoute.get("/api/getmyinfo", isAuthenticated, getMyInfo);
UserRoute.post("/api/changePassword", isAuthenticated, changePassword);
UserRoute.post("/api/updateprofile", isAuthenticated, updateProfile);
UserRoute.get("/api/refresh", refreshToken, isAuthenticated, getMyInfo);
UserRoute.get("/api/verify/:verifyId", verifyEmail);

export default UserRoute;
