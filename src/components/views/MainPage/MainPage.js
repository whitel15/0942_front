import React, { useState } from "react";
import "./MainPage.css";
import { Link } from "react-router-dom";
import Post from "../../post/Post";
import TitleCategory from "../TitleCategory";

function MainPage(props) {
  const [search, setSearch] = useState(props.location.state.search);
  const [posts, setPosts] = useState([
    {
      id: 1,
      writer: "yujin113",
      img: "https://smaller-pictures.appspot.com/images/dreamstime_xxl_65780868_small.jpg",
      date: "3분 전",
      title: "제목이 들어갈 공간입니다",
      cost: 2000,
      place: "장소가 들어갈 공간입니다",
      number: 3,
      content: "내용",
      score: 90,
      scrap: 2,
    },
    {
      id: 2,
      writer: "solux",
      date: "1분 전",
      title: "이미지 안올리는 경우에는 이렇게 뜹니다",
      cost: 4000,
      place: "장소",
      number: 5,
      content: "내용",
      score: 90,
      scrap: 2,
    },
  ]);

  const onChange = e => {
    setSearch(e.target.value);
  };
  return (
    <div className="mainPage">
      <TitleCategory slider={true} category={true} />
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
      {/* <div className="category_container">
        <span>전체</span>
        <span>음식</span>
        <span>생활</span>
      </div> */}
      <div className="main_container">
        {posts.map(post => (
          <Post
            id={post.id}
            writer={post.writer}
            img={post.img}
            date={post.date}
            title={post.title}
            cost={post.cost}
            place={post.place}
            number={post.number}
            content={post.content}
            score={post.writer_score}
            scrap={post.scrap}
          />
        ))}
      </div>
    </div>
  );
}

export default MainPage;
