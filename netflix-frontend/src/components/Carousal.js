import React, { useEffect } from "react";
import CarousalItem from "./CarousalItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../assets/css/Slider.css";
import Skeleton from "@mui/material/Skeleton";
import { useDispatch, useSelector } from "react-redux";
import "../assets/css/Banner.css";
import {
  fetchBannerMovies,
  getMovieStatus,
  getMovies,
} from "../features/MovieSlice";
import { requests } from "../MovieRequests";
function Carousal() {
  let movies = [];

  const dispatch = useDispatch();
  const movieStatus = useSelector(getMovieStatus);
  const moviesList = useSelector(getMovies);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    dotsClass: "button__bar",
    arrows: false,
  };

  useEffect(() => {
    let isSubscribed = true;
    if (movieStatus === "idle" && isSubscribed) {
      dispatch(fetchBannerMovies(requests.fetchNetflixOriginals));
    }
    return () => {
      isSubscribed = false;
    };
  }, [dispatch, movieStatus]);
  if (movieStatus === "succeeded") {
    let new_arr = [];
    for (var i = 0; i < 3; i++) {
      new_arr.push(
        moviesList[Math.floor(Math.random() * (moviesList?.length - 3)) + 1]
      );
    }
    movies = new_arr;
  }
  console.log(movies);
  const BannerLoader = () => {
    return (
      <header className="banner position-relative object-fit-contain">
        <Skeleton
          sx={{ backgroundColor: " #333333" }}
          animation="wave"
          variant="rectangular"
          width={210}
          className="skeleton_size w-100"
        />
      </header>
    );
  };
  return (
    <div className="">
      {movieStatus === "loading" || movieStatus === "idle" ? (
        BannerLoader()
      ) : (
        <Slider {...settings}>
          {movies?.map((item, i) => (
            <CarousalItem carousalItem={item} index={i} />
          ))}
        </Slider>
      )}
    </div>
  );
}

export default Carousal;
