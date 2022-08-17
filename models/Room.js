import mongoose from 'mongoose';
import crypto from 'crypto';

const roomSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a room title'],
    maxLength: [16, 'Title should be under 16 characters'],
  },
  description: {
    type: String,
    maxLength: [20, 'Description should be under 20 characters'],
    default: 'a cool room',
  },
  members: [String],
  posts: [
    {
      createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide a user id'],
      },
      username: {
        type: String,
        required: [true, 'Please provide a username'],
      },
      message: {
        type: String,
        required: [true, 'Please provide a message'],
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  notes: [
    {
      message: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  roomCode: {
    type: String,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide a user id'],
  },
});

//generate random room code
roomSchema.pre('save', async function (next) {
  this.roomCode = crypto.randomBytes(6).toString('hex');
  next();
});

export default mongoose.model('Room', roomSchema);
