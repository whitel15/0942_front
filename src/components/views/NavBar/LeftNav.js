import React from "react";
import { Link } from "react-router-dom";
import "./LeftNav.css";

function LeftNav() {
  return (
    <div className="leftNav">
      <Link to="/">Home</Link>
      <Link to="/">Sign In</Link>
      <Link to="/">Sign Up</Link>
      <Link to="/">About Us</Link>
    </div>
  );
}

export default LeftNav;
