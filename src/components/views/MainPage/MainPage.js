import React, { useState, useEffect } from "react";
import "./MainPage.css";
import { Link } from "react-router-dom";
import Post from "../../post/Post";
import TitleCategory from "../TitleCategory";
import SearchBar from "../NavBar/SearchBar";
import Pagination from "../Pagination/Pagination";
import axios from "axios";

function MainPage(props) {
  let search = "";
  if (props.location.state !== undefined) {
    search = props.location.state.search;
  }
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/main/post")
    .then((response) => {
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
        {currentPosts(posts).map((post, index) => (
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
        <Pagination total={posts.length} count={count} paginate={setCurrentPage} />
      </div>
    </div>
  );
}

export default MainPage;
