import { useParams } from 'react-router-dom';

import {
  useGetAllNotesQuery,
  useCreateNoteMutation,
} from '../../store/noteApiSlice';

import {
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
  Grid,
  CircularProgress,
} from '@mui/material';

import Page from '../../pages/Page';
import RoomNav from '../../components/UI/RoomNav';
import Note from '../../components/Note/Note';

const actions = [
  {
    color: '#FFF475',
    name: 'Yellow',
  },
  {
    color: '#F28B82',
    name: 'Red',
  },
  {
    color: '#AECBFA',
    name: 'Light Blue',
  },
  {
    color: '#D7AEFB',
    name: 'Purple',
  },
  {
    color: '#CCFF90',
    name: 'Green',
  },
  {
    color: '#E8EAED',
    name: 'Gray',
  },
  {
    color: '#FFF',
    name: 'White',
  },
];

const RoomNotes = () => {
  const { id } = useParams();

  const { data: notes, isLoading: notesIsLoading } = useGetAllNotesQuery(id);
  const [createNote, { isLoading: createNoteIsLoading }] =
    useCreateNoteMutation();

  const createNoteHandler = async (color) => {
    await createNote({ id, color }).unwrap();
  };

  if (notesIsLoading) return <CircularProgress />;

  return (
    <Page title='GAMER |' maxWidth='lg'>
      <RoomNav id={id} />
      {createNoteIsLoading && <CircularProgress />}
      <SpeedDial
        ariaLabel='notes color picker'
        sx={{ position: 'absolute', left: 250 }}
        icon={<SpeedDialIcon />}
        direction='down'
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            sx={{
              backgroundColor: action.color,
              '&:hover': { backgroundColor: action.color },
            }}
            tooltipTitle={action.name}
            onClick={() => createNoteHandler(action.color)}
          />
        ))}
      </SpeedDial>
      <Grid container spacing={2} sx={{ mt: 5, justifyContent: 'center' }}>
        {notes
          .map((data) => (
            <Grid
              key={data._id}
              sx={{
                justifyContent: 'center',
                display: 'flex',
              }}
              item
              xs={12}
              sm={7}
              md={5}
              lg={4}
            >
              <Note
                id={data._id}
                created={data.createdAt}
                message={data.message}
                color={data.color}
              />
            </Grid>
          ))
          .reverse()}
      </Grid>
    </Page>
  );
};

export default RoomNotes;
