import { apiSlice } from "../api/apiSlice";

const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: (id) => `/post/${id}`,
      providesTags: ["Posts"],
    }),
    createPost: builder.mutation({
      query: (data) => ({
        url: "/post/createpost",
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["Posts"],
    }),
    deletePost: builder.mutation({
      query: (data) => ({
        url: `/post/deletepost`,
        method: "DELETE",
        body: { ...data },
      }),
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useCreatePostMutation,
  useDeletePostMutation,
} = postApiSlice;
