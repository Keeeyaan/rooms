import jwt from "jsonwebtoken";
import User from "../models/User.js";
import CustomError from "../utils/customError.js";

const cookieJwtAuth = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return next(new CustomError("Login first to access this page", 401));
    }

    //verifying the cookie
    const user = jwt.verify(token, process.env.SECRET_KEY);

    //inject user info on req.user
    req.user = await User.findById(user.id);

    return next();
  } catch (error) {
    res.clearCookie("token");
    return next(new CustomError("Cookies Expired", 401));
  }
};

export default cookieJwtAuth;
