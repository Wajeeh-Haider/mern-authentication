import jwt from "jsonwebtoken";
import User from "../models/UserModels.js";

const isAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  try {
    const decodedToken = jwt.verify(token, "AUTHENTICATIONUSINGJWT");
    const loggedInUser = await User.findById(decodedToken.id);
    req.user = loggedInUser;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export { isAuthenticated };
