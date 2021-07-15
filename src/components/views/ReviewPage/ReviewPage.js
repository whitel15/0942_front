import React, { Component } from "react";
import "./ReviewPage.css";
import { Link } from 'react-router-dom';

class ReviewPage extends Component {
    render() {
        return (
            <div className="ReviewPage">
                <div className="ReviewPage_main">
                    <form className="ReviewPage_form">
                    <h4 className="Review_h4">ID : yujin113</h4>
                    <hr className="Review_hr" width="90%" size= "5" color="#a8b2eb"></hr>
                    <h5 className="Review_h5">점수를 매겨주세요!</h5>
                    <div className="Review_range">
                    <input type="range" min="0" max="10"  id="Review_myRange" className="Review_slider" step="1"/>
                    <div className="Review_value"><span id="Review_score">5점</span></div>
                    </div>
                    <h5 className="Review_h5">후기를 남겨주세요!</h5>
                    <textarea className="Review_textarea" placeholder="후기를 입력하는 공간입니다 :-)"> </textarea>  
                    <Link to="/" className="Register_link">
                    <input type="submit" value="작성 완료" className="Review_button"/>
                    </Link>
                    </form>
                </div>
            </div>
        )
    }

}

var slider = document.getElementById("Review_myRange");
var output = document.getElementById("Review_score");

output.innerHTML = slider.value;

slider.oninput = function() {
    output.innerHTML = this.value;
}



export default ReviewPage;