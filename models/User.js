import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    maxLength: [16, "Username should be under 16 characters"],
    minLength: [3, "Username should be at least 3 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    validate: [validator.isEmail, "Please enter email in correct format"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minLength: [6, "Password should be atleast 6 characters"],
    select: false,
  },
  refreshToken: String,
});

//encrypt password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//compare the password with passed on user password
userSchema.methods.comparePassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

//create and return jwt token
userSchema.methods.createJWT = function () {
  return jwt.sign({ id: this._id }, process.env.SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

export default mongoose.model("User", userSchema);
