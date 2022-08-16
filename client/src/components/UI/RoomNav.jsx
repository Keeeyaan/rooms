import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Box, ButtonGroup, Container } from '@mui/material';

const RoomNav = ({ id }) => {
  const navigate = useNavigate();

  const handleRoutes = (path) => {
    navigate(path);
  };

  return (
    <Container maxWidth='xs'>
      <Box sx={{ mt: 3 }}>
        <ButtonGroup fullWidth variant='text'>
          <Button onClick={() => handleRoutes(`/room/stream/${id}`)}>
            Stream
          </Button>
          <Button onClick={() => handleRoutes(`/room/calendar/${id}`)}>
            Calendar
          </Button>
          <Button onClick={() => handleRoutes(`/room/chat/${id}`)}>Chat</Button>
          <Button onClick={() => handleRoutes(`/room/notes/${id}`)}>
            Notes
          </Button>
        </ButtonGroup>
      </Box>
    </Container>
  );
};

export default RoomNav;
