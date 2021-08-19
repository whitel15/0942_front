import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LeftNav.css";

function LeftNav() {
  let loginId = localStorage.getItem("user");

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("logined");
    window.location.reload();
  }

  return (
    <div className="leftNav">
      <Link to="/">Home</Link>
      <Link to="/aboutUs">About Us</Link>
      {loginId === null ? (
        <div className="leftNav_isLogined">
          <Link to="/login">Sign In</Link>
          <Link to="/register">Sign Up</Link>
        </div>
      ) : (
        <div className="leftNav_isLogined">
          <Link onClick={logout}>Logout</Link>
          <Link
            to={{
              pathname: `/mypage/${loginId}`,
            }}
          >
            My Page
          </Link>
          <Link
            to={{
              pathname: `/myscrap/${loginId}`,
            }}
          >
            My Scraps
          </Link>
          <Link
            to={{
              pathname: `/user/${loginId}`,
            }}
          >
            My Reviews
          </Link>
        </div>
      )}
    </div>
  );
}

export default LeftNav;
