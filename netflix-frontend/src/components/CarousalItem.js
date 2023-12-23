import React from "react";
import "../assets/css/Banner.css";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
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
        backgroundImage: `url('${process.env.REACT_APP_BANNER_IMAGE_URL}/${carousalItem?.backdrop_path}')`,
        backgroundPosition: "center center",
      }}
    >
      <div className="mx-5 banner_content">
        <p className="h1 banner_title">
          {carousalItem?.name ||
            carousalItem?.title ||
            carousalItem?.original_name}
        </p>
        <div className="d-flex align-items-center">
          <button className="banner_button text-white border-0 me-3 d-flex align-items-center">
            <FaPlay className="mx-2" /> Play
          </button>
          <button className="banner_button text-white border-0 d-flex align-items-center">
            <AiOutlineInfoCircle className="mx-2" /> More Info
          </button>
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
