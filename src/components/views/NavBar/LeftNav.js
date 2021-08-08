import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LeftNav.css";

function LeftNav() {
  let loginId = useState(localStorage.getItem("user"))
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
          <Link
            to={{
              pathname: `/myscrap/${loginId}`,
            }}
          >
            내 스크랩
          </Link>
        </div>
      )}
    </div>
  );
}

export default LeftNav;
