import React, { useState } from "react";
import "./ReviewPage.css";
import Slider from "@material-ui/core/Slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NavBar from "../NavBar/NavBar";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function ReviewPage({ match }) {
  const writer = match.params.id;

  const [value, setValue] = useState(50);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  let history = useHistory();

  const [content, setContent] = useState("");
  const handleContent = e => {
    setContent(e.target.value);
  };

  const saveReview = (e) => {
    if (content === "") {
      alert("내용을 입력하세요."); return;
    }
    let review = {
      REVIEW_SCORE: value,
      REVIEW_CONTENT: content,
    };
    e.preventDefault();
    axios
      .post(`http://localhost:8080/review/to/${writer}`, review)
      .then((response) => {
        console.log(response);
        history.push(`user/${writer}`)
      });
  };

  return (
    <div>
      <NavBar />
      <div className="ReviewPage">
        <div className="ReviewPage_main">
          <form className="ReviewPage_form">
            <h4 className="Review_h4">{writer}</h4>
            <hr className="Review_hr" width="90%" size="5" color="#a8b2eb"></hr>
            <h5 className="Review_h5">점수를 매겨주세요!</h5>
            <div className="Review_range">
              <Slider
                value={typeof value === "number" ? value : 0}
                onChange={handleSliderChange}
                aria-labelledby="input-slider"
                className="Review_slider"
              />
              <div className="Review_value">
                <span>{value}</span>점
              </div>
            </div>
            <h5 className="Review_h5">후기를 남겨주세요!</h5>
            <textarea className="Review_textarea" onChange={handleContent}>
              {" "}
            </textarea>
            <input
              type="submit"
              value="작성 완료"
              className="Review_button"
              onClick={saveReview}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
