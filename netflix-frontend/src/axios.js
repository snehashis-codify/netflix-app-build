import axios from "axios";
const moviesAxios = axios.create({
  baseURL: process.env.REACT_APP_MOVIE_URL,
});
export { moviesAxios };
