import "./RegisterPage.css";
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import DaumPostCode from 'react-daum-postcode';
import axios from "axios";
class RegisterPage extends Component {
    constructor() {
        super();
        this.state = {
            USER_PW: '', // 비밀번호
            rePassword: '', // 확인 비밀번호
            pMessage: '', // 확인 메시지 
            address: '',
            firstAddress: '',     //주소api를 통해받는 주소
            secondAddress: '',   //직접 작성하는 상세주소
            isDaumPost: false,    //주소 api불러오기
            
        };
    }

    postUserInfo = () => {
        let addr = this.state.firstAddress + ' ' + this.state.secondAddress;
        console.log(this.state.USER_ID, this.state.USER_PW, addr, this.state.USER_PHONE, this.state.USER_EMAIL);
        axios
            .post('http://localhost:8080/register/post', {
                USER_ID: this.state.USER_ID,
                USER_PW: this.state.USER_PW,
                USER_PHONE: this.state.USER_PHONE,
                USER_EMAIL: this.state.USER_EMAIL,
                USER_ADDR: addr
            }
                , {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    }
                }
            )
            .then(function (response) {
                console.log(JSON.stringify(response.data))
            })
            .catch(function (error) {
                console.log(error)
            });

        axios.get('http://localhost:8080/register/get', { maxRedirects: 0 })
            .then(response => {

                console.log(response.data);
            }) // SUCCESS
            .catch(response => { console.log(response); }); // ERROR

    };

    handleIdChange=(e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleEmailChange =(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handlePhoneChange =(e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSecondAddress =(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    
    handleConfirmPassword = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        }, () => {
            const { USER_PW, rePassword } = this.state;
            let pMessage = '';

            if (e.target.value) {
                pMessage = USER_PW === rePassword ?
                    "비밀번호가 일치합니다." : "비밀번호가 일치하지 않습니다.";
            }
            this.setState({ pMessage });
        })
    }

    handleAddress = data => {
        let AllAddress = data.address;    //주소 변수
        let extraAddress = '';     //()안 참고항목 변수

        if (data.addressType === 'R') {     // 사용자가 도로명 주소를 선택했을 경우
            if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress +=
                    extraAddress !== '' ? ', ' + data.buildingName : data.buildingName;
            }
            AllAddress += extraAddress !== '' ? `(${extraAddress})` : '';
        }
        this.setState({
            firstAddress: AllAddress,
        });
    };
    handleOpenPost = () => {
        this.setState({
            isDaumPost: true,
        });
    }
    render() {
        const { isDaumPost, firstAddress } = this.state;
        // 주소창 style
        const Resister_width = 505;
        const Resister_height = 420;
        const Resister_modalStyle = {
            position: 'absolute',
            zIndex: '100',
            border: '1px solid #333333',
        };
        return (
            < div className="Registerpage" >
                <div className="Register_main">
                    <h4 className="Register_h4">회원가입</h4>
                    <form className="Register_form">
                        <table className="Register_table">
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
                                            value={this.state.USER_ID}
                                            onChange={this.handleIdChange}
                                        //최소, 최대 자리 수 정하기
                                        />
                                        {/*중복검사 버튼 <button id="confirm" type="button" className="Register_check_button">중복검사</button> */}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="Register_name">비밀번호</td>
                                    <td className="Register_textarea"><input
                                        required
                                        type="password"
                                        // id="USER_PW"
                                        name="USER_PW"
                                        placeholder="4~10자리"
                                        maxLength="10"
                                        minLength="4"
                                        className="Register_textinput"
                                        value={this.state.USER_PW}
                                        onChange={this.handleConfirmPassword}
                                    /></td>
                                </tr>
                                <tr>
                                    <td className="Register_name">비밀번호 확인</td>
                                    <td className="Register_textarea"><input
                                        required
                                        type="password"
                                        // id="USER_PW"
                                        name="rePassword"
                                        placeholder="비밀번호를 입력해주세요"
                                        className="Register_textinput"
                                        value={this.state.rePassword}
                                        onChange={this.handleConfirmPassword}
                                    /></td>
                                </tr>
                            </tbody></table>
                        <span className="Register_pwchecktext">{this.state.pMessage}</span>
                        <table className="Register_table">
                            <tbody>
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
                                            onChange={this.handleEmailChange}
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
                                            onChange={this.handlePhoneChange}
                                        /></td>
                                </tr>
                                <tr>
                                    <td className="Register_name">거주지</td>
                                    <td className="Register_textarea">
                                        <input type="text" id="USER_postcode" placeholder="우편번호" className="Register_textinput" />
                                        <td><input type="button" onClick={this.handleOpenPost} value="우편번호 찾기" className="Register_address_button" />
                                        </td> {isDaumPost && (
                                            <DaumPostCode
                                                onComplete={this.handleAddress}
                                                autoClose
                                                width={Resister_width}
                                                height={Resister_height}
                                                style={Resister_modalStyle}
                                                isDaumPost={isDaumPost}
                                            />
                                        )}
                                        <input type="text" id="firstAddress" value={firstAddress} placeholder="주소" className="Register_textinput" />
                                        <input type="text" name="secondAddress"  id="secondAddress" placeholder="상세주소" className="Register_textinput" onChange={this.handleSecondAddress} />
                                        {/* firstAddress + secondAddress = USER_ADDR */}

                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <input
                            type="submit"
                            value="Register"
                            className="Register_button"
                            onClick={this.postUserInfo}
                        />
                    </form>

                    <div className="Register_register">
                        <span>이미 계정이 있으신가요?</span> &nbsp; &nbsp;
                        <Link to="/login" className="Register_link">
                            로그인하기
                        </Link>
                    </div>

                </div >


            </div >
        )
    }
}

export default RegisterPage;
