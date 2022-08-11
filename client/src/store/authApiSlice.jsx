// import { apiSlice } from "../api/apiSlice";

// const authApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     login: builder.mutation({
//       query: (credentials) => ({
//         url: "/user/login",
//         method: "POST",
//         body: { ...credentials },
//       }),
//     }),
//     register: builder.mutation({
//       query: (credentials) => ({
//         url: "/user/register",
//         method: "POST",
//         body: { ...credentials },
//       }),
//     }),
//     logout: builder.query({
//       query: () => "/user/logout",
//     }),
//     refreshToken: builder.query({
//       query: () => "/user/refresh",
//     }),
//   }),
// });

// export const {
//     useLoginMutation,
//     useRegisterMutation,
//     useLogoutQuery,
//     useRefreshTokenQuery,
//   } = authApiSlice;
