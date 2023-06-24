import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userAuthApi } from "../service/userAuthApi";
import { userApi } from "../service/userApi";
import { reviewsApi } from "../service/reviewsApi";

// Configure the Redux store
const store = configureStore({
  reducer: {
    [userAuthApi.reducerPath]: userAuthApi.reducer, // Add the userAuthApi reducer to the store
    [userApi.reducerPath]: userApi.reducer, // Add the userApi reducer to the store
    [reviewsApi.reducerPath]: reviewsApi.reducer, // Add the reviewsApi reducer to the store
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userAuthApi.middleware) // Add the userAuthApi middleware to the store's middleware stack
      .concat(userApi.middleware) // Add the userApi middleware to the store's middleware stack
      .concat(reviewsApi.middleware), // Add the reviewsApi middleware to the store's middleware stack
});

// Set up listeners for the Redux store to handle API actions
setupListeners(store.dispatch);

export default store;
