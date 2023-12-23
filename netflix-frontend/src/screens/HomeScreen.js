import React, { useEffect } from "react";
import Nav from "../components/Nav";
import Carousal from "../components/Carousal";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGenre,
  fetchMovies,
  getGenreList,
  getShowsList,
} from "../features/GenreSlice";
import { requests } from "../MovieRequests";
import Row from "../components/Row";

function HomeScreen() {
  const showsList = useSelector(getShowsList);
  const genreList = useSelector(getGenreList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGenre(requests.fetchGenre));
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchMovies({ genreList, movieUrl: requests.fetchMovies("all") }));
  }, [dispatch, genreList]);
  const getMoviesRange = (from, to) => {
    return showsList.slice(from, to);
  };
  console.log("Show", showsList);
  return (
    <div style={{ overflowX: "hidden" }}>
      <Nav />
      <Carousal />
      <Row data={getMoviesRange(0, 10)} title="Trending Now" isLargeRow />
      <Row data={getMoviesRange(10, 20)} title="New Releases" />
      <Row data={getMoviesRange(20, 30)} title="Blockbuster Movies" />
      <Row data={getMoviesRange(30, 40)} title="Popular on Netflix" />
      <Row data={getMoviesRange(40, 50)} title="Action Movies" />
      <Row data={getMoviesRange(50, 60)} title="Epics" />
    </div>
  );
}

export default HomeScreen;
