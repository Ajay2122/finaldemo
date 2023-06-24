import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Create an API using Redux Toolkit Query
export const gigApi = createApi({
  // Unique identifier for the API slice
  reducerPath: "gigApi",
  // Configure the base query behavior
  baseQuery: fetchBaseQuery({
    // Base URL for the API requests
    baseUrl: "http://localhost:8000/api/",
    // Include credentials in the requests 
    credentials: "include",
  }),
  // Define the API endpoints
  endpoints: (builder) => ({
    // Define an endpoint to fetch a gig by its ID
    getGigById: builder.query({
      query: (id) => `gigs/single/${id}`, // Specify the endpoint URL
    }),
    // Define an endpoint to fetch a user by their ID
    getUserById: builder.query({
      query: (id) => `users/${id}`, // Specify the endpoint URL
    }),
  }),
});

// Extract the generated hooks for each endpoint
export const { useGetGigByIdQuery, useGetUserByIdQuery } = gigApi;
