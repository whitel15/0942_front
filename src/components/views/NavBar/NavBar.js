import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
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
    return () => {
      window.removeEventListener("click", updateScroll);
    };
  });

  const leftNav = useRef();

  const clickOutside = ({ target }) => {
    if (isOpen) setOpen(false);
  }; // leftNav가 아닌 부분 클릭 시 닫히게 함
  
  useEffect(() => {
    window.addEventListener("click", clickOutside);
    return () => {
      window.removeEventListener("click", clickOutside);
    };
  });

  //로그인부분
  const [logedinuser, setLogedinuser] = useState(window.localStorage.getItem("user"));
  const history = useHistory();
  // setLogedinuser( window.localStorage.getItem("user"));
  useEffect(()=>{
    setLogedinuser( window.localStorage.getItem("user"));
    // window.addEventListener('unload', function(e){console.log("이동함"); setLogedinuser(logedinuser)})
    history.listen((location)=>{
      console.log("이동함"); 
      // window.location.reload();
      // setLogedinuser(window.localStorage.getItem("user"));
    })
    if (logedinuser) {
      // console.log("로그인됨!:", logedinuser);
    }
    else{
      // console.log("로그인안됨!:", logedinuser);
    }
  }, [])


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
        <Link to="/" className="nav_title" >
          0942
        </Link>
        {logedinuser == null ?
          <span>
            <Link to="/login" className="nav_login">
              로그인
            </Link>
            <Link to="/register" className="nav_signup">
              회원가입
            </Link>
          </span>
          :
          <span>
            {/* <Link > */}
            <h3 className="nav_logedinuserId" onClick={()=>{localStorage.removeItem("user"); setLogedinuser(null); window.location.reload();}}>
              {logedinuser} 님
            </h3>
            {/* </Link> */}
            {/* <h3 onClick={localStorage.clear()}>
              {logedinuser}
            </h3> */}
          </span>
        }

      </div>
    </div>
  );
}

export default withRouter(NavBar);
