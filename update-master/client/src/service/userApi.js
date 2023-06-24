import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Create an API instance
export const userApi = createApi({
  reducerPath: "userApi", // Specify the reducer path
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/", // Specify the base URL for API requests
    credentials: "include", // Include credentials for cross-origin requests
  }),
  endpoints: (builder) => ({
    // Define the "getUser" endpoint
    getUser: builder.query({
      query: (userId) => `users/${userId}`, // Define the query for fetching a user based on userId
    }),
  }),
});

// Extract the generated hook for querying a user
export const { useGetUserQuery } = userApi;
