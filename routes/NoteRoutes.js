import express from 'express';
const router = express.Router();

import {
  createNote,
  getAllNotes,
  editNote,
  deleteNote,
} from '../controllers/NoteController.js';

router.route('/:id').get(getAllNotes);
router.route('/createnote').post(createNote);
router.route('/editnote').patch(editNote);
router.route('/deletenote').delete(deleteNote);

export default router;
