import React, { useState, useEffect } from "react";
import "./MainPage.css";
import { Link } from "react-router-dom";
import Post from "../../post/Post";
import TitleCategory from "../TitleCategory";
import SearchBar from "../NavBar/SearchBar";
import Pagination from "../Pagination/Pagination";
import axios from "axios";
import NavBar from "../NavBar/NavBar";
// import LoginSession from "../LoginSession";

function MainPage(props) {
  let search = "";
  if (props.location.state !== undefined) {
    search = props.location.state.search;
  }
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

  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8080/main/post")
    .then((response) => {
      setLoading(false);
      setPosts(oldArray => [...oldArray, ...response.data])
      console.log(response.data)
      })
  }, [])

  const [currentPage, setCurrentPage] = useState(1);
  let count = 10;

  const lastIdx = currentPage * count;
  const firstIdx = lastIdx - count;
  const currentPosts = (postList) => {
    return postList.slice(firstIdx, lastIdx);
  }

  return (
    <div>
      <NavBar />
      <div className="mainPage">
        <TitleCategory slider={true} category={true} />
        <SearchBar search_what={search} />

        <Link to="/write/0">
          <input
            className="main_input"
            type="text"
            placeholder="새 글을 작성해주세요!"
          ></input>
        </Link>
        <div className="main_container">
          {isLoading? (
            <div className="main_loading">Loading...</div>
            ) : (
            currentPosts(posts).map((post, index) => (
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
                category={post.category}
              />
            ))
          )}
          <Pagination total={posts.length} count={count} paginate={setCurrentPage} />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
