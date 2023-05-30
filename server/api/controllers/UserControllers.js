import User from "../models/UserModels.js";
import sendJWT from "../utils/SendJWT.js";
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
    return res.status(201).json({ message: "Data Entered Successfully" });
  }
  return res
    .status(400)
    .json({ message: "Data Does Not Entered Successfully" });
};

const Login = async (req, res) => {
  const { email, password } = req.body;
  const loginUser = await User.findOne({ email }).select("+password");
  if (!loginUser) {
    return res.status(404).json({ message: "Invalid Credentials" });
  } else {
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

const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const id = req.user._id;
  const findUser = await User.findById(id);
  const isMatch = await bcrypt.compare(oldPassword, findUser.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Old Password is not correct" });
  }
  findUser.password = newPassword;
  if (findUser.password === oldPassword)
    return res
      .status(400)
      .json({ message: "Old password and new password cannot be same" });

  if ((findUser.password = newPassword)) {
    res.status(200).json({ message: "Password Changed Successfully" });
    await findUser.save();
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const { fullName, address } = req.body;
    const user = await User.findByIdAndUpdate(id, {
      fullName,
      address,
    });
    if (user) {
      res.status(200).json({ message: "Profile Updated Successfully", user });
    }
  } catch (err) {
    return res.status(400).json({ message: "Cannot Update Profile", err });
  }
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
  res.status(200).json({
    status: true,
    message: "User Logout",
  });
};

export {
  createUser,
  deleteUser,
  Login,
  Logout,
  getMyInfo,
  allData,
  changePassword,
};
