import React, { useState } from "react";
import "../assets/css/Nav.css";
import { Col, Row } from "reactstrap";
import { useMotionValueEvent, useScroll, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
function Nav() {
  const { scrollY } = useScroll();
  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);
  const [hidden, setHidden] = useState(false);
  const links = [
    { name: "Home", link: "/" },
    { name: "TV Shows", link: "/tv-shows" },
    { name: "Movies", link: "/movies" },
    { name: "My List", link: "/my-list" },
  ];
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });
  const variants = {
    hidden: { backgroundColor: "transparent", y: 0 },
    visible: { backgroundColor: "#000", y: -10 },
  };
  const handleSearchBlur = () => {
    if (!inputHover) {
      setShowSearch(false);
    }
  };
  const handleInputSearchBlur = () => {
    setShowSearch(false);
    setInputHover(false);
  };
  console.log("hidden", scrollY);
  return (
    <motion.nav
      variants={variants}
      animate={hidden ? "visible" : "hidden"}
      transition={{ ease: [0.1, 0.25, 0.3, 1], duration: 0.8 }}
      className="w-100 position-fixed nav"
    >
      <Row className=" d-flex justify-content-between">
        <Col
          lg="9"
          className="left d-flex justify-content-center align-items-center"
        >
          <div className="brand">
            <img
              className=""
              src={require("../assets/img/netflix-home-logo.png")}
              alt=""
            />
          </div>
          <ul className="links d-flex">
            {links.map(({ name, link }) => {
              return (
                <li key={name}>
                  <Link to={link}>{name}</Link>
                </li>
              );
            })}
          </ul>
        </Col>
        <Col lg="3">
          <div className={`search ${showSearch ? "show-search" : ""}`}>
            <button
              onFocus={() => setShowSearch(true)}
              onBlur={handleSearchBlur}
            >
              <FaSearch />
            </button>
            <input
              type="text"
              placeholder="Search"
              onMouseEnter={() => setInputHover(true)}
              onMouseLeave={() => setInputHover(false)}
              onBlur={handleInputSearchBlur}
            />
          </div>
          <img
            className="position-fixed nav_avatar"
            src={require("../assets/img/default-logo.png")}
            alt=""
          />
        </Col>
      </Row>
    </motion.nav>
  );
}

export default Nav;
