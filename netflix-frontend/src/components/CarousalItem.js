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
        backgroundImage: `url('https://images.hothardware.com/contentimages/newsitem/59866/content/Netflix_Banner.jpg')`,
        backgroundPosition: "center center",
      }}
    >
      <div className="mx-4 banner_content">
        <p className="h1 banner_title">Movie Name</p>
        <div>
          <button className="banner_button text-white border-0 me-3">
            Play
          </button>
          <button className="banner_button text-white border-0">My List</button>
        </div>
        <p className="banner_description lh-sm pt-1">
          {trauncate(carousalItem?.description)}
        </p>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
}

export default CarousalItem;
