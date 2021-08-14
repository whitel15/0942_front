import React, { useState, useEffect } from "react";
import "./UserPage.css";
import SearchBar from "../NavBar/SearchBar";
import TitleCategory from "../TitleCategory";
import NavBar from "../NavBar/NavBar";
import axios from "axios";

function UserPage({ match }) {
  const user = match.params.id;
  // const user = "yujin113";
  // const reviews = user.review;

  const [isLoading, setLoading] = useState(false)
  const [reviews, setReviews] = useState([])
  const [userCount, setUserCount] = useState()
  const [userScore, setUserScore] = useState()

  useEffect(() => {
    const getReviews = async() => {
      const reviews_response = await axios.get(`/review/all/${user}`);
      const user_response = await axios.get(`/review/userInfo/${user}`)

      console.log(user_response)
      setReviews([...reviews_response.data]);
      setUserCount(user_response.data.user_count);
      setUserScore(user_response.data.user_score);
      setLoading(true);
    }
    getReviews();
  }, [])

  return (
    <div>
      <NavBar/>
      <div className="userPage">
        <SearchBar />
        <TitleCategory slider={true} category={true} />
        <div className="user_container">
          {isLoading ?
          <div className="user_top">
            <aside>
              {/* 거래 5번 이상, 평균점수 90점 이상이면 뱃지 부여 */}
              {userCount >= 5 && userScore >= 90 ? (
                <img src="/images/user/badge.png" alt="badge"></img>
                ) : null}
            </aside>
            {userCount === 0 || userCount === null ?
            <section><p>리뷰 내역이 없습니다.</p></section> :
            <section>
              <p className="user_id">{user}</p>
              <p>
                총 <strong>{userCount}</strong>번의 거래
              </p>
              <p>
                평균점수 <strong>{userScore}</strong>점
              </p>
            </section>
            }
          </div>
          : <div style={{textAlign:"center", padding:"8rem"}}>Loading...</div>}
          <div className="user_bottom">
            <hr />
            {reviews !== undefined
              ? reviews.map((review, index) => (
                <div key={index}>
                  <span className="review_date">{review.review_date}</span>
                  <span>{review.review_content}</span>
                </div>
              ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
