import "./RegisterPage.css";
import React, { Component } from 'react';
import { Link } from "react-router-dom";

class RegisterPage extends Component {
    render() {
        return (
            <div className="Registerpage">
                <div className="Register_main">
                    <h4 className="Register_h4">회원가입</h4>
                    <form className="Register_form">
                        <table className="Register_table_id">
                            <tbody>
                                <tr>
                                    <td className="Register_name">
                                        아이디</td>
                                    <td className="Register_textarea">
                                        <input required
                                            type="text"
                                            id="USER_ID"
                                            name="USER_ID"
                                            placeholder="4~10자리"
                                            className="Register_textinput"
                                            maxLength="10"
                                            minLength="4"
                                        //최소, 최대 자리 수 정하기
                                        />
                                        {/*중복검사 버튼 <button id="confirm" type="button" className="Register_check_button">중복검사</button> */}
                                    </td>
                                </tr></tbody>
                        </table>
                        <table className="Register_table">
                            <tbody>
                                <tr>
                                    <td className="Register_name">비밀번호</td>
                                    <td className="Register_textarea"><input
                                        required
                                        type="password"
                                        id="USER_PW"
                                        name="USER_PW"
                                        placeholder="4~10자리"
                                        maxLength="10"
                                        minLength="4"
                                        className="Register_textinput"
                                    /></td>
                                </tr>

                                <tr>
                                    <td className="Register_name">비밀번호 확인</td>
                                    <td className="Register_textarea"><input
                                        required
                                        type="password"
                                        id="USER_PW"
                                        name="USER_PW"
                                        placeholder="비밀번호를 입력해주세요"
                                        className="Register_textinput"
                                    /></td>
                                </tr>

                                <tr>
                                    <td className="Register_name">닉네임</td>
                                    <td className="Register_textarea"><input
                                        required
                                        type="text"
                                        id="USER_NAME"
                                        name="USER_NAME"
                                        placeholder="닉네임을 입력해주세요"
                                        className="Register_textinput"
                                    /></td>
                                </tr>

                                <tr>

                                    <td className="Register_name">
                                        e-mail</td>
                                    <td className="Register_textarea">
                                        <input
                                            required
                                            type="USER_EMAIL"
                                            id="USER_EMAIL"
                                            name="USER_EMAIL"
                                            placeholder="e-mail을 입력해주세요"
                                            className="Register_textinput"
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <td className="Register_name">전화번호</td>
                                    <td className="Register_textarea">
                                        <input
                                            required
                                            type="USER_PHONE"
                                            id="USER_PHONE"
                                            name="USER_PHONE"
                                            placeholder="000-0000-0000"
                                            pattern="[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}"
                                            className="Register_textinput"
                                        /></td>
                                </tr>
                                {/* <tr>
                                <td className="Register_name">거주지</td>
                                <td className="Register_textarea">
                                    <input
                                        required
                                        type="text"
                                        id="USER_ADDR"
                                        name="USER_ADDR"
                                        placeholder="주소를 입력하세요"
                                        className="Register_textinput"
                                    /></td>
                            </tr> */}
                                <tr>
                                    <td className="Register_name">거주지</td>
                                    <td className="Register_textarea">
                                        <input type="text" id="USER_postcode" placeholder="우편번호" className="Register_textinput" />
                                        <td><input type="button" onclick="/" value="우편번호 찾기" className="Register_address_button" /></td>
                                        <input type="text" id="USER_address" placeholder="주소" className="Register_textinput" />
                                        <input type="text" id="USER_detailaddress" placeholder="상세주소" className="Register_textinput" />

                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <input
                            type="submit"
                            value="Register"
                            className="Register_button"
                        />
                    </form>

                    <div className="Register_register">이미 계정이 있으신가요? &nbsp; &nbsp;
                        <Link to="/login" className="Register_link">
                            로그인하기
                        </Link></div>
                </div >
            </div >
        )
    }
}

export default RegisterPage;