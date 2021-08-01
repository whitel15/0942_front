//  LoginPage
import "./LoginPage.css";
import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NavBar from "../NavBar/NavBar";

export default function LoginPage (){

  // constructor() {
  //   const search = "";
  //   super();
  //   this.state = {
  //   };
  // }

  // location = {
  //   pathname: '/main',
  //   state: { search: "" }
  // }

  const [search, setSearch] = useState("");
  const [id, setId]=useState('');
  const onIdChange =(e)=>{
    setId(e.target.value);
  }
  const [pw, setPw]=useState('');
  const onPwChange =(e)=>{
    setPw(e.target.value);
  }

  const sendServerLogin = () => {
    // console.log(this.state.LOGIN_INPUT_ID)

    axios
      .post('http://localhost:8080/login/post', {
        LOGIN_INPUT_ID: id,
        LOGIN_INPUT_PW: pw,
      }
        , {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8'
          }
        }
      )
      .then(function (response) {

        console.log(JSON.stringify(response.data))

        if (JSON.stringify(response.data) == '"no userinfo"') {
          alert('올바른 아이디를 입력해주세요!')
          // this.setState({ redirect: true });
        }
        else {
          if (JSON.stringify(response.data) == '"wrong pw"') {
            alert('비밀번호를 다시 입력해주세요.')
            // this.setState({ redirect: true });
          }
          else {
            localStorage.setItem("user", id)
            localStorage.setItem("logined", "ok")
            console.log(response.data)
            alert('회원가입 완료! 메인으로 이동합니다.')
            // localStorage.clear()
          }
        }

      })
      .catch(function (error) {
        console.log(error)
        
        alert(error)
      });

      
  }

  // handleIDchange = (e) => {
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   })
  // }
  
  // handlePWchange = (e) => {
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   })
  // }

  // render() {
    return (
      <div>
      <NavBar/>
      <div className="Loginpage">
        <div className="Login_main">
          <h4 className="Login_h4">0942</h4>
          <form className="Login_form">
            <input
              type="text"
              id="LOGIN_INPUT_ID"
              name="LOGIN_INPUT_ID"
              placeholder="아이디를 입력해주세요"
              className="Login_textinput"
              onChange={onIdChange}
              value={id}
            />
            <input
              type="password"
              id="LOGIN_INPUT_PW"
              name="LOGIN_INPUT_PW"
              placeholder="비밀번호를 입력해주세요"
              className="Login_textinput"
              onChange={onPwChange}
              value={pw}
            />
            {/* <input type="submit" value="LOGIN" className="Login_button" onClick={this.sendServerLogin} /> */}
            {/* <button value="LOGIN" className="Login_button" onClick={this.sendServerLogin} >Login</button> */}
          </form>



          <Link to={{ pathname: "/main", state: { search } }} onClick={sendServerLogin}>
            <button value="LOGIN" className="Login_button" >Login</button>
          </Link>

          <div className="Login_register">

            <span>0942는 처음이신가요?</span> &nbsp; &nbsp;
            <Link to="/register" className="Login_link">
              회원가입하기
            </Link>
          </div>
        </div>
      </div>
      </div>
    );
  // }
}

// export default LoginPage;
