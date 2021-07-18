import React from "react";
import "./ReviewPage.css";
import { Link } from "react-router-dom";
import Slider from "@material-ui/core/Slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ReviewPage(props) {
  const writer = props.location.state.writer;

  console.log(writer);

  if (writer === undefined) {
    props.history.push("/main");
  }

  const [value, setValue] = React.useState(50);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
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
          <textarea className="Review_textarea"> </textarea>
          <Link to="/" className="Register_link">
            <input type="submit" value="작성 완료" className="Review_button" />
          </Link>
        </form>
      </div>
    </div>
  );
}