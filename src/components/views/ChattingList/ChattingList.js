import React, { useRef, useState, setState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import axios from "axios";
import "./ChattingList.css";
import SearchBar from "../NavBar/SearchBar";

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height,
    };
}

function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
    );

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
}

export default function ChattingList(props) {
    const [messageToSend, setMessageToSend] = useState('');


    let messagecount = 0;
    const [allChat, setAllChat] = useState([]);
    const [isMyMessage, setIsMymessage] = useState([]);
    const [messageTime, setMessageTime] = useState([]);
    const [finalMessage, setFinalMessage] = useState([]);
    const [finalTime, setFinalTime] = useState([]);
    const [receiver, setReceiver] = useState([]);
    const [postNum, setPostNum] = useState([]);
    const [theArray, setTheArray] = useState([]);
    const [isThereAnyMessage, setIsThereAnyMessage] = useState(true);

    const getMessagesFromServer = () => {
        console.log(props.location.state.postnum);
        setAllChat([]);
        setIsMymessage([]);
        axios.post('http://localhost:8080/myinfo/chatlist', {
            MY_ID: localStorage.getItem("user")
        }
            , {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            }
        )
            .then(response => {
                console.log(response.data);
                messagecount = Object.keys(response.data).length;
                // console.log(response.data[0], messagecount);

                if (response.data[0]) {
                    setIsThereAnyMessage(false);
                }


                for (let i = 1; i <= messagecount; i++) {
                    setIsThereAnyMessage(true);

                    if (response.data[i]) {
                        let messageyear = String(response.data[i].finaltime).substring(2, 4);
                        let messagemonth = String(response.data[i].finaltime).substring(5, 7);
                        let messagedate = String(response.data[i].finaltime).substring(8, 10);
                        let messagehour = parseInt(String(response.data[i].finaltime).substring(11, 13));
                        let messageminute = parseInt(String(response.data[i].finaltime).substring(14, 16));
                        let messagesecond = parseInt(String(response.data[i].finaltime).substring(16));
                        let messagenoon = "오후";
                        if (messagehour > 11) {
                            messagenoon = "오후";
                            messagehour = messagehour - 12;
                        }
                        else {
                            messagenoon = "오전";
                        }
                        let chattime = messageyear + "." + messagemonth + "." + messagedate + " " + String(response.data[i].finaltime).substring(11, 13) + ":" + messageminute;
                        setFinalMessage(oldArray => [...oldArray, response.data[i].finalmessage]);
                        setFinalTime(oldArray => [...oldArray, chattime]);
                        setPostNum(oldArray => [...oldArray, response.data[i].postnum]);
                        setReceiver(oldArray => [...oldArray, response.data[i].receiver]);
                    }
                }
            }) // SUCCESS
            .catch(response => { console.log(response); }); // ERROR

    }

    useEffect(() => {
        getMessagesFromServer();
    }, []);

    console.log(postNum);

    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
    const isMobile = useMediaQuery({
        query: "(max-device-width: 1224px)",
    });

    const { screenHeight, screenWidth } = useWindowDimensions();

    var maxlength = isMobile === true ? 15 : isTabletOrMobile === true ? 30 : 50;
    var messageBoxWidth = screenWidth * 0.03 * maxlength + 25;


    return (
        <div>
            <NavBar />
            <div className="ChattingList">
                <SearchBar />

                <h1>나의 채팅 목록</h1>



                {isThereAnyMessage ? (
                    finalMessage.map((message, i) => {
                        console.log("df");
                        return (
                            <Link
                                to={{
                                    pathname: `/chat/${receiver[i]}`,
                                    state: {
                                        writer: receiver[i],
                                        postnum: postNum[i]
                                    },
                                }}
                            >
                                <div className="ChattingList_back">
                                    <div className="ChattingList_ChatInfo">
                                        <img
                                            src="/images/main/user.png"
                                            alt="user"
                                            className="ChattingList_userimg"
                                        />
                                        <span className="ChattingList_id">{receiver[i]}</span>
                                        <span className="ChattingList_date">{finalTime[i]}</span>
                                    </div>
                                    <div className="ChattingList_lastchat">
                                        {finalMessage[i]}
                                    </div>
                                </div>
                            </Link>
                        )
                    }))
                    :
                    (<div>메세지함이 비었습니다...</div>)}

            </div>
        </div>
    )
}