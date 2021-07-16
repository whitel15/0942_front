import React, { useState, useEffect, useRef } from "react";
import { Link, withRouter } from "react-router-dom";
import LeftNav from "./LeftNav";
import Burger from "./Burger";
import "./NavBar.css";

function NavBar() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isOpen, setOpen] = useState(false);

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

  const leftNav = useRef();

  const clickOutside = ({ target }) => {
    if (isOpen && !leftNav.current.contains(target)) setOpen(false);
  }; // leftNav가 아닌 부분 클릭 시 닫히게 함

  useEffect(() => {
    window.addEventListener("click", clickOutside);
    return () => {
      window.removeEventListener("click", clickOutside);
    };
  });

  return (
    <div className="navBar">
      <div
        className={scrollPosition < 100 ? "original_header" : "change_header"}
      >
        <span
          className={isOpen === true ? "nav_burger_click" : "nav_burger"}
          onClick={() => setOpen(!isOpen)}
        >
          <Burger open={isOpen} scrollPosition={scrollPosition} />
        </span>
        <div className={isOpen === true ? "nav_left" : null} ref={leftNav}>
          {isOpen === true ? <LeftNav /> : null}
        </div>
        <Link to="/" className="nav_title" ref={leftNav}>
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
