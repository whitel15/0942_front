import React, { useState } from "react";
import "./MainPage.css";
import { Link } from "react-router-dom";

function MainPage(props) {
  const [search, setSearch] = useState(props.location.state.search);
  const onChange = e => {
    setSearch(e.target.value);
  };
  return (
    <div className="mainPage">
      <div className="change_search">
        <input
          onChange={onChange}
          value={search}
          type="text"
          placeholder={search === "" ? "물품명을 검색해보세요" : search}
        />
        <Link to={{ pathname: "/main", state: { search } }}>
          <input type="submit" value="Find" />
        </Link>
      </div>
      <div className="category_container">
        <span>전체</span>
        <span>음식</span>
        <span>생활</span>
      </div>
      <div className="main_container">
        <div className="post">
          <aside>
            <img
              src="https://smaller-pictures.appspot.com/images/dreamstime_xxl_65780868_small.jpg"
              className="post_img"
              alt="img"
            />
          </aside>
          <main>
            <div className="post_userInfo">
              <img
                src="/images/main/user.png"
                alt="user"
                className="post_userImg"
              />
              <span className="post_id">yujin113</span>
              <span className="post_date">5분 전</span>
            </div>
            <div className="post_content">
              <p className="post_title">제목이 들어갈 공간입니다</p>
              <span className="post_cost">배송비 : 3000원</span>
              <span className="post_place">
                배분 장소 : 어디어디어어어어어어어엉어어어어어엉
              </span>
              <p className="post_num">2/5명 모집 중</p>
            </div>
          </main>
          <section>
            <span role="img" aria-label="heart">
              ❤️ 3
            </span>
          </section>
        </div>

        <div className="post">
          <aside>
            <img
              src="https://smaller-pictures.appspot.com/images/dreamstime_xxl_65780868_small.jpg"
              className="post_img"
              alt="img"
            />
          </aside>
          <main>
            <div className="post_userInfo">
              <img
                src="/images/main/user.png"
                alt="user"
                className="post_userImg"
              />
              <span className="post_id">yujin113</span>
              <span className="post_date">5분 전</span>
            </div>
            <div className="post_content">
              <p className="post_title">제목이 들어갈 공간입니다</p>
              <span className="post_cost">배송비 : 3000원</span>
              <span className="post_place">
                배분 장소 : 어디어디어어어어어어어엉어어어어어엉
              </span>
              <p className="post_num">2/5명 모집 중</p>
            </div>
          </main>
          <section>
            <span role="img" aria-label="heart">
              ❤️ 3
            </span>
          </section>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
