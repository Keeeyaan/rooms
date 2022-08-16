import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCreateRoomMutation } from '../../store/roomApiSlice';
import Page from '../Page';

import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  AlertTitle,
} from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const CreateRoom = () => {
  const navigate = useNavigate();
  const inputRef = useRef();

  const [createRoom, { isLoading }] = useCreateRoomMutation();

  const [roomTitle, setRoomTitle] = useState('');
  const [roomDescription, setRoomDescription] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      inputRef.current.focus();
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      roomTitle.split('  ').join('');
      if (!roomTitle.length < 4) {
        await createRoom({
          title: roomTitle,
          description: roomDescription,
        }).unwrap();

        setRoomTitle('');
        setRoomDescription('');
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    <CircularProgress />;
  }

  return (
    <Page title='Create Room |' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant='h5'>Create Room</Typography>
        <Box
          component='form'
          onSubmit={submitHandler}
          autoComplete='off'
          noValidate
        >
          <TextField
            inputRef={inputRef}
            onChange={(e) => setRoomTitle(e.target.value)}
            id='roomTitle'
            required
            variant='outlined'
            label='Room Title'
            margin='normal'
            fullWidth
            helperText='minimum 4 characters'
          />
          <TextField
            onChange={(e) => setRoomDescription(e.target.value)}
            id='roomDescription'
            variant='outlined'
            label='Room Description'
            margin='normal'
            fullWidth
          />
          <Button
            disabled={!roomTitle}
            type='submit'
            variant='contained'
            endIcon={<KeyboardArrowRightIcon />}
            fullWidth
            sx={{ mt: 2, p: 1.5 }}
          >
            Create Room
          </Button>
        </Box>
      </Box>
    </Page>
  );
};

export default CreateRoom;
