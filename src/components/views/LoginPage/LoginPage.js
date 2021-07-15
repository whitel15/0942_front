//  LoginPage
import "./LoginPage.css";
import React, { Component } from 'react';
import { Link } from "react-router-dom";

class LoginPage extends Component {
    render() {
        return (
            <div className="Loginpage">
                <div className="Login_main">
                    <h4 className="Login_h4">0942</h4>
                    <form className="Login_form">
                        <div className="Longin_textarea">
                            <input
                                type="text"
                                id="USER_ID"
                                name="USER_ID"
                                placeholder="아이디를 입력해주세요"
                                className="Login_textinput"

                            />
                        </div>
                        <div className="Longin_textarea">
                            <input
                                type="password"
                                id="USER_PW"
                                name="USER_PW"
                                placeholder="비밀번호를 입력해주세요"
                                className="Login_textinput"
                            />
                        </div>
                        <input
                            type="submit"
                            value="LOGIN"
                            className="Login_button"
                        />
                    </form>
                    <div className="Login_register">0942는 처음이신가요? &nbsp; &nbsp;
                        <Link to="/register" className="Login_link">
                            회원가입하기
                        </Link></div>
                </div>
            </div>
        )
    }
}

export default LoginPage; 