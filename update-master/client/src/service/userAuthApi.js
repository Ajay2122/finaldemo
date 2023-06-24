import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { setUser } from "../Stores/userSlice";

// Create an API instance for user authentication
export const userAuthApi = createApi({
  reducerPath: "userAuthApi", // Specify the reducer path
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/", // Specify the base URL for API requests
    credentials: "include", // Include credentials for cross-origin requests
  }),
  endpoints: (builder) => ({
    // Define the "registerUser" endpoint for user registration
    registerUser: builder.mutation({
      query: (user) => ({
        url: "auth/register", // Specify the endpoint URL for user registration
        method: "POST", // Specify the HTTP method as POST
        body: user, // Include the user data in the request body
        headers: {
          "content-type": "application/json", // Set the request content type to JSON
        },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        // Handle the action when the query is initiated
        const { data } = await queryFulfilled;
     
        // Dispatch an action to set the user data in the store 
        dispatch(setUser(data));
      },
    }),
    // Define the "loginUser" endpoint for user login
    loginUser: builder.mutation({
      query: (user) => ({
        url: "auth/login", // Specify the endpoint URL for user login
        method: "POST", // Specify the HTTP method as POST
        body: user, // Include the user data in the request body
      }),
    }),
    // Define the "forgotPassword" endpoint for password recovery
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "auth/forgotPassword", // Specify the endpoint URL for password recovery
        method: "POST", // Specify the HTTP method as POST
        body: email, // Include the email data in the request body
      }),
    }),
    // Define the "resetPassword" endpoint for resetting the password
    resetPassword: builder.mutation({
      query: ({ token, password }) => ({
        url: `/auth/resetPassword/${token}`, // Specify the endpoint URL for resetting the password
        method: "POST", // Specify the HTTP method as POST
        body: { password }, // Include the new password data in the request body
      }),
    }),
    // Define the "logoutUser" endpoint for user logout
    logoutUser: builder.mutation({
      query: () => ({
        url: "auth/logout", // Specify the endpoint URL for user logout
        method: "POST", // Specify the HTTP method as POST
      }),
    }),
  }),
});

// Extract the generated hooks for each user authentication endpoint
export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLogoutUserMutation,
} = userAuthApi;
