import express from "express";
const router = express.Router();

import {
  createPost,
  getAllPost,
  editPost,
  deletePost,
} from "../controllers/PostController.js";

router.route("/:id").get(getAllPost);
router.route("/createpost").post(createPost);
router.route("/editpost").patch(editPost);
router.route("/deletepost").delete(deletePost);

export default router;
