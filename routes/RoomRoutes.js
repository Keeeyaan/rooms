import express from "express";
const router = express.Router();

import {
  joinRoom,
  createRoom,
  getAllRooms,
  getSingleRoom,
} from "../controllers/RoomController.js";

router.route("/").get(getAllRooms);
router.route("/:id").get(getSingleRoom);
router.route("/joinroom").post(joinRoom);
router.route("/createroom").post(createRoom);

export default router;
