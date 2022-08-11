import { createSlice } from "@reduxjs/toolkit";

const roomSlice = createSlice({
  name: "room",
  initialState: { rooms: [] },
  reducers: {
    getRooms(state, action) {
      const { roomJoined, roomCreated } = action.payload;
      console.log(action.payload);
      state.rooms = [...roomJoined, ...roomCreated];
    },
    addNewRoom(state, action) {
      state.rooms.push(action.payload);
    },
  },
});

export const { getRooms, addNewRoom } = roomSlice.actions;
export default roomSlice.reducer;
