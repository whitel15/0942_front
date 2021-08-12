import React, {useState} from "react";
import "./ReviewPage.css";
import { Link } from "react-router-dom";
import Slider from "@material-ui/core/Slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NavBar from "../NavBar/NavBar";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function ReviewPage(props) {
  const writer = props.location.state.writer;

  console.log(writer);

  if (writer === undefined) {
    props.history.push("/main");
  }

  let review = props.location.state;
  let reviewPoint = "50";
  let reviewContent = "";
  let today = new Date();

  if (props.location.state !== undefined) {
    reviewPoint = review.reviewpoint;
    reviewContent = review.reviewcontent;
}

  let history = useHistory();
  
  const [reviewpoint, setPoint] = React.useState(50);
  const handlePointChange = (event, newValue) => {
    setPoint(newValue);
  };

  const [reviewcontent, setContent] = useState(reviewContent)
  const handleContentChange = (e) => {
      setContent(e.target.value);
  }

  const reviewDate = today.toLocaleDateString();

  const reviewUpload = () => {

    if (reviewcontent === "") {
        alert("후기를 적어주세요."); return;
    }
    let review = {
        USER_ID : localStorage.getItem("user"),
        REVIEW_POINT: reviewpoint,
        REVIEW_CONTENT: reviewcontent,
        REVIEW_DATE: reviewDate
    }
    const formData = new FormData();

    formData.append("review", new Blob([JSON.stringify(review)], {type: "application/json"}))
    if (props.match.params.id == 0) {
        axios.post('http://localhost:8080/review/upload', formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then((response) => 
            history.push("/main")
        );
    } 
};

  return (
    <div>
      <NavBar/>
      <div className="ReviewPage">
        <div className="ReviewPage_main">
          <form className="ReviewPage_form">
            <h4 className="Review_h4">{writer}</h4>
            <hr className="Review_hr" width="90%" size="5" color="#a8b2eb"></hr>
            <h5 className="Review_h5">점수를 매겨주세요!</h5>
            <div className="Review_range">
              <Slider
                onChange={handlePointChange}
                aria-labelledby="input-slider"
                className="Review_slider"
                value={reviewpoint}
                />
              <div className="Review_value">
                <span>{reviewpoint}</span>점
              </div>
            </div>
            <h5 className="Review_h5">후기를 남겨주세요!</h5>
            <textarea 
               className="Review_textarea"
               onChange={handleContentChange}
               value={reviewContent} 
               />
            <Link to="/" className="Register_link">
              <input type="submit" value="작성 완료" className="Review_button" onClick={reviewUpload}/>
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}
