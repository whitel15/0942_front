import React, { useState } from "react";
import "./MainPage.css";
import { Link } from "react-router-dom";

function MainPage(props) {
  const [search, setSearch] = useState(props.location.state.search);
  const onChange = e => {
    setSearch(e.target.value);
  };
  return (
    <div className="mainpage">
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
      <div className="menu_container">
        <span>전체</span>
        <span>음식</span>
        <span>생활</span>
      </div>
      <div className="main_container">
        <div className="post">
          <aside>
            <img
              src="https://smaller-pictures.appspot.com/images/dreamstime_xxl_65780868_small.jpg"
              width="150px"
              height="150px"
              alt="img"
            />
          </aside>
          <main>
            <p className="post_title">제목이 들어갈 공간입니다</p>
            <p className="post_date">2021.07.05 pm 5:00</p>
            <p className="post_content">내용이 들어갈 공간입니다</p>
          </main>
          <section>
            <span className="post_num">2/5명 모집 중</span>
            <span role="img" aria-label="heart">
              ❤️ 3
            </span>
          </section>
        </div>
        <div className="post">
          <aside>
            <img
              src="https://smaller-pictures.appspot.com/images/dreamstime_xxl_65780868_small.jpg"
              width="150px"
              height="150px"
              alt="img"
            />
          </aside>
          <main>
            <p className="post_title">제목이 들어갈 공간입니다</p>
            <p className="post_date">2021.07.05 pm 5:00</p>
            <p className="post_content">내용이 들어갈 공간입니다</p>
          </main>
          <section>
            <span className="post_num">2/5명 모집 중</span>
            <span role="img" aria-label="heart">
              ♡ 3
            </span>
          </section>
        </div>
        <div className="post">
          <aside>
            <img
              src="https://smaller-pictures.appspot.com/images/dreamstime_xxl_65780868_small.jpg"
              width="150px"
              height="150px"
              alt="img"
            />
          </aside>
          <main>
            <p className="post_title">제목이 들어갈 공간입니다</p>
            <p className="post_date">2021.07.05 pm 5:00</p>
            <p className="post_content">내용이 들어갈 공간입니다</p>
          </main>
          <section>
            <span className="post_num">2/5명 모집 중</span>
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
