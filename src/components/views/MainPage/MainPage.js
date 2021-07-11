import React, { useState } from "react";
import "./MainPage.css";
import { Link } from "react-router-dom";
import Post from "../../post/Post";
import TitleCategory from "../TitleCategory";
import SearchBar from "../NavBar/SearchBar";

function MainPage(props) {
  const [search, setSearch] = useState(props.location.state.search);
  const [posts, setPosts] = useState([
    {
      id: 1,
      writer: "yujin113",
      img: "https://smaller-pictures.appspot.com/images/dreamstime_xxl_65780868_small.jpg",
      // img: "https://ochairs.co.kr/web/product/big/201910/9685bacc0bc669a3e548ddd2a417f2e1.jpg",
      date: "3분 전",
      title: "제목이 들어갈 공간입니다",
      cost: 2000,
      place: "장소가 들어갈 공간입니다",
      number: 3,
      content:
        "내용이 들어갈 공간입니다내용이 들어갈 공간입니다내용이 들어갈 공간입니다내용이 들어갈 공간입니다내용이 들어갈 공간입니다내용이 들어갈 공간입니다내용이 들어갈 공간입니다내용이 들어갈 공간입니다내용이 들어갈 공간입니다",
      writer_score: 90,
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
      content:
        "내용이 들어갈 공간입니다내용이 들어갈 공간입니다내용이 들어갈 공간입니다내용이 들어갈 공간입니다내용이 들어갈 공간입니다내용이 들어갈 공간입니다내용이 들어갈 공간입니다내용이 들어갈 공간입니다내용이 들어갈 공간입니다",
      writer_score: 90,
      scrap: 2,
    },
  ]);

  const onChange = e => {
    setSearch(e.target.value);
  };
  return (
    <div className="mainPage">
      <TitleCategory slider={true} category={true} />
      <SearchBar search_what={search} />

      <div className="main_container">
        {posts.map((post, index) => (
          <Post
            key={index}
            id={post.id}
            writer={post.writer}
            img={post.img}
            date={post.date}
            title={post.title}
            cost={post.cost}
            place={post.place}
            number={post.number}
            content={post.content}
            writer_score={post.writer_score}
            scrap={post.scrap}
          />
        ))}
      </div>
    </div>
  );
}

export default MainPage;
