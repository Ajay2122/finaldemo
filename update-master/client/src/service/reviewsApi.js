import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Create an API instance
export const reviewsApi = createApi({
  reducerPath: 'reviewsApi', // Specify the reducer path
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/', // Specify the base URL for API requests
    credentials: 'include', // Include credentials for cross-origin requests
  }),
  endpoints: (builder) => ({
    // Define the "getReviews" endpoint
    getReviews: builder.query({
      query: (gigId) => `reviews/${gigId}`, // Define the query for fetching reviews based on gigId
    }),
    // Define the "addReview" endpoint
    addReview: builder.mutation({
      query: (review) => ({
        url: 'reviews', // Specify the URL for adding a review
        method: 'POST', // Specify the HTTP method for adding a review
        body: review, // Include the review data in the request body
      }),
    }),
  }),
});

// Extract the generated hooks for querying and mutating reviews
export const { useGetReviewsQuery, useAddReviewMutation } = reviewsApi;
