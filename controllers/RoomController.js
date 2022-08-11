import Room from "../models/Room.js";
import CustomError from "../utils/customError.js";

const getAllRooms = async (req, res, next) => {
  try {
    const roomCreated = await Room.find({ createdBy: req.user._id });
    const roomJoined = await Room.find({ members: req.user.email });

    res.status(200).json([...roomCreated, ...roomJoined]);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createRoom = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return next(new CustomError("Please provide a room title", 400));
    }

    const room = await Room.create({
      title,
      description,
      createdBy: req.user.id,
    });

    res.status(201).json(room);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const joinRoom = async (req, res, next) => {
  try {
    const { roomCode } = req.body;

    if (!roomCode) {
      return next(new CustomError("Please provide a room code", 401));
    }

    const room = await Room.findOne({ roomCode });
    if (!room) {
      return next(new CustomError("Room does not exist", 400));
    }

    //check if user id is not the owner of the room before adding a new member
    if (
      room.createdBy == req.user.id ||
      room.members.find((email) => email === req.user.email)
    ) {
      return res.status(400).send("You already join this room");
    }

    const updatedRoom = await Room.findOneAndUpdate(
      { _id: room._id },
      { $push: { members: req.user.email } },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export { joinRoom, createRoom, getAllRooms };
