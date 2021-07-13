import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import LeftNav from "./LeftNav";
import Burger from "./Burger";
import "./NavBar.css";

function NavBar() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [open, setOpen] = useState(false);

  const updateScroll = () => {
    setScrollPosition(
      window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
    );
  };
  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
  });

  return (
    <div className="navBar">
      <div
        className={scrollPosition < 100 ? "original_header" : "change_header"}
      >
        <span
          className={open === true ? "nav_burger_click" : "nav_burger"}
          onClick={() => setOpen(!open)}
        >
          <Burger open={open} scrollPosition={scrollPosition} />
        </span>
        <div className={open === true ? "nav_left" : null}>
          {open === true ? <LeftNav /> : null}
        </div>
        <Link to="/" className="nav_title">
          0942
        </Link>
        <Link to="/login" className="nav_login">
          로그인
        </Link>
        <Link to="/register" className="nav_signup">
          회원가입
        </Link>
      </div>
    </div>
  );
}

export default withRouter(NavBar);
