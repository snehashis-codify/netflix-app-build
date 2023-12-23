import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { moviesAxios } from "../axios";
const createArrayFromRawData = (array, moviesArray, genres) => {
  array.forEach((movie) => {
    const movieGenres = [];
    movie.genre_ids.forEach((genre) => {
      const name = genres.find(({ id }) => id === genre);
      if (name) movieGenres.push(name.name);
    });
    if (movie.backdrop_path)
      moviesArray.push({
        id: movie.id,
        name: movie?.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        poster_image: movie?.poster_path,
        genres: movieGenres.slice(0, 3),
      });
  });
};
const getRawData = async (api, genres, paging) => {
  const moviesArray = [];
  for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
    const {
      data: { results },
    } = await moviesAxios.get(`${api}${paging ? `&page=${i}` : ""}`);
    createArrayFromRawData(results, moviesArray, genres);
  }
  return moviesArray;
};
export const fetchMovies = createAsyncThunk(
  "genre/fetchMovies",
  async ({ movieUrl }, thunkAPI) => {
    const {
      genre: { genreList },
    } = thunkAPI.getState();
    return getRawData(movieUrl, genreList, true);
  }
);
export const fetchGenre = createAsyncThunk(
  "genre/fetchgenre",
  async (genreUrl) => {
    const {
      data: { genres },
    } = await moviesAxios.get(genreUrl);
    console.log("Genres", genres);
    return genres;
  }
);
export const genreSlice = createSlice({
  name: "genre",
  initialState: {
    showsList: [],
    genreList: [],
    genreLoaded: "idle",
    showListLoaded: "idle",
    error: null,
  },
  extraReducers(builder) {
    builder
      .addCase(fetchGenre.pending, (state) => {
        state.genreLoaded = "loading";
      })
      .addCase(fetchMovies.pending, (state) => {
        state.showListLoaded = "loading";
      })
      .addCase(fetchGenre.fulfilled, (state, action) => {
        state.genreLoaded = "succeeded";
        state.genreList = action.payload;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.genreLoaded = "succeeded";
        state.showsList = action.payload;
      })
      .addCase(fetchGenre.rejected, (state, action) => {
        state.genreLoaded = "rejected";
        state.error = action.error.message;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.showListLoaded = "rejected";
        state.error = action.error.message;
      });
  },
});
export const getGenreList = (state) => state.genre.genreList;
export const getShowsList = (state) => state.genre.showsList;
