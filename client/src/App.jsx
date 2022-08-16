import { Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import { Box } from '@mui/system';

import { Login, Register, Home, Error, ProtectedRoutes } from './pages';

import {
  CreateRoom,
  JoinRoom,
  RoomCalendar,
  RoomChat,
  RoomNotes,
  RoomStream,
} from './pages/room';

const App = () => {
  return (
    <>
      <Header />
      <Box sx={{ minHeight: '90vh' }}>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />

          {/* PROTECTED ROUTES */}
          <Route element={<ProtectedRoutes />}>
            <Route path='/' element={<Home />} />
            <Route path='join-room' element={<JoinRoom />} />
            <Route path='create-room' element={<CreateRoom />} />
            <Route path='room/stream/:id' element={<RoomStream />} />
            <Route path='room/calendar/:id' element={<RoomCalendar />} />
            <Route path='room/chat/:id' element={<RoomChat />} />
            <Route path='room/notes/:id' element={<RoomNotes />} />
          </Route>

          {/* CATCH ALL */}
          <Route path='*' element={<Error />} />
        </Routes>
      </Box>
      <Footer />
    </>
  );
};

export default App;
