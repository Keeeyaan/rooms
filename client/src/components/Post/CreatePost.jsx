import { useState } from 'react';
import { Button, Box, TextField, CircularProgress } from '@mui/material';

import { useCreatePostMutation } from '../../store/postApiSlice';

const CreatePost = ({ id, setClickPost }) => {
  const [post, setPost] = useState('');
  const [createPost, { isLoading }] = useCreatePostMutation();

  const postChangeHandler = (e) => setPost(e.target.value);

  const submitHandler = async (e) => {
    e.preventDefault();
    await createPost({ post, id }).unwrap();
    setPost('');
    setClickPost(false);
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Box component='form' onSubmit={submitHandler} sx={{ mx: 3, mt: 2 }}>
      <TextField
        variant='filled'
        multiline
        minRows={4}
        onChange={postChangeHandler}
        label='Announce something to your room'
        value={post}
        fullWidth
        sx={{ pt: 1 }}
      />
      <Box
        component='div'
        sx={{
          my: 2.5,
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Button type='button' onClick={() => setClickPost(false)}>
          Cancel
        </Button>
        <Button
          type='submit'
          sx={{ ml: 2 }}
          disabled={!post}
          variant='contained'
        >
          Post
        </Button>
      </Box>
    </Box>
  );
};

export default CreatePost;
