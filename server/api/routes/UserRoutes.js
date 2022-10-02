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
import cacheService from "express-api-cache";
const cache = cacheService.cache;

UserRoute.post("/create/user", createUser);
UserRoute.post("/login", Login);
UserRoute.delete("/delete/:id", deleteUser);
UserRoute.get("/allData", cache("10 minutes"), isAuthenticated, allData);
UserRoute.post("/logout", Logout);
UserRoute.get(
  "/api/getmyinfo",
  cache("10 minutes"),
  isAuthenticated,
  getMyInfo
);
UserRoute.post("/api/changePassword", isAuthenticated, changePassword);
UserRoute.post("/api/updateprofile", isAuthenticated, updateProfile);
UserRoute.get(
  "/api/refresh",
  cache("10 minutes"),
  refreshToken,
  isAuthenticated,
  getMyInfo
);
UserRoute.get("/api/verify/:verifyId", cache("10 minutes"), verifyEmail);

export default UserRoute;
