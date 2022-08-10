import React from "react";
import { Link } from "react-router-dom";

import { Button, ButtonGroup } from "@mui/material";

const HeaderRoom = () => {
  return (
    <ButtonGroup disableElevation>
      <Button variant="contained">Stream</Button>
      <Button variant="contained">Calendar</Button>
      <Button variant="contained">Chat</Button>
      <Button component={Link} to="/room/notes/asd" variant="contained">
        Notes
      </Button>
    </ButtonGroup>
  );
};

export default HeaderRoom;
