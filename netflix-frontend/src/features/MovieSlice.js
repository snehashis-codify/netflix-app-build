import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { moviesAxios } from "../axios";
export const fetchBannerMovies = createAsyncThunk(
  "movies/fetchBannerMovies",
  async (movieUrl) => {
    const response = await moviesAxios.get(movieUrl);
    return response.data.results;
  }
);

export const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    moviesList: [],
    movieStatus: "idle",
    error: null,
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBannerMovies.pending, (state, action) => {
        state.movieStatus = "loading";
      })
      .addCase(fetchBannerMovies.fulfilled, (state, action) => {
        state.movieStatus = "succeeded";
        const loadedMovies = action.payload;
        state.moviesList = loadedMovies;
      })
      .addCase(fetchBannerMovies.rejected, (state, action) => {
        state.movieStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export const getMovies = (state) => state.movies.moviesList;
export const getMovieStatus = (state) => state.movies.movieStatus;
export const getErrorMessage = (state) => state.movies.error;
