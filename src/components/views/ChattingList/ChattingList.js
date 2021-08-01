import React, { useState } from "react";
import "./ChattingList.css";
import TitleCategory from "../TitleCategory";
import SearchBar from "../NavBar/SearchBar";
import NavBar from "../NavBar/NavBar";

function ChattingList(img) {

    return (
        <div>
            <NavBar/>
            <div className="ChattingList">
                <SearchBar />
                <TitleCategory slider={true} category={true} />
                <div className="ChattingList_back">
                    <div className="ChattingList_ChatInfo">
                        <img
                            src="/images/main/user.png"
                            alt="user"
                            className="ChattingList_userimg"
                        />
                        <span className="ChattingList_id">닉네임1</span>
                        <span className="ChattingList_date">21.07.16</span>
                    </div>
                    <div className="ChattingList_lastchat">
                        네~감사합니다
                    </div>
                </div>

                <div className="ChattingList_back">
                    <div className="ChattingList_ChatInfo">
                        <img
                            src="/images/main/user.png"
                            alt="user"
                            className="ChattingList_userimg"
                        />
                        <span className="ChattingList_id">닉네임2</span>
                        <span className="ChattingList_date">21.07.15</span>
                    </div>
                    <div className="ChattingList_lastchat">
                        네~감사합니다
                    </div>
                </div>

                <div className="ChattingList_back">
                    <div className="ChattingList_ChatInfo">
                        <img
                            src="/images/main/user.png"
                            alt="user"
                            className="ChattingList_userimg"
                        />
                        <span className="ChattingList_id">닉네임3</span>
                        <span className="ChattingList_date">21.07.13</span>
                    </div>
                    <div className="ChattingList_lastchat">
                        네~감사합니다
                    </div>
                </div>

            </div>
        </div>
    );
}


export default ChattingList;
