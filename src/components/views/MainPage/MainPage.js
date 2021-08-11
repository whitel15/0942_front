import React, { useState, useEffect } from "react";
import "./MainPage.css";
import { Link } from "react-router-dom";
import Post from "../../post/Post";
import TitleCategory from "../TitleCategory";
import SearchBar from "../NavBar/SearchBar";
import Pagination from "../Pagination/Pagination";
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import { useHistory } from "react-router-dom";
import { cacheAdapterEnhancer } from "axios-extensions";
// import LoginSession from "../LoginSession";

const instance = axios.create({
  baseUR: "/",
  Accept: "application/json",
  headers: { "Cache-Control": "no-cache" },
  adapter: cacheAdapterEnhancer(axios.defaults.adapter, {
    enabledByDefault: false,
  }),
});

function MainPage(props) {
  const [islogedId, setIslogedId] = useState(localStorage.getItem("user"));
  let search = "";
  if (props.location.state !== undefined) {
    search = props.location.state.search;
  }

  let history = useHistory();

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

  const [all, setAll] = useState([]); // 모든 포스트
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await instance.get("http://localhost:8080/main/post", {
        forceUpdate: history.action === "PUSH",
        cache: true,
      });

      setLoading(false);
      setPosts([...response.data]);
      setAll([...response.data]);
    };
    fetchPost();
    return () => {
    }
  }, [history.action]);
  
  useEffect(() => {
    var result = [];
    all.map((post, index) => {
      if (post.title.includes(search) || post.content.includes(search) || post.place.includes(search)) {
        result.push(post)
      }
    })
    console.log(result)
    setPosts(result)
    return () => {
    }
  }, [props])

  const [currentPage, setCurrentPage] = useState(1);
  let count = 10;

  const lastIdx = currentPage * count;
  const firstIdx = lastIdx - count;
  const currentPosts = (postList) => {
    return postList.slice(firstIdx, lastIdx);
  }

  const allType = () => {
    setPosts(all)
  }

  const foodType = () => {
    var result = [];
    all.map((post, index) => {
      if (post.category === "FOOD") {
        result.push(post)
      }
    })
    setPosts(result)
  }

  const objectType = () => {
    var result = [];
    all.map((post, index) => {
      if (post.category === "ITEM") {
        result.push(post)
      }
    })
    setPosts(result)
  }

  return (
    <div>
      <NavBar />
      <div className="mainPage">
        <TitleCategory slider={true} category={true} allType={allType} foodType={foodType} objectType={objectType} />
        <SearchBar search_what={search} />

        {islogedId !== null? (
            <Link to="/write/0">
              <input
                className="main_input"
                type="text"
                placeholder="새 글을 작성해주세요!"
              ></input>
            </Link>
            ) : (
            <div></div>
        )}
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
