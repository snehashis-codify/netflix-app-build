import React, { useState } from "react";
import Slider from "react-slick";
import "../assets/css/Row.css";
import { IoPlayCircleSharp } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
function Row({ title, data }) {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState("");
  const [hoveredMovie, setHoveredMovie] = useState("");
  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: false,
  };
  const trauncate = (description) => {
    return description?.length < 40
      ? description
      : description?.substring(0, 40) + "...";
  };
  const handleMouseEnter = (movie, index) => {
    setIsHovered(true);
    setHoveredIndex(index);
    setHoveredMovie(movie.name);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
    setHoveredIndex("");
    setHoveredMovie("");
  };
  return (
    <div className="row">
      <p className="h2 text-white">{title}</p>

      <Slider {...settings}>
        {data?.map((movieData, index) => {
          return (
            <div
              key={index}
              className={`row_poster`}
              onMouseEnter={() => handleMouseEnter(movieData, index)}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={`${process.env.REACT_APP_SHOWS_IMAGE_URL}/w500${movieData.image}`}
                alt=""
              />
              {isHovered &&
                index === hoveredIndex &&
                movieData?.name === hoveredMovie && (
                  <div className="hover position-absolute">
                    <div className="image-video-container position-relative">
                      <img
                        className="postition-absolute w-100"
                        src={`${process.env.REACT_APP_SHOWS_IMAGE_URL}/w500${movieData.image}`}
                        alt=""
                      />
                      <video
                        src={require("../assets/img/video.mp4")}
                        autoPlay={true}
                        loop
                        muted
                      />
                    </div>
                    <div className="info-container d-flex flex-column">
                      <p className="name text-white">
                        {trauncate(movieData.name)}
                      </p>
                      <div className="icons d-flex justify-content-between">
                        <div className="controls d-flex">
                          <IoPlayCircleSharp title="Play" />
                          <RiThumbUpFill title="Like" />
                          <RiThumbDownFill title="Dislike" />
                          <AiOutlinePlus title="Add to my list" />
                        </div>
                      </div>
                      {/* <div className="genres d-flex">
                        <ul className="d-flex text-white">
                          {movieData.genres.map((genre) => (
                            <li>{genre}</li>
                          ))}
                        </ul>
                      </div> */}
                    </div>
                  </div>
                )}
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default Row;
