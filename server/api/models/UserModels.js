import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const UserSchema = mongoose.Schema({
  fullName: {
    type: String,
    require: true,
    min: 3,
    max: 255,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    min: 6,
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

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(8);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.jwtSign = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    "AUTHENTICATIONUSINGJWT",
    {
      expiresIn: "15m",
    },
    
  );
};

const User = mongoose.model("Users", UserSchema);

export default User;
