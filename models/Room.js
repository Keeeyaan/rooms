import mongoose from "mongoose";
import crypto from "crypto";

const roomSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a room title"],
    maxLength: [16, "Title should be under 16 characters"],
  },
  description: {
    type: String,
    maxLength: [20, "Description should be under 20 characters"],
    default: "a cool room",
  },
  members: [String],
  posts: [
    {
      id: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
    },
  ],
  notes: [
    {
      id: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
    },
  ],
  roomCode: {
    type: String,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide a user id"],
  },
});

//generate random room code
roomSchema.pre("save", async function (next) {
  this.roomCode = crypto.randomBytes(6).toString("hex");
  next();
});

export default mongoose.model("Room", roomSchema);
