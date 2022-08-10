import express from "express";
const router = express.Router();

import {
  register,
  login,
  logout,
  refreshToken,
} from "../controllers/UserController.js";

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/refresh").get(refreshToken);

export default router;
