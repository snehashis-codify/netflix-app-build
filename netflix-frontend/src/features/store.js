import { configureStore } from "@reduxjs/toolkit";
import { moviesSlice } from "./MovieSlice";
import { genreSlice } from "./GenreSlice";

export const store = configureStore({
  reducer: {
    movies: moviesSlice.reducer,
    genre: genreSlice.reducer,
  },
});
