import jwt from "jsonwebtoken";
import User from "../models/UserModels.js";

const isAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  try {
    const decodedToken = jwt.verify(token, "AUTHENTICATIONUSINGJWT");
    const loggedInUser = await User.findById(decodedToken.id);
    req.user = loggedInUser;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default isAuthenticated;
