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
  number,
  content,
  score,
  scrap,
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
          number,
          content,
          score,
        },
      }}
    >
      <div className="post">
        <aside>
          {img != null ? (
            <img src={img} alt={title} className="post_img" />
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
            <p className="post_num">{number}명 모집 중</p>
          </div>
        </main>
        <section>
          <span role="img" aria-label="heart">
            ❤️ {scrap}
          </span>
        </section>
      </div>
    </Link>
  );
}

Post.propTypes = {
  id: PropTypes.number.isRequired,
  writer: PropTypes.string.isRequired,
  img: PropTypes.string,
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  cost: PropTypes.number.isRequired,
  place: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  scrap: PropTypes.number,
};

export default Post;
