import { useState } from "react";

import { useEditPostMutation } from "../../store/postApiSlice";

import { Card, Box, Button, TextField } from "@mui/material";

const PostEdit = ({ message, setEditingPost, roomId, postId }) => {
  const [post, setPost] = useState(message);

  const [editPost, { isLoading }] = useEditPostMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    await editPost({ message: post, roomId, postId });
    setEditingPost(false);
    setPost("");
  };

  return (
    <Card sx={{ mb: 4 }}>
      <Box component="form" onSubmit={submitHandler} sx={{ mx: 3, mt: 2 }}>
        <TextField
          variant="filled"
          multiline
          minRows={2}
          onChange={(e) => setPost(e.target.value)}
          label="Update your announcement"
          value={post}
          fullWidth
          autoFocus
          sx={{ pt: 1 }}
        />
        <Box
          component="div"
          sx={{
            my: 1,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button type="button" onClick={() => setEditingPost(false)}>
            Cancel
          </Button>
          <Button
            type="submit"
            sx={{ ml: 2 }}
            disabled={!post}
            variant="contained"
          >
            Update
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default PostEdit;
