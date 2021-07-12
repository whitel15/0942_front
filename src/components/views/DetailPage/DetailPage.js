import React, { useState, useEffect } from "react";
import "./DetailPage.css";
import TitleCategory from "../TitleCategory";
import SearchBar from "../NavBar/SearchBar";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function DetailPage(props) {
  const post = props.location.state;
  const imgs = post.img;

  if (post === undefined) {
    props.history.push("/");
  }
  const settings = {
    className: "slider",
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
  };

  console.log(post);
  return (
    <div className="detailPage">
      <SearchBar />
      <TitleCategory slider={true} category={true} />
      <div className="detail_container">
        <div className="detail_post">
          <div className="detail_post_top">
            <div className="detail_post_userInfo">
              <img
                src="/images/main/user.png"
                alt="user"
                className="post_userImg"
              />
              <span className="post_id">{post.writer}</span>
              <span className="post_date">{post.date}</span>
              <span className="post_score">{post.writer_score}점</span>
            </div>
            <aside>
              <div className={imgs != null ? "detail_slider" : null}>
                <Slider {...settings}>
                  {imgs != null
                    ? imgs.map((img, index) => (
                        <div>
                          <img
                            src={img}
                            alt={post.title}
                            className="post_img"
                          />
                        </div>
                      ))
                    : null}
                </Slider>
              </div>
            </aside>
          </div>
          <div className="detail_post_bottom">
            <hr />
            <p className="post_title">{post.title}</p>
            <p className="post_cost">
              <strong>배송비 : </strong>
              {post.cost}원
            </p>
            <p className="post_place">
              <strong>배분 장소 : </strong>
              {post.place}
            </p>
            <p className="post_plus"> {post.content}</p>
            <p className="post_num">{post.number}명 모집 중</p>
          </div>
        </div>
      </div>
      <div className="detail_button">
        <Link to="/">
          <div>채팅</div>
        </Link>
        <div className="detail_scrap" rol="img" aria-level="heart">
          ❤️ {post.scrap}
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
