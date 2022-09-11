import jwt from "jsonwebtoken";
import User from "../models/UserModels.js";
import refreshJwtToken from "../utils/RefreshJwtToken.js";

const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  const cookie = req.cookies.name;
  if (!cookie === "token" || !token) {
    return res.status(400).json({ message: "Un-authorized access" });
  }
  const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
  const loggedInUser = await User.findById(decodeToken.id);
  req.user = loggedInUser;
  next();
};

// In refresh token we verify our token first and then clear it is valid then we create a new token and send it to the user .
const refreshToken = async (req, res, next) => {
  const { token } = req.cookies;
  const cookie = req.cookies.name;
  if (!cookie === "token" || !token) {
    return res.status(400).json({ message: "Un-authorized access" });
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) {
      return res.status(400).json({ message: "Cannot Verify Token" });
    }
    const loggedInUser = await User.findById(user.id);
    res.clearCookie("token");

    const newToken = jwt.sign(
      {
        id: loggedInUser._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "60s",
      }
    );
    if (newToken) {
      return refreshJwtToken(
        { userData: loggedInUser },
        200,
        res,
        "Refresh Token",
        newToken
      );
    } else {
      res.status(400).json({ message: "Invalid Credentials" });
    }
    req.user = loggedInUser;
    next();
  });
};

export { isAuthenticated, refreshToken };
