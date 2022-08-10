import { useState } from "react";

import Page from "../Page";

import { TextField, Button, Box, Typography, CssBaseline } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const JoinRoom = () => {
  const [roomCode, setRoomCode] = useState("");
  const [hasError, setHasError] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();

    // SetError when no class code found in database
    if (!roomCode) {
      return setHasError(true);
    }

    console.log(roomCode);
  };

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
              setHasError(false);
            }}
            fullWidth
            id="roomCode"
            required
            error={hasError}
            variant="outlined"
            label="Room Code"
            margin="normal"
            helperText={hasError && "Invalid room code."}
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
