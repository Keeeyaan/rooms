import User from "../models/User.js";
import CustomError from "../utils/customError.js";
import cookieToken from "../utils/cookieToken.js";
import jwt from "jsonwebtoken";

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    //check for presence of username, email and password
    if (!(username && email && password)) {
      return next(
        new CustomError("Please provide username, email and password", 400)
      );
    }

    const userEmail = await User.findOne({ email });

    //check if user email exist
    if (userEmail) {
      return next(new CustomError("User already exists!", 400));
    }

    const user = await User.create({ username, email, password });
    cookieToken(user, res);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //check for presence of email and password
    if (!(email || password)) {
      return next(new CustomError("Please provide email and password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    //check if user not exist
    if (!user) {
      return next(
        new CustomError("Email or password does not match or exist", 400)
      );
    }

    //check if password do not match
    if (!(await user.comparePassword(password))) {
      res.status(200).send("Password is incorrect!");
      return next(new CustomError("Password is incorrect!", 400));
    }

    //if all goes good, we send the token
    cookieToken(user, res);
  } catch (error) {
    console.log(error);
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({ success: true, message: "Logout Success" });
  } catch (error) {
    console.log(error);
  }
};

const refreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.token) return res.sendStatus(401);
  const refreshToken = cookies.token;

  const foundUser = await User.findOne({ refreshToken }).exec();

  console.log(foundUser);
  if (!foundUser) return res.sendStatus(403); //Forbidden

  jwt.verify(refreshToken, process.env.SECRET_KEY, (err, decoded) => {
    if (err || foundUser.id !== decoded.id) {
      return res.sendStatus(403);
    }

    const token = foundUser.createJWT();
    res.json({ user: foundUser, token });
  });
};

export { register, login, logout, refreshToken };
