import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const UserSchema = mongoose.Schema({
  fullName: {
    type: String,
    require: true,
    // add validation for fullName
    
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

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(6);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.jwtSign = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30s",
    }
  );
};

const User = mongoose.model("Users", UserSchema);

export default User;
