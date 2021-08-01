import React, { useState, useEffect } from "react";
import "./MainPage.css";
import { Link } from "react-router-dom";
import Post from "../../post/Post";
import TitleCategory from "../TitleCategory";
import SearchBar from "../NavBar/SearchBar";
import axios from "axios";
import NavBar from "../NavBar/NavBar";
// import LoginSession from "../LoginSession";

function MainPage(props) {
  let search = "";
  if (props.location.state !== null) {
    search = props.location.state.search;
  }
  // const search = props.location.state.search;
  console.log("검색어:", search);

  // useEffect(() => {
  //   const isLogined = window.localStorage.getItem("logined");
  //   const loggedInUser = window.localStorage.getItem("user");
  //   if (loggedInUser) {
  //     const foundUser = JSON.parse(loggedInUser);
  //     console.log("로그인됨!:",foundUser);
  //   }
  //   else{
  //     console.log("로그인안됨!:",isLogined);
  //   }
  // }, []);

  const [posts, setPosts] = useState([
    {
      id: 1,
      userId: "yujin113",
      images: [
        "https://smaller-pictures.appspot.com/images/dreamstime_xxl_65780868_small.jpg",
        "https://ochairs.co.kr/web/product/big/201910/9685bacc0bc669a3e548ddd2a417f2e1.jpg",
        "https://t1.daumcdn.net/cfile/blog/137F0217499D624605",
      ],
      date: "3분 전",
      title: "제목이 들어갈 공간입니다",
      cost: 2000,
      place: "장소가 들어갈 공간입니다",
      invite_num: 3,
      content:
        "내용이 들어갈 공간입니다내용이 들어갈 공간입니다내용이 들어갈 공간입니다내용이 들어갈 공간입니다내용이 들어갈 공간입니다내용이 들어갈 공간입니다내용이 들어갈 공간입니다내용이 들어갈 공간입니다내용이 들어갈 공간입니다",
      writer_score: 90,
      scrap_num: 2,
    }
  ]);

  useEffect(() => {
    axios.get("http://localhost:8080/main/post")
      .then((response) => {
        setPosts(oldArray => [...oldArray, ...response.data])
        console.log(response.data)
      })
  }, [])

  return (
    <div>
      <NavBar />
      <div className="mainPage">
        <TitleCategory slider={true} category={true} />
        <SearchBar search_what={search} />

        <Link to="/write">
          <input
            className="main_input"
            type="text"
            placeholder="새 글을 작성해주세요!"
          ></input>
        </Link>
        <div className="main_container">
          {posts.map((post, index) => (
            <Post
              key={post.id}
              id={post.id}
              writer={post.userId}
              imgs={post.images}
              date={post.date}
              title={post.title}
              cost={post.cost}
              place={post.place}
              invite_num={post.invite_num}
              content={post.content}
              writer_score={post.writer_score}
              scrap_num={post.scrap_num}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
