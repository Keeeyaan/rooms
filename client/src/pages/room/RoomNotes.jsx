import React from 'react';
import { useParams } from 'react-router-dom';

import { SpeedDial, SpeedDialIcon, SpeedDialAction, Grid } from '@mui/material';

import Page from '../../pages/Page';
import RoomNav from '../../components/UI/RoomNav';
import Notes from '../../components/UI/NotesCard';

const dummyData = [
  { message: 'SUP GUYS', id: 1 },
  {
    message:
      'YOW G MASDASDAS  ASDSAD SA:DLSADASDASMD SD - ASDASD --asdasd -asdas \n asdasdasd',
    id: 2,
  },
];

const actions = [
  {
    color: '#FFF475',
    name: 'Yellow',
    create: () => {
      return dummyData.push({ id: 3, message: '', notesColor: '#FFF475' });
    },
  },
  {
    color: '#F28B82',
    name: 'Red',
    create: () => {
      return dummyData.push({ id: 3, message: '', notesColor: '#F28B82' });
    },
  },
  {
    color: '#AECBFA',
    name: 'Light Blue',
    create: () => {
      return dummyData.push({ id: 3, message: '', notesColor: '#AECBFA' });
    },
  },
  {
    color: '#D7AEFB',
    name: 'Purple',
    create: () => {
      return dummyData.push({ id: 3, message: '', notesColor: '#D7AEFB' });
    },
  },
  {
    color: '#CCFF90',
    name: 'Green',
    create: () => {
      return dummyData.push({ id: 3, message: '', notesColor: '#CCFF90' });
    },
  },
  {
    color: '#E8EAED',
    name: 'Gray',
    create: () => {
      return dummyData.push({
        id: new Date(Date.now),
        message: '',
        notesColor: '#E8EAED',
      });
    },
  },
];

const RoomNotes = () => {
  const { id } = useParams();
  console.log('asdsa');

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
            onClick={action.create}
          />
        ))}
      </SpeedDial>
      <Grid
        container
        spacing={2}
        sx={{ mt: 5, justifyContent: 'space-around' }}
      >
        {dummyData
          .map((data) => (
            <Grid key={data.id} item>
              <Notes message={data.message} notesColor={data.notesColor} />
            </Grid>
          ))
          .reverse()}
      </Grid>
    </Page>
  );
};

export default RoomNotes;
