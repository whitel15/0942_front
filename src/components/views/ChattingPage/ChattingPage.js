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
  const [messageTime, setMessageTime] = useState([]);
  const [post, setPost] = useState({});
  const [isLoading, setLoading] = useState(true);

  const getMessagesFromServer = () => {
    console.log(props.location.state.postnum);
    setAllChat([]);
    setIsMymessage([]);
    axios.post('http://localhost:8080/chat', {
      SENDER_ID: localStorage.getItem("user"),
      RECEIVER_ID: props.location.state.writer,
      POST_KEY: props.location.state.postnum
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

            console.log(response.data[i].message);
            console.log(typeof (response.data[i].time));//2021-08-12T20:12:24

            setAllChat(oldArray => [...oldArray, response.data[i].message]);
            setIsMymessage(oldArray => [...oldArray, response.data[i].who]);
            setMessageTime(oldArray => [...oldArray, response.data[i].time]);




            // setAllChat(allChat.concat(response.data[i]))
          }
        }


        // console.log(allChat);
      }) // SUCCESS
      .catch(response => { console.log(response); }); // ERROR

  }

  const getSinglePostInfo = () => {
    console.log("start!");
    axios.post('http://localhost:8080/getSinglePost', {
      postID: props.location.state.postnum
    }
      , {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      }
    )
      .then(response => {

        let tmpcount = Object.keys(response.data).length;
        // console.log(response.data[0], messagecount);

        console.log(response.data.id, tmpcount);
        const percost = Math.round(response.data.cost / (response.data.invite_num + 1));
        
        setPost(
          {
            key: response.data.id,
            id: response.data.id,
            writer: response.data.userId,
            imgs: response.data.images,
            date: response.data.date,
            title: response.data.title,
            cost: response.data.cost,
            place: response.data.place,
            invite_num: response.data.invite_num,
            content: response.data.content,
            writer_score: response.data.writer_score,
            scrap_num: response.data.scrap_num,
            category: response.data.category,
            percost: percost,
          }
        );

        setLoading(false);
        console.log(post);
      }) // SUCCESS
      .catch(response => { console.log(response); }); // ERROR
  }

  useEffect(() => {
    getMessagesFromServer();


  }, []);
  useEffect(() => {
    getSinglePostInfo();
  }, []);
  // console.log(messageTime);
  const writer = props.location.state.writer;

  const sendMessage = () => {
    console.log(messageToSend)
    axios.post('http://localhost:8080/chat/message', {
      INPUT_ID: localStorage.getItem("user"),
      RECEIVER_ID: props.location.state.writer,
      MY_MESSAGE: messageToSend,
      POST_KEY: props.location.state.postnum
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
        setMessageToSend("");

      })
      .catch(function (error) {
        console.log(error)
        alert('잠시후 재시도해주세요!')
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

          {isLoading?
          (<h2 className="chat_isLoading">Loading...</h2>)
          :
          (<table className="chat_message_table">

          {allChat.map((chat, i) => {
            var tmp = sliceMessage(chat);
            // console.log(tmp);
            let messageyear = String(messageTime[i]).substring(0, 4);
            let messagemonth = String(messageTime[i]).substring(5, 7);
            let messagedate = String(messageTime[i]).substring(8, 10);
            let messagehour = parseInt(String(messageTime[i]).substring(11, 13));
            let messageminute = parseInt(String(messageTime[i]).substring(14, 16));
            let messagesecond = parseInt(String(messageTime[i]).substring(16));
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
                        {messagenoon} <br />{messagehour}:{messageminute}
                      </div>
                    </div>
                  </div>
                </tr>
              );
            }
          })}
        </table>)
          }

        </div>

        <div className="chat_send_div">
          <textarea
            type="text"
            value={messageToSend}
            onInput={e => setMessageToSend(e.target.value)}
            placeholder="메세지를 입력하세요"
            className="chat_message_textinput"
          />
          <div className="chat_send_empty" />
          <button className="chat_send_button" onClick={() => { sendMessage(); }}>전송</button>
        </div>
        <div className="chat_go_to_post_div">
          {/* <button className="chat_go_to_post_button" onClick={() => { }}>게시글로 이동</button> */}
          {/* {post.map((post, index) => {
            console.log(post);
            return ( */}
          <Link
                to={{
                  pathname: `/post/${props.location.state.postnum}`,
                  state: {
                    key: post.key,
                    id: post.id,
                    writer: post.writer,
                    imgs: post.imgs,
                    date: post.date,
                    title: post.title,
                    cost: post.cost,
                    place: post.place,
                    invite_num: post.invite_num,
                    content: post.content,
                    writer_score: post.writer_score,
                    scrap_num: post.scrap_num,
                    category: post.category,
                    percost: post.percost
                  },
                }}>
                <text className="chat_go_to_post_button">게시글로 이동</text>
              </Link>
          {/* )
          })} */}
        </div>
      </div>
    </div>
  );
}