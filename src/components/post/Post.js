import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./post.css";

function Post({
  id,
  writer,
  img,
  date,
  title,
  cost,
  place,
  invite_num,
  content,
  writer_score,
  scrap_num,
}) {
  return (
    <Link
      to={{
        pathname: `/post/${id}`,
        state: {
          id,
          writer,
          img,
          date,
          title,
          cost,
          place,
          invite_num,
          content,
          writer_score,
          scrap_num,
        },
      }}
    >
      <div className="post">
        <aside>
          {img != null ? (
            <img src={img[0]} alt={title} className="post_img" />
          ) : null}
        </aside>
        <main>
          <div className="post_userInfo">
            <img
              src="/images/main/user.png"
              alt="user"
              className="post_userImg"
            />
            <span className="post_id">{writer}</span>
            <span className="post_date">{date}</span>
          </div>
          <div className="post_content">
            <p className="post_title">{title}</p>
            <span className="post_cost">배송비 : {cost}원</span>
            <span className="post_place">배분 장소 : {place}</span>
            <p className="post_num">{invite_num}명 모집 중</p>
          </div>
        </main>
        <section>
          <span role="img" aria-label="heart">
            ❤️ {scrap_num}
          </span>
        </section>
      </div>
    </Link>
  );
}

Post.propTypes = {
  id: PropTypes.number.isRequired,
  writer: PropTypes.string.isRequired,
  img: PropTypes.arrayOf(PropTypes.string),
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  cost: PropTypes.number.isRequired,
  place: PropTypes.string.isRequired,
  invite_num: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  writer_score: PropTypes.number.isRequired,
  scrap_num: PropTypes.number,
};

export default Post;
