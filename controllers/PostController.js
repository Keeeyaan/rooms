import Room from "../models/Room.js";
import CustomError from "../utils/customError.js";

const getAllPost = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return next(new CustomError("Room not found", 400));
    }

    res.status(200).json(room.posts);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createPost = async (req, res, next) => {
  try {
    const { post, id } = req.body;

    if (!(post && id)) {
      return next(new CustomError("Post is empty", 400));
    }

    const room = await Room.findById({ _id: id });

    if (!room) {
      return next(new CustomError("Room not found", 400));
    }

    const updatedRoom = await Room.findOneAndUpdate(
      { _id: room._id },
      {
        $push: {
          posts: {
            createdBy: req.user._id,
            message: post,
            username: req.user.username,
          },
        },
      },
      { new: true, runValidators: true }
    );

    res.status(201).json(updatedRoom);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { postId, roomId } = req.body;

    if (!(postId && roomId)) {
      return next(new CustomError("Post not found", 400));
    }

    const room = await Room.findById(roomId);

    if (!room) {
      return next(new CustomError("Room not found", 400));
    }

    await Room.findOneAndUpdate(
      { _id: room._id },
      { $pull: { posts: { _id: postId } } },
      { safe: true, multi: false }
    );

    res.status(200).json({ message: "Post Deleted Successfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const editPost = (req, res, next) => {
  res.send("SUP");
};

export { getAllPost, createPost, deletePost, editPost };
