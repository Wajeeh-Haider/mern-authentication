import User from "../models/UserModels.js";

const verifyEmail = async (req, res) => {
  const { verifyId } = req.params;
  const user = await User.findById(verifyId);

  if (user) {
    if (user.status === "Active")
      return res.status(400).json({ message: "Email Already Verified" });
    user.status = "Active";
    await user.save();
    return res.status(200).json({ message: "Email Verified" });
  }
  return res.status(400).json({ message: "Something went wrong" });
};

export default verifyEmail;
