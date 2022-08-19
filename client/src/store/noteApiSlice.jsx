import { apiSlice } from '../api/apiSlice';

const noteApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotes: builder.query({
      query: (id) => `/note/${id}`,
      providesTags: ['Notes'],
    }),
    createNote: builder.mutation({
      query: (data) => ({
        url: '/note/createnote',
        method: 'POST',
        body: { ...data },
      }),
      invalidatesTags: ['Notes'],
    }),
    editNote: builder.mutation({
      query: (data) => ({
        url: '/note/editnote',
        method: 'PATCH',
        body: { ...data },
      }),
      invalidatesTags: ['Notes'],
    }),
    deleteNote: builder.mutation({
      query: (data) => ({
        url: `/note/deletenote`,
        method: 'DELETE',
        body: { ...data },
      }),
      invalidatesTags: ['Notes'],
    }),
  }),
});

export const {
  useGetAllNotesQuery,
  useCreateNoteMutation,
  useEditNoteMutation,
  useDeleteNoteMutation,
} = noteApiSlice;
