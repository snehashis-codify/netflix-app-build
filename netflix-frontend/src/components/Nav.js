import React, { useState } from "react";
import "../assets/css/Nav.css";
import { Col, Row } from "reactstrap";
import { useMotionValueEvent, useScroll, motion } from "framer-motion";
function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
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
  console.log("hidden", scrollY);
  return (
    <motion.nav
      variants={variants}
      animate={hidden ? "visible" : "hidden"}
      transition={{ ease: [0.1, 0.25, 0.3, 1], duration: 0.8 }}
      className="w-100 position-fixed nav"
    >
      <Row>
        <Col lg="9">
          <img
            className="position-fixed nav_logo object-fit-contain"
            src={require("../assets/img/netflix-big-logo.png")}
            alt=""
          />
        </Col>
        <Col lg="3">
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
