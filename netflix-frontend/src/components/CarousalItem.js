import React from "react";
import "../assets/css/Banner.css";

function CarousalItem({ carousalItem }) {
  const trauncate = (description) => {
    return description?.length < 150
      ? description
      : description?.substring(0, 149) + "...";
  };
  return (
    <header
      className="banner position-relative object-fit-contain text-white"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url('${process.env.REACT_APP_IMAGE_URL}/${carousalItem?.backdrop_path}')`,
        backgroundPosition: "center center",
      }}
    >
      <div className="mx-5 banner_content">
        <p className="h1 banner_title">
          {carousalItem?.name ||
            carousalItem?.title ||
            carousalItem?.original_name}
        </p>
        <div>
          <button className="banner_button text-white border-0 me-3">
            Play
          </button>
          <button className="banner_button text-white border-0">My List</button>
        </div>
        <p className="banner_description lh-sm pt-1">
          {trauncate(carousalItem?.overview)}
        </p>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
}

export default CarousalItem;
