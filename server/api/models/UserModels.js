import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const UserSchema = mongoose.Schema({
  fullName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    default: "Pending",
  },
});

UserSchema.methods.jwtSign = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "5m",
    }
  );
};

const User = mongoose.model("Users", UserSchema);

export default User;
