import { Route, Routes } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import { Login, Register, Home, Error, PersistLogin } from "./pages";

import {
  CreateRoom,
  JoinRoom,
  RoomCalendar,
  RoomChat,
  RoomNotes,
  RoomStream,
} from "./pages/room";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* PROTECTED ROUTES */}
        <Route element={<PersistLogin />}>
          <Route path="/" element={<Home />} />
          <Route path="join-room" element={<JoinRoom />} />
          <Route path="create-room" element={<CreateRoom />} />
          <Route path="room/stream/:id" element={<RoomStream />} />
          <Route path="room/notes/:id" element={<RoomNotes />} />
        </Route>

        {/* CATCH ALL */}
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
