import "./LandingPage.css";
import React, { useState, useEffect } from "react";
import Slide from "react-reveal/Slide";
import LightSpeed from "react-reveal/LightSpeed";
import Tada from "react-reveal/Tada";
import { Link } from "react-router-dom";
import SearchBar from "../NavBar/SearchBar";
import NavBar from "../NavBar/NavBar";

function LandingPage() {
  const [search, setSearch] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);
  const onChange = e => {
    setSearch(e.target.value);
  };
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
      window.removeEventListener("scroll", updateScroll);
    };
  });
  return (
    <div>
      <NavBar/>
      <div className="landingPage">
        <div className="landing_first">
          <div className="landing_container">
            <Slide top cascade>
              <h1>가까운 이웃들과 배송비를 나눠보세요!</h1>
            </Slide>
            {scrollPosition >= 300 ? <SearchBar search_what={search} /> : null}
            <div className={scrollPosition < 300 ? "search" : null}>
              <input
                onChange={onChange}
                value={search}
                type="text"
                placeholder="물품명을 검색해보세요"
              />
              <Link to={{ pathname: "/main", state: { search } }}>
                <input type="submit" value="Find" />
              </Link>
            </div>
            <p>
              <Link to="/login">Sign in</Link> for your address
            </p>
          </div>
          <div className="landing_img">
            <span className="landing_left_img">
              <img src="/images/landing/image18.png" alt="person" />
              <img src="/images/landing/image19.png" alt="person" />
              <img src="/images/landing/image20.png" alt="person" />
              <img src="/images/landing/image21.png" alt="person" />
            </span>
            <span className="landing_right_img">
              <img src="/images/landing/person-food.png" alt="person" />
              <img src="/images/landing/person-object.png" alt="person" />
            </span>
          </div>
        </div>
        <div className="intro_container1">
          <div className="intro_content">
            <LightSpeed cascade>
              <h1>공 | 공복으로부터</h1>
              <h1>구 | 구해줘!</h1>
              <h1>사 | 사이좋게 안전하게</h1>
              <h1>이 | 이제 같이 주문해</h1>
            </LightSpeed>
            <p>주문금액 부족할 때, 배달비 부담될 때 이웃과 함께 주문해요.</p>
          </div>
          <img id="handshake" src="/images/landing/handshake.png" alt="order" />
        </div>
        <div className="intro_container2">
          <div className="intro_img">
            <img src="/images/landing/burger.png" alt="burger" />
            <img id="pizza" src="/images/landing/pizza.png" alt="pizza" />
          </div>
          <div className="intro_content">
            <Tada>
              <h1>1인분만 먹고 싶을 때!</h1>
              <h1>1개만 사고 싶을 때!</h1>
            </Tada>
            <p>주문금액 부족할 때, 배달비 부담될 때 이웃과 함께 주문해요.</p>
            <button>음식 함께 주문하기</button>
            <br />
            <button>물품 함께 주문하기</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
