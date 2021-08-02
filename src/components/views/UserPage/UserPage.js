import React from "react";
import "./UserPage.css";
import SearchBar from "../NavBar/SearchBar";
import TitleCategory from "../TitleCategory";
import NavBar from "../NavBar/NavBar";

function UserPage(props) {
  const user = props.location.state;
  const reviews = user.review;

  console.log(user);
  if (user === undefined) {
    props.history.push("/main");
  }

  return (
    <div>
      <NavBar/>
      <div className="userPage">
        <SearchBar />
        <TitleCategory slider={true} category={true} />
        <div className="user_container">
          <div className="user_top">
            <aside>
              {/* 거래 5번 이상, 평균점수 90점 이상이면 뱃지 부여 */}
              {user.user_count >= 5 && user.user_score >= 90 ? (
                <img src="/images/user/badge.png" alt="badge"></img>
              ) : null}
            </aside>
            <section>
              <p className="user_id">{user.user_id}</p>
              <p>
                총 <strong>{user.user_count}</strong>번의 거래
              </p>
              <p>
                평균점수 <strong>{user.user_score}</strong>점
              </p>
            </section>
          </div>
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
