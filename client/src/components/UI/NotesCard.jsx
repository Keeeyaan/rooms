import { useState } from 'react';

import { Paper, Divider, Box, IconButton, Typography } from '@mui/material';
import { TextareaAutosize } from '@mui/base';
import DeleteIcon from '@mui/icons-material/Delete';

const NotesCard = ({ notesColor, message }) => {
  const characterLimit = 200;
  const [noteText, setNoteText] = useState(message);

  const noteTextChangeHandler = (e) => {
    if (characterLimit - e.target.value.length >= 0) {
      setNoteText(e.target.value);
    }
  };

  const deleteHandler = () => {
    console.log('notes deleted');
  };

  return (
    <Paper sx={{ backgroundColor: notesColor || '', width: 320 }} elevation={4}>
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
          backgroundColor: notesColor || '',
        }}
        onChange={noteTextChangeHandler}
        aria-label='notes textarea'
        placeholder='Type to add a note...'
        defaultValue={noteText}
        maxLength={characterLimit}
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
        {/* <Typography sx={{ fontWeight: 500, p: 1 }}>09/25/22</Typography> */}
        <IconButton aria-label='delete' color='error' onClick={deleteHandler}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default NotesCard;
