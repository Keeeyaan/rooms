import Room from '../models/Room.js';
import CustomError from '../utils/customError.js';

const getAllNotes = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return next(new CustomError('Room not found', 400));
    }

    res.status(200).json(room.notes);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createNote = async (req, res, next) => {
  try {
    const { note, id } = req.body;

    if (!id) {
      return next(new CustomError('Id not found', 400));
    }

    const room = await Room.findById({ _id: id });

    if (!room) {
      return next(new CustomError('Room not found', 400));
    }

    const updatedRoom = await Room.findOneAndUpdate(
      { _id: room._id },
      {
        $push: {
          notes: {
            message: note,
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

const deleteNote = async (req, res, next) => {
  try {
    const { noteId, roomId } = req.body;

    if (!(noteId && roomId)) {
      return next(new CustomError('Note not found', 400));
    }

    const room = await Room.findById(roomId);

    if (!room) {
      return next(new CustomError('Room not found', 400));
    }

    await Room.findOneAndUpdate(
      { _id: room._id },
      { $pull: { posts: { _id: noteId } } },
      { safe: true, multi: false }
    );

    res.status(200).json({ message: 'Note Deleted Successfully' });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const editNote = async (req, res, next) => {
  try {
    const { postId, roomId, message: newMessage } = req.body;

    if (!(postId && roomId)) {
      return next(new CustomError('Note not found', 400));
    }

    const room = await Room.findById(roomId);

    if (!room) {
      return next(new CustomError('Room not found', 400));
    }

    const updatedRoom = await Room.findOneAndUpdate(
      { _id: room._id, 'notes._id': postId },
      { $set: { 'notes.$.message': newMessage } },
      { new: true, runValidators: true }
    );

    res.status(201).json(updatedRoom);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export { getAllNotes, createNote, deleteNote, editNote };
