import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import "./ScrapPage.css"
import Post from "../../post/Post";
import Pagination from "../Pagination/Pagination";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { cacheAdapterEnhancer } from "axios-extensions";

const instance = axios.create({
    baseUR: "/",
    Accept: "application/json",
    headers: { "Cache-Control": "no-cache" },
    adapter: cacheAdapterEnhancer(axios.defaults.adapter, {
      enabledByDefault: false,
    }),
});

function ScrapPage() {
    let user = localStorage.getItem("user");
    let history = useHistory();

    const [all, setAll] = useState([]); // 모든 포스트
    const [posts, setPosts] = useState([]);
    const [isLoading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchPost = async () => {
        const response = await instance.get(`http://localhost:8080/scrap/${user}`, {
          forceUpdate: history.action === "PUSH",
          cache: true,
        }, {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          }
        }
        );
  
        setLoading(false);
        setPosts([...response.data]);
        setAll([...response.data]);
      };
      fetchPost();
      return () => {
      }
    }, [history.action]);
  
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
            <div className="scrapPage">
                <h1>{user}님이 스크랩한 글</h1>
                <div className="scrap_container">
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
    )
}

export default ScrapPage;