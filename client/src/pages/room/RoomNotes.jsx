import React from 'react';
import { useParams } from 'react-router-dom';

import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';

import Page from '../../pages/Page';
import RoomNav from '../../components/UI/RoomNav';
import Notes from '../../components/UI/NotesCard';

const actions = [
  { color: 'yellow', name: 'Yellow' },
  { color: 'green', name: 'Green' },
  { color: 'blue', name: 'Blue' },
  { color: 'violet', name: 'Violet' },
];

const RoomNotes = () => {
  const { id } = useParams();

  return (
    <Page title='GAMER |' maxWidth='lg'>
      <RoomNav id={id} />
      <SpeedDial
        ariaLabel='notes color picker'
        sx={{ position: 'absolute', left: 250 }}
        icon={<SpeedDialIcon />}
        direction='down'
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            sx={{ backgroundColor: action.color }}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
      <Notes />
    </Page>
  );
};

export default RoomNotes;
