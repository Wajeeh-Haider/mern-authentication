import User from "../models/UserModels.js";
import sendJWT from "../utils/SendJWT.js";
import sendMail from "../utils/SendMail.js";
import bcrypt from "bcryptjs";

const createUser = async (req, res) => {
  const { fullName, email, password, address } = req.body;
  const isUserExist = await User.findOne({ email });
  if (isUserExist)
    return res.status(400).json({ message: "Already Registerd" });

  const makeUser = new User({
    fullName,
    email,
    password,
    address,
  });

  if (makeUser) {
    await makeUser.save();
    sendMail(makeUser);
    return res
      .status(201)
      .json({ message: "Data Entered Successfully", data: makeUser });
  }
  return res.status(400).json({ message: "Data Does Not Successfully" });
};

const Login = async (req, res) => {
  const { email, password } = req.body;
  const loginUser = await User.findOne({ email });
  if (!loginUser) {
    return res.status(404).json({ message: "Invalid Credentials" });
  } else {
    if (loginUser.status === "Pending") {
      return res.status(400).json({ message: "Verify Your Email" });
    }
    const isMatch = await bcrypt.compare(password, loginUser.password);
    if (!isMatch) {
      return res.status(406).json({ message: "Please enter correct password" });
    }
    sendJWT(loginUser, 200, res, "Successfully Login");
  }
};

const getMyInfo = async (req, res) => {
  const id = req.user._id;
  const user = await User.findById(id, "-password");
  if (user) {
    return res.status(200).json({ user });
  }
  return res.status(404).json({ message: "User not found" });
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  const del = await User.deleteOne({ _id: id });
  if (!del) return res.status(400).json({ message: "Cannot delete" });
  return res.status(200).json({ message: `delete ${id}` });
};

const allData = async (req, res) => {
  const user = await User.find();
  if (user) return res.status(200).json({ user });
  return res.status(400).json({ message: "No Data Found" });
};

const Logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expire: new Date(Date.now()),
  });
  res.clearCookie("token");
  res.status(200).json({
    status: true,
    message: "User Logout",
  });
};

export { createUser, deleteUser, Login, Logout, getMyInfo, allData };
