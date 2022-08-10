import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Page from "../Page";

import { Box, Button, TextField, Typography } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const CreateRoom = () => {
  const navigate = useNavigate();

  const [roomTitle, setRoomTitle] = useState("");
  const [roomDescription, setRoomDescription] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    setRoomTitle("");
    setRoomDescription("");
  };

  return (
    <Page title="Create Room |" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5">Create Room</Typography>
        <Box
          component="form"
          onSubmit={submitHandler}
          autoComplete="off"
          noValidate
        >
          <TextField
            onChange={(e) => setRoomTitle(e.target.value)}
            id="roomTitle"
            required
            variant="outlined"
            label="Room Title"
            margin="normal"
            fullWidth
          />
          <TextField
            onChange={(e) => setRoomDescription(e.target.value)}
            id="roomDescription"
            variant="outlined"
            label="Room Description"
            margin="normal"
            fullWidth
          />
          <Button
            disabled={!roomTitle}
            type="submit"
            variant="contained"
            endIcon={<KeyboardArrowRightIcon />}
            fullWidth
            sx={{ mt: 2 }}
          >
            Create Room
          </Button>
        </Box>
      </Box>
    </Page>
  );
};

export default CreateRoom;
