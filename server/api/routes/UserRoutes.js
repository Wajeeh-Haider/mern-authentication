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
import isAuthenticated from "../middleware/auth.js";

UserRoute.post("/create/user", createUser);
UserRoute.post("/login", Login);
UserRoute.delete("/delete/:id", isAuthenticated, deleteUser);
UserRoute.get("/allData", isAuthenticated, allData);
UserRoute.post("/logout", Logout);
UserRoute.get("/api/getmyinfo", isAuthenticated, getMyInfo);
UserRoute.post("/api/changePassword", isAuthenticated, changePassword);
UserRoute.post("/api/updateprofile", isAuthenticated, updateProfile);

export default UserRoute;
