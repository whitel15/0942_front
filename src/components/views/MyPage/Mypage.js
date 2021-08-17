import React, { useState, useEffect } from "react";
import "./Mypage.css";
import { Link } from "react-router-dom";
import Post from "../../post/Post";
import TitleCategory from "../TitleCategory";
import SearchBar from "../NavBar/SearchBar";
import Pagination from "../Pagination/Pagination";
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import { useHistory } from "react-router-dom";
import { cacheAdapterEnhancer } from "axios-extensions";
import mypageicon from '../../../asset/mypageicon.png';
import messageicon from '../../../asset/messageicon.png';
import listicon from '../../../asset/listicon.png';
import settingicon from '../../../asset/settingicon.png';
import logouticon from '../../../asset/logouticon.png';
import bookmarkicon from '../../../asset/bookmarkicon.png';

export default function Mypage(props) {

    const history = useHistory();
    if (localStorage.getItem('user') == null) {
        alert('로그인이 필요한 서비스 입니다.');
        history.push("/login");
    }
    console.log(props.logedinuser);
    return (
        <div>
            <NavBar />
            <div className="myPage">
                <div className="mypage_innerdiv">
                    <div className="mypage_userinfo_div" >
                        <table className="mypage_name_table">
                            <tr>
                                <td style={{ width: "85px" }}>
                                    <img src={mypageicon} className="mypage_icon" />
                                </td>
                                <td style={{ width: "10px" }}></td>
                                <td style={{ textAlign: "left" }}>
                                    <div>
                                        <text className="mypage_id">{localStorage.getItem("user")} 님</text>
                                    </div>

                                </td>
                            </tr>
                        </table>
                    </div>
                    <hr />
                    <div className="mypage_buttons_div">
                        <table className="mypage_button_table">
                            <tr style={{ width: "100%" }}>
                                <td style={{ width: "100%" }}>
                                    <Link
                                        to={{
                                            pathname: `/chattinglist`,
                                            state: {

                                            },
                                        }}
                                    >
                                        <button className=" mypage_button button--bestia"><div className="button__bg"></div><div className="mypage_button_inner_div"><span><img src={messageicon} className="mypage_button_icon" /><text>나의 채팅함</text></span></div></button>
                                    </Link>
                                </td>
                            </tr>
                            <tr style={{ height: "5px" }}></tr>
                            <tr style={{ width: "100%" }}>
                                <td style={{ width: "100%" }}>
                                    <Link
                                        to={{ pathname: `/mypage/postlist/${localStorage.getItem('user')}` }}
                                    >
                                        <button className=" mypage_button button--bestia"><div className="button__bg"></div><div className="mypage_button_inner_div"><span><img src={listicon} className="mypage_button_icon2" /><text>나의 게시글</text></span></div></button>
                                    </Link>
                                </td>
                            </tr>
                            <tr style={{ height: "5px" }}></tr>
                            <tr style={{ width: "100%" }}>
                                <td style={{ width: "100%" }}>
                                    <Link
                                        to={{ pathname: `/myscrap/${localStorage.getItem('user')}` }}
                                    >
                                        < button className=" mypage_button button--bestia"><div className="button__bg"></div><div className="mypage_button_inner_div"><span><img src={bookmarkicon} className="mypage_button_icon2" /><text>나의 스크랩</text></span></div></button>
                                    </Link>
                                </td>
                            </tr>
                            <tr style={{ height: "5px" }}></tr>
                            <tr style={{ width: "100%" }}>
                                <td style={{ width: "100%" }}>
                                    <button className=" mypage_button button--bestia"><div className="button__bg"></div><div className="mypage_button_inner_div"><span><img src={settingicon} className="mypage_button_icon2" /><text>설정</text></span></div></button>
                                </td>
                            </tr>
                            <tr style={{ height: "5px" }}></tr>
                            <tr style={{ width: "100%" }}>
                                <td style={{ width: "100%" }}>
                                    <button className=" mypage_button button--bestia"><div className="button__bg" onClick={() => { localStorage.clear(); history.push("/"); }}></div><div className="mypage_button_inner_div"><span><img src={logouticon} className="mypage_button_icon2" /><text>로그아웃</text></span></div></button>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div >
    )
}