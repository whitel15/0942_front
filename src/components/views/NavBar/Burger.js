import React from "react";
import "./Burger.css";

function Burger({ open, scrollPosition }) {
  return (
    <div id="burger_wrap">
      <div className={open === true ? "change" : null}>
        <span
          className={
            open === true || scrollPosition > 100 ? "icon top" : "line top"
          }
        ></span>
        <span
          className={
            open === true || scrollPosition > 100
              ? "icon middle"
              : "line middle"
          }
        ></span>
        <span
          className={
            open === true || scrollPosition > 100
              ? "icon bottom"
              : "line bottom"
          }
        ></span>
      </div>
    </div>
  );
}

export default Burger;
