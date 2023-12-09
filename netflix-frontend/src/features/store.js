import { configureStore } from "@reduxjs/toolkit";
import { moviesSlice } from "./MovieSlice";

export const store = configureStore({
  reducer: {
    movies: moviesSlice.reducer,
  },
});
