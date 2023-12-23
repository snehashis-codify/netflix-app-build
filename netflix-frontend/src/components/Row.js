import React from "react";
import Slider from "react-slick";
import "../assets/css/Row.css";
function Row({ title, data, isLargeRow = false }) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: isLargeRow ? true : false,
    autoplaySpeed: isLargeRow && 4000,
  };
  return (
    <div className="row">
      <p className="h2 text-white">{title}</p>

      <Slider {...settings}>
        {data?.map((movieData, index) => {
          return (
            <div
              key={index}
              className={`row_poster ${isLargeRow ? "row_posterLarge" : ""}`}
            >
              <img
                src={
                  isLargeRow
                    ? `${process.env.REACT_APP_SHOWS_IMAGE_URL}/w500${movieData.poster_image}`
                    : `${process.env.REACT_APP_SHOWS_IMAGE_URL}/w500${movieData.image}`
                }
                alt=""
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default Row;
