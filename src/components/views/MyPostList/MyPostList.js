import React, { useRef, useState, setState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import "./MyPostList.css";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import axios from "axios";
import SearchBar from "../NavBar/SearchBar";
import Post from "../../post/Post";

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height,
    };
}

export default function MyPostList(props) {
    const [messageToSend, setMessageToSend] = useState('');
    const [isLoading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);


    let messagecount = 0;
    const [allChat, setAllChat] = useState([]);
    const [isMyMessage, setIsMymessage] = useState([]);
    const [messageTime, setMessageTime] = useState([]);

    const getMessagesFromServer = () => {

        setAllChat([]);
        setIsMymessage([]);
        axios.post('http://localhost:8080/mypage/postlist', {
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



                for (let i = 0; i < messagecount; i++) {

                    if (response.data[i]) {

                        setPosts([...response.data]);

                    }
                }
                setLoading(false);
            }) // SUCCESS
            .catch(response => { console.log(response); }); // ERROR

    }

    useEffect(() => {
        getMessagesFromServer();
    }, []);

    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
    const isMobile = useMediaQuery({
        query: "(max-device-width: 1224px)",
    });

    const [currentPage, setCurrentPage] = useState(1);
    let count = 10;

    const lastIdx = currentPage * count;
    const firstIdx = lastIdx - count;

    const currentPosts = (postList) => {
        return postList.slice(firstIdx, lastIdx);
    }

    return (
        <div>
            <NavBar />
            <div className="MyPostList">
                <SearchBar />

                <h1>나의 게시글</h1>

                {isLoading ? (
                    <div className="main_loading">Loading...</div>
                ) : (
                    currentPosts(posts).map((post, index) => (
                        <Post
                            key={post.id}
                            id={post.id}
                            writer={post.userId}
                            imgs={post.images}
                            date={post.date}
                            title={post.title}
                            cost={post.cost}
                            place={post.place}
                            invite_num={post.invite_num}
                            content={post.content}
                            writer_score={post.writer_score}
                            scrap_num={post.scrap_num}
                            category={post.category}
                        />
                    ))
                )}

            </div>
        </div>
    )
}