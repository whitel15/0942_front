import React, { useRef, useState, setState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import "./ChattingPage.css";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import axios from "axios";

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

export default function ChattingPage(props) {
  const [messageToSend, setMessageToSend] = useState('');


  let messagecount = 0;
  const [allChat, setAllChat] = useState([]);
  const [isMyMessage, setIsMymessage] = useState([]);
  const [messageTime, setMessageTime]=useState([]);
  // let messageyear = "";
  // let messagemonth = "";
  // let messagedate = "";
  // let messagehour = 0;
  // let messageminute = 0;
  // let messagesecond = 0;
  // let messagenoon = "오후";

  const getMessagesFromServer = () => {
    setAllChat([]);
    setIsMymessage([]);
    axios.post('http://localhost:8080/chat', {
      SENDER_ID: localStorage.getItem("user"),
      RECEIVER_ID: props.location.state.writer,

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



        for (let i = 0; i < messagecount; i++) {

          if (response.data[i]) {
            if (response.data[i].who == "me") {
              console.log(response.data[i].message);
              console.log(typeof (response.data[i].time));//2021-08-12T20:12:24

              setAllChat(oldArray => [...oldArray, response.data[i].message]);
              setIsMymessage(oldArray => [...oldArray, response.data[i].who]);
              setMessageTime(oldArray => [...oldArray, response.data[i].time]);

            }
            else {
              console.log(response.data[i].message);
            }
            // setAllChat(allChat.concat(response.data[i]))
          }
        }


        // console.log(allChat);
      }) // SUCCESS
      .catch(response => { console.log(response); }); // ERROR

  }

  useEffect(() => {
    getMessagesFromServer();
  }, []);
  // getMessagesFromServer();
  const writer = props.location.state.writer;
  const [othersChat, setOthersChat] = useState([
    "안녕하세요! 😍😍😍저도 참여    하고 싶습니다.ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ!안녕하세요!저도 참여하고 싶습니다.ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ!안녕하세요!저도 참여하고 싶습니다.ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ!",

  ]);
  const [myChat, setMyChat] = useState([
    "네 안녕하세요~~~!",
    "배분 장소랑 물품 품목 확인하셨나요~~~~~~~~~~~~~~~~~~??",
  ]);
  var tmpChat = othersChat;
  const chatUpdate = () => {
    setOthersChat(["안녕하세요!", "저 참여하고 싶어요"]);
  };


  const sendMessage = () => {
    console.log(messageToSend)
    axios.post('http://localhost:8080/chat/message', {
      INPUT_ID: localStorage.getItem("user"),
      RECEIVER_ID: props.location.state.writer,
      MY_MESSAGE: messageToSend
    }
      , {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      }
    )
      .then(function (response) {
        console.log('전송됨', messageToSend)
        getMessagesFromServer()
        // console.log(response.data.me)

      })
      .catch(function (error) {
        console.log(error)
        alert('입력란을 모두 완성해주세요!')
        // window.location.href='/login'
      });

  }

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isMobile = useMediaQuery({
    query: "(max-device-width: 1224px)",
  });

  const { screenHeight, screenWidth } = useWindowDimensions();

  var maxlength = isMobile === true ? 15 : isTabletOrMobile === true ? 30 : 50;
  // var messageBoxWidth = (window.innerWidth) * 0.03 * maxlength + 25;
  var messageBoxWidth = screenWidth * 0.03 * maxlength + 25;

  const sliceMessage = chat => {
    var chatlong = chat;

    var chatlength = chat.length / maxlength;
    var tmp = [];
    for (var i = 0; i <= chatlength; i++) {
      if (chatlong.length > maxlength && chatlength !== 0) {
        if (chat.length / maxlength === i) {
          tmp.push(chatlong);
        } else {
          tmp.push(chat.slice(i * maxlength, (i + 1) * maxlength));
        }
      } else {
        tmp.push(chatlong);
        messageBoxWidth = screenWidth * 0.03 * chat.length;

        break;
      }
    }
    return tmp;
  };

  return (
    <div>
      <NavBar />
      <div className="chat_div">
        <div className="chat_out_div">
          <div className="chat_innertitle_div">
            <div style={{ width: "50%" }}>
              <span className="chat_nick_span">{writer}</span>
            </div>
            <div style={{ width: "50%" }}>
              <span className="chat_option_span">신고</span>{" "}
              <span className="chat_option_span"> | </span>{" "}
              <Link
                to={{
                  pathname: `/review/${writer}`,
                  state: {
                    writer: writer
                  },
                }}
              >
                <span className="chat_option_span">후기 남기기 </span>
              </Link>
            </div>
          </div>
          <hr style={{ margin: "15px" }} />
          {/* <div className="chat_chat_div">
                    {othersChat.map((chat, i) => {
                        var tmp = sliceMessage(chat);
                        console.log(tmp);
                        return (<div className="chat_chat_not_me_div"><div className="" style={{ width: messageBoxWidth, backgroundColor: "#c4c4c4" , borderRadius:"15px"}}>{tmp.map((m) => { return <div className="chat_message_span">{m}</div>; })}</div><div style={{ height: (window.innerWidth) * 0.03 * chat / maxlength, position: "relative" }}><div style={{ verticalAlign: "bottom", position: "absolute", bottom: 0 }}>오후 11:10</div></div></div>);
                    })}
                    {myChat.map((chat, i)=>{
                         var tmp = sliceMessage(chat);
                         console.log(tmp);
                         return (<div><div className="chat_chat_my_div"><div className="" style={{ width: messageBoxWidth, backgroundColor: "#c4c4c4" , borderRadius:"15px"}}>{tmp.map((m) => { return <div className="chat_message_span">{m}</div>; })}</div><div style={{ height: (window.innerWidth) * 0.03 * chat / maxlength, position: "relative" }}><div style={{ verticalAlign: "bottom", position: "absolute", bottom: 0 }}>오후 11:10</div></div></div></div>);
                    })}
                </div> */}

          <table className="chat_message_table">
            
            {allChat.map((chat, i) => {
              var tmp = sliceMessage(chat);
              // console.log(tmp);
              let messageyear = String( messageTime[i]).substring(0, 4);
              let messagemonth = String( messageTime[i]).substring(5, 7);
              let messagedate = String( messageTime[i]).substring(8, 10);
              let messagehour = parseInt(String( messageTime[i]).substring(11, 13));
              let messageminute = parseInt(String( messageTime[i]).substring(14, 16));
              let messagesecond = parseInt(String( messageTime[i]).substring(16));
              let messagenoon = "오후";
              if (messagehour > 11) {
                messagenoon = "오후";
                messagehour = messagehour - 12;
              }
              else {
                messagenoon = "오전";
              }
              if (isMyMessage[i] == "me") {
                return (
                  <tr>
                    <div style={{ float: 'right' }}>
                      <div className="chat_chat_my_div">
                        <div
                          style={{
                            height: (window.innerWidth * 0.03 * chat) / maxlength,
                            position: "relative",
                          }}
                        >
                          <div
                            style={{
                              verticalAlign: "bottom",
                              position: 'absolute',
                              right: "0.5rem",
                              bottom: 0,
                            }}
                          >
                            {messagenoon}
                            <br />
                            {messagehour}:{messageminute}
                          </div>
                        </div>
                        <div
                          className=""
                          style={{
                            width: messageBoxWidth,
                            backgroundColor: "rgb(198, 211, 228)",
                            borderRadius: "15px",
                            padding: "1.5rem",
                          }}
                        >
                          {tmp.map(m => {
                            return <div className="chat_message_span">{m}</div>;
                          })}
                        </div>
                      </div>
                    </div>
                  </tr>
                );
              }

              else {
                return (
                  <tr>
                    <div className="chat_chat_not_me_div">
                      <div
                        className=""
                        style={{
                          width: messageBoxWidth,
                          backgroundColor: "rgb(220, 220, 220)",
                          borderRadius: "15px",
                          padding: "1.5rem",
                        }}
                      >
                        {tmp.map(m => {
                          return <div className="chat_message_span">{m}</div>;
                        })}
                      </div>
                      <div
                        style={{
                          height: (window.innerWidth * 0.03 * chat) / maxlength,
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            verticalAlign: "bottom",
                            position: "absolute",
                            bottom: 0,
                            left: "0.5rem",
                          }}
                        >
                          오후 <br />11:10
                        </div>
                      </div>
                    </div>
                  </tr>
                );
              }
            })}


            {/* 상대 채팅 메시지 */}
            {/* {othersChat.map((chat, i) => {
              var tmp = sliceMessage(chat);
              // console.log(tmp);
              return (
                <tr>
                  <div className="chat_chat_not_me_div">
                    <div
                      className=""
                      style={{
                        width: messageBoxWidth,
                        backgroundColor: "rgb(220, 220, 220)",
                        borderRadius: "15px",
                        padding: "1.5rem",
                      }}
                    >
                      {tmp.map(m => {
                        return <div className="chat_message_span">{m}</div>;
                      })}
                    </div>
                    <div
                      style={{
                        height: (window.innerWidth * 0.03 * chat) / maxlength,
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          verticalAlign: "bottom",
                          position: "absolute",
                          bottom: 0,
                          left: "0.5rem",
                        }}
                      >
                        오후 <br />11:10
                      </div>
                    </div>
                  </div>
                </tr>
              );
            })} */}

            {/* 내 채팅 메시지 */}
            {/* {myChat.map((chat, i) => {
              var tmp = sliceMessage(chat);
              // console.log(tmp);

            })} */}
          </table>

        </div>

        <div className="chat_send_div">
          <input
            type="text"
            value={messageToSend}
            onInput={e => setMessageToSend(e.target.value)}
            placeholder="메세지를 입력하세요"
            className="chat_message_textinput"
          />
          <div className="chat_send_empty" />
          <button className="chat_send_button" onClick={() => { sendMessage(); }}>send</button>
        </div>
      </div>
    </div>
  );
}