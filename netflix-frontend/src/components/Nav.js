import React, { useState } from "react";
import "../assets/css/Nav.css";
import { useMotionValueEvent, useScroll, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
function Nav() {
  const { scrollY } = useScroll();
  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
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
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  return (
    <motion.nav
      variants={variants}
      animate={hidden ? "visible" : "hidden"}
      transition={{ ease: [0.1, 0.25, 0.3, 1], duration: 0.8 }}
      className="w-100 position-fixed nav d-flex justify-content-between align-items-center"
    >
      <div className="left d-flex align-items-center ">
        <div className="brand justify-content-center align-items-center">
          <img src={require("../assets/img/netflix-home-logo.png")} alt="" />
        </div>
        <ul className="links d-flex">
          {links.map(({ name, link }) => {
            return (
              <li key={name}>
                <Link to={link} className="text-white text-decoration-none">
                  {name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="right d-flex align-items-center">
        <div
          className={`search d-flex align-items-center justify-content-center ${
            showSearch ? "show_search" : ""
          }`}
        >
          <button
            className="bg-transparent border-0 search_icon"
            onFocus={() => setShowSearch(true)}
            onBlur={handleSearchBlur}
          >
            <FaSearch />
          </button>
          <input
            className={
              showSearch
                ? "input_show border-0 text-white bg-transparent"
                : "input_hide border-0"
            }
            type="text"
            placeholder="Search"
            onMouseEnter={() => setInputHover(true)}
            onMouseLeave={() => setInputHover(false)}
            onBlur={handleInputSearchBlur}
          />
        </div>
        <img
          onClick={(e) => handleOpenUserMenu(e)}
          className="position-fixed nav_avatar"
          src={require("../assets/img/default-logo.png")}
          alt=""
        />
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem>
            <Typography textAlign="center">Logout</Typography>
          </MenuItem>
        </Menu>
      </div>
    </motion.nav>
  );
}

export default Nav;
