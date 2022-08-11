import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useJoinRoomMutation } from "../../store/roomApiSlice";
import Page from "../Page";

import { TextField, Button, Box, Typography } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const JoinRoom = () => {
  const navigate = useNavigate();

  const [joinRoom, { isLoading }] = useJoinRoomMutation();

  const [roomCode, setRoomCode] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    await joinRoom({ roomCode }).unwrap();
    setRoomCode("");
    navigate("/");
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Page title="Join Room |" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5">Join Room</Typography>
        <Box
          component="form"
          onSubmit={submitHandler}
          autoComplete="off"
          noValidate
        >
          <TextField
            onChange={(e) => {
              setRoomCode(e.target.value);
            }}
            fullWidth
            id="roomCode"
            required
            variant="outlined"
            label="Room Code"
            margin="normal"
          />
          <Button
            disabled={!roomCode}
            type="submit"
            variant="contained"
            endIcon={<KeyboardArrowRightIcon />}
            fullWidth
            sx={{ mt: 2 }}
          >
            Join
          </Button>
        </Box>
      </Box>
    </Page>
  );
};

export default JoinRoom;
