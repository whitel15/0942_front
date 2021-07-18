import React, { useRef, useState, setState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import "./ChattingPage.css";

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
  const writer = props.location.state.writer;
  const [othersChat, setOthersChat] = useState([
    "안녕하세요! 😍😍😍저도 참여    하고 싶습니다.ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ!안녕하세요!저도 참여하고 싶습니다.ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ!안녕하세요!저도 참여하고 싶습니다.ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ!",
    "안녕하세요! 😍😍😍저도 참여    하고 싶습니다.ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ!안녕하세요!저도 참여하고 싶습니다.ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ!안녕하세요!저도 참여하고 싶습니다.ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ!",
    "안녕하세요! 😍😍😍저도 참여    하고 싶습니다.ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ!안녕하세요!저도 참여하고 싶습니다.ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ!안녕하세요!저도 참여하고 싶습니다.ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ!",
    "안녕하세요! 😍😍😍저도 참여    하고 싶습니다.ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ!안녕하세요!저도 참여하고 싶습니다.ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ!안녕하세요!저도 참여하고 싶습니다.ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ!",
    "안녕하세요! 😍😍😍저도 참여    하고 싶습니다.ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ!안녕하세요!저도 참여하고 싶습니다.ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ!안녕하세요!저도 참여하고 싶습니다.ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ!",
    "안녕하세요! 😍😍😍저도 참여    하고 싶습니다.ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ!안녕하세요!저도 참여하고 싶습니다.ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ!안녕하세요!저도 참여하고 싶습니다.ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ!",
    "안녕하세요! 😍😍😍저도 참여    하고 싶습니다.ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ!안녕하세요!저도 참여하고 싶습니다.ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ!안녕하세요!저도 참여하고 싶습니다.ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ!",
    "저 참여하고 싶어요!",
  ]);
  const [myChat, setMyChat] = useState([
    "네 안녕하세요~~~!",
    "배분 장소랑 물품 품목 확인하셨나요~~~~~~~~~~~~~~~~~~??",
  ]);
  var tmpChat = othersChat;
  const chatUpdate = () => {
    setOthersChat(["안녕하세요!", "저 참여하고 싶어요"]);
  };

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
    <div className="chat_div">
      <div className="chat_out_div">
        <div className="chat_innertitle_div">
          <div style={{ width: "50%" }}>
            <span className="chat_nick_span">{writer}</span>
          </div>
          <div style={{ width: "50%" }}>
            <span className="chat_option_span">신고</span>{" "}
            <span className="chat_option_span"> | </span>{" "}
            <span className="chat_option_span">후기 남기기 </span>
          </div>
        </div>
        <hr style={{ margin: "10px" }} />
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
          {othersChat.map((chat, i) => {
            var tmp = sliceMessage(chat);
            console.log(tmp);
            return (
              <tr>
                <div className="chat_chat_not_me_div">
                  <div
                    className=""
                    style={{
                      width: messageBoxWidth,
                      backgroundColor: "#c4c4c4",
                      borderRadius: "15px",
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
                      }}
                    >
                      오후 <br/>11:10
                    </div>
                  </div>
                </div>
              </tr>
            );
          })}

          {myChat.map((chat, i) => {
            var tmp = sliceMessage(chat);
            console.log(tmp);
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
                          position:'absolute',
                          right:0,
                          bottom: 0,
                        }}
                      >
                        오후
                        <br/>
                        11:10
                      </div>
                    </div>
                    <div
                      className=""
                      style={{
                        width: messageBoxWidth,
                        backgroundColor: "#c4c4c4",
                        borderRadius: "15px",
                      }}
                    >
                      {tmp.map(m => {
                        return <div className="chat_message_span">{m}</div>;
                      })}
                    </div>
                    {/* <div
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
                        }}
                      >
                        오후 11:10
                      </div>
                    </div> */}
                  </div>
                </div>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}
