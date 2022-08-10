import { createSlice } from "@reduxjs/toolkit";

const roomSlice = createSlice({
  name: "room",
  initialState: { rooms: [] },
  reducers: {
    joinRoom(state, action) {},
  },
});

export const roomSliceActions = roomSlice.actions;
export default roomSlice.reducer;
