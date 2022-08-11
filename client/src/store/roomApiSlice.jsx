import { apiSlice } from "../api/apiSlice";

const roomApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUserRooms: builder.query({
      query: () => "/room/",
      providesTags: ["Rooms"],
    }),
    getSingleRoom: builder.query({
      query: (id) => `/room/${id}`,
    }),
    createRoom: builder.mutation({
      query: (data) => ({
        url: "/room/createroom",
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["Rooms"],
    }),
    joinRoom: builder.mutation({
      query: (data) => ({
        url: "/room/joinroom",
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["Rooms"],
    }),
  }),
});

export const {
  useGetAllUserRoomsQuery,
  useGetSingleRoomQuery,
  useCreateRoomMutation,
  useJoinRoomMutation,
} = roomApiSlice;
