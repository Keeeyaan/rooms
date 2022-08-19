import { useState } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';

import {
  useDeleteNoteMutation,
  useEditNoteMutation,
} from '../../store/noteApiSlice';

import {
  Paper,
  Divider,
  Box,
  IconButton,
  Typography,
  CircularProgress,
} from '@mui/material';
import { TextareaAutosize } from '@mui/base';
import DeleteIcon from '@mui/icons-material/Delete';

const NotesCard = ({ color, message, id: noteId, created }) => {
  const { id } = useParams();
  const formatted = dayjs(created).format('MMM/D/YYYY');
  const characterLimit = 200;

  const [deleteNote, { isLoading }] = useDeleteNoteMutation();
  const [editNote, { isLoading: editNoteIsLoading }] = useEditNoteMutation();

  const [noteText, setNoteText] = useState(message);

  const noteTextChangeHandler = (e) => {
    if (characterLimit - e.target.value.length >= 0) {
      setNoteText(e.target.value);
    }
  };

  const saveNoteOnCloseHandler = async (e) => {
    if (e.target.value === message) return;

    const newMessage = e.target.value;
    await editNote({ id, noteId, newMessage });
  };

  const deleteHandler = async () => {
    await deleteNote({ id, noteId }).unwrap();
  };

  if (isLoading || editNoteIsLoading) return <CircularProgress />;

  return (
    <Paper sx={{ backgroundColor: color || '', width: 320 }} elevation={4}>
      <TextareaAutosize
        style={{
          border: 'none',
          outline: 'none',
          minHeight: 100,
          width: 320,
          fontSize: '1.2rem',
          fontFamily: 'inherit',
          padding: '1rem',
          resize: 'none',
          backgroundColor: color || '',
        }}
        onChange={noteTextChangeHandler}
        aria-label='notes text area'
        placeholder='Type to add a note...'
        defaultValue={message}
        maxLength={characterLimit}
        onBlur={saveNoteOnCloseHandler}
      />
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 2,
        }}
      >
        <Typography sx={{ p: 1 }} variant='caption'>
          {characterLimit - noteText.length} Remaning
        </Typography>
        <Typography variant='caption' sx={{ fontWeight: 500, p: 1 }}>
          {formatted}
        </Typography>
        <IconButton aria-label='delete' color='error' onClick={deleteHandler}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default NotesCard;
