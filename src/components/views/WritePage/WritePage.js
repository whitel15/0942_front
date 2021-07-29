import React, { useRef, useState, setState } from "react";
import './WritePage.css';
import { useMediaQuery } from 'react-responsive';
import TitleCategory from "../TitleCategory";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";

import TextField from '@material-ui/core/TextField';

let count = 0;

export default function WritePage() {
    // axios.get('http://localhost:8080/write/image')
    //     .then(response => {
    //         //response.data 출력
    //         console.log("success");
    //     }) // SUCCESS
    //     .catch(response => {
    //         console.log(response);
    //         // alert('fail'); 
    //     }); // ERROR

    const [logoLoading, setLogoLoading] = useState(false);
    const [imgBase64, setImgBase64] = useState(""); // 파일 base64
    const [imageUrl, setImageUrl] = useState([]);
    const logoImageInput = useRef();
    const scroll = useRef();

    const [putImage, setPutImage] = useState([]);

    const imagePreviews = [];

    const onImgInputButtonClick = () => {
        logoImageInput.current.click();
    };

    const onImgChange = (e) => {
        if (count === 5) {
            alert('사진은 최대 5개까지 업로드 가능합니다');
            return;
        }
        let reader = new FileReader();
        const base64 = reader.result;
        reader.onloadend = () => {
            // 2. 읽기가 완료되면 아래코드가 실행됩니다.
            setLogoLoading(true);
            const base64 = reader.result;
            if (base64) {
                setImgBase64(base64.toString()); // 파일 base64 상태 업데이트
            }
        }
        if (e.target.files[0]) {
            console.log(e.target.files[0]);
            reader.readAsDataURL(e.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
            setPutImage(e.target.files[0]); // 파일 상태 업데이트
            // setImageUrl(reader.readAsDataURL(e.target.files[0]));
            // alert("주소:" + URL.createObjectURL(e.target.files[0]));
            // .push(URL.createObjectURL(e.target.files[0]));
            setImageUrl(oldArray => [...oldArray, URL.createObjectURL(e.target.files[0])])
            count++;
            console.log(imageUrl);
        }
    };

    const imageClicktoDelete = (url) => {
        // imageUrl.filter(item=>item!==url);
        const index = imageUrl.indexOf(url);
        console.log(index);
        var array = [...imageUrl];
        if (index !== -1) {
            array.splice(index, 1);
            setImageUrl(array);
        }
        count--;
    }

    const [color, setColor] = useState(["#D8D7D7", "#D8D7D7"]);
    const [category, setCategory] = useState("");
    const categoryClick1 = () => {
        setColor(["rgb(120, 120, 120)", "#D8D7D7"]);
        setCategory("음식");
    }
    const categoryClick2 = () => {
        setColor(["#D8D7D7", "rgb(120, 120, 120)"]);
        setCategory("물건");
    }

    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

    const numOnly = (e) => {
        const { value } = e.target;

        if (value.match('.')) {
            this.setState({ value: parseInt(value) })
        }

        return null;
    }

    const [title, setTitle] = useState("");
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const [inviteNum, setInviteNum] = useState(1);
    const handleInviteNumChange = (e) => {
        setInviteNum(e.target.value);
    }

    const [place, setPlace] = useState("")
    const handlePlaceChange = (e) => {
        setPlace(e.target.value);
    }

    const [content, setContent] = useState("")
    const handleContentChange = (e) => {
        setContent(e.target.value);
    }
    
    const [cost, setCost] = useState(0)
    const handleCostChange = (e) => {
        setCost(e.target.value);
    }

    const postUpload = () => {
        if (title === "") {
            alert("제목을 입력하세요."); return;
        }
        if (category === "") {
            alert("카테고리를 눌러주세요."); return;
        }
        if (place === "") {
            alert("장소를 입력하세요."); return;
        }
        if (cost === 0) {
            alert("가격을 입력하세요."); return;
        }
        if (content === "") {
            alert("내용을 입력하세요."); return;
        }
        let post = {
            USER_ID : "yujin",
            POST_TITLE: title,
            POST_CATEGORY: category,
            POST_INVITE_NUM: inviteNum,
            POST_SCRAP_NUM: 0,
            POST_CONTENT: content,
            POST_PLACE: place,
            POST_COST: cost,
        }
        const formData = new FormData();
        formData.append("images", putImage[0]);
        formData.append("post", new Blob([JSON.stringify(post)], {type: "application/json"}))
        console.log(formData);
        axios.post('http://localhost:8080/write/upload', formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then((response) => console.log(response));
    };

    return (
        <div className="write_div">
            <TitleCategory slider={false} category={false} />
            <div className="write_out_div">

                <div className="write_firtst_div">

                    <div onClick={() => { onImgInputButtonClick() }} className="write_plus_div" >
                        <AiOutlinePlus className="write_plus_icon" />
                        <input ref={logoImageInput} type='file' className="write_imgInput" id='logoImg' accept='image/*' name='file' onChange={onImgChange} style={{ display: 'none' }} />
                    </div>
                    <div ref={scroll} className="write_scroll_div">
                        {imageUrl.map((url, i) => { return (<img className="write_image_preview_img" src={url} onClick={() => { imageClicktoDelete(url) }} />) })}
                        <span style={{ marginLeft: "1rem" }}>{count}/5</span>
                    </div>

                    <input type="submit" value="업로드" className="write_upload_button" onClick={postUpload} />

                </div>
                <div className="write_second_div" >
                    <div className="write_input_form">
                        <form className="write_input_title" noValidate autoComplete="off">
                            <TextField
                                inputProps={{ style: { fontSize: 20 } }} // font size of input text
                                InputLabelProps={{ style: { fontSize: 20 } }} // font size of input label
                                className="write_input_title" id="standard-basic" label="제목을 입력하세요"
                                onChange={handleTitleChange}
                            />
                        </form>
                    </div>
                </div>

                {isMobile === true ?
                    <div className="write_category">

                        <div className="write_category_div">
                            <span className="write_category_p">카테고리 </span>
                            <span className="write_category_button_span" onClick={() => { categoryClick1() }} style={{ backgroundColor: color[0] }}>음식</span>
                            <span className="write_category_button_span" onClick={() => { categoryClick2() }} style={{ backgroundColor: color[1] }}>물건</span>


                        </div>
                        <br /><br /><br />
                        <div className="write_category_div">
                            <span className="write_category_p">모집 인원 </span>
                            <form className="write_category_people_form" noValidate autoComplete="off">
                                {/* <input type="text" name="name" /> */}
                                <TextField
                                    inputProps={{ style: { fontSize: 20, marginTop: '-17px' } }} // font size of input text
                                    InputLabelProps={{ style: { fontSize: 0 }, shrink: false }} // font size of input label
                                    className="write_category_people_text" id="standard-basic" hiddenLabel="true" placeholder="1"
                                    type="number"
                                    onInput={(e) => {
                                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 2)
                                    }}
                                />
                            </form>
                            <span className="write_category_p" > 명 </span>
                            <span className="write_category_p" style={{ color: "#B5B3B3", fontSize: "15px" }}>(최대 인원 :99)</span>
                            <br /><br /><br />
                            <span className="write_category_p" >만날 장소 </span>
                            <span className="write_category_button_span_place" style={{ width: '100%', marginLeft: "-1rem", marginTop: "1rem" }} >
                                {/* <form className="write_category_place_form" noValidate autoComplete="off"> */}
                                <span style={{ width: '90%' }}>
                                    <TextField
                                        inputProps={{ style: { fontSize: 20, marginTop: '-15px' } }} // font size of input text
                                        InputLabelProps={{ style: { fontSize: 0 }, shrink: false }} // font size of input label
                                        fullWidth
                                        className="write_category_people_text" id="standard-basic" hiddenLabel="true" placeholder="장소를 입력하세요."

                                        onInput={(e) => {
                                            e.target.value = e.target.value.slice(0, 40)
                                        }}
                                        onChange={handlePlaceChange}
                                    />
                                </span>
                                {/* </form> */}
                            </span>
                            <br /><br /><br />
                            <span className="write_category_p">배송비</span>
                            <form className="write_category_cost_form" noValidate autoComplete="off">
                                <TextField
                                    InputProps={{ inputProps: { min: "1000", step: "500", style: {fontSize: 20, marginTop: '-15px'}} }}
                                    InputLabelProps={{ style: { fontSize: 0 }, shrink: false }} // font size of input label
                                    className="write_category_cost_text" id="standard-basic" hiddenLabel="true" placeholder="1000"
                                    type="number"
                                    onInput={(e) => {
                                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 5)
                                    }}
                                    onChange={handleCostChange}
                                />
                            </form>
                            <span className="write_category_p" > 원</span>
                            
                        </div>



                    </div>
                    :
                    <div className="write_category">
                        <div className="write_category_div">
                            <span className="write_category_p" style={{ marginRight: "1.5rem"}} >카테고리</span>
                            <span className="write_category_button_span" onClick={() => { categoryClick1() }} style={{ backgroundColor: color[0] }}>음식</span>
                            <span className="write_category_button_span" onClick={() => { categoryClick2() }} style={{ backgroundColor: color[1] }}>물건</span>
                            <span className="write_category_p" style={{ marginLeft: '5vw' }}>모집 인원</span>
                            <form className="write_category_people_form" noValidate autoComplete="off">

                                <TextField
                                    inputProps={{ style: { fontSize: 20, marginTop: '-15px' } }} // font size of input text
                                    InputLabelProps={{ style: { fontSize: 0 }, shrink: false }} // font size of input label
                                    className="write_category_people_text" id="standard-basic" hiddenLabel="true" placeholder="1"
                                    type="number"
                                    onInput={(e) => {
                                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 2)
                                    }}
                                    onChange={handleInviteNumChange}
                                />

                            </form>
                            <span className="write_category_p" > 명 </span>
                            <span className="write_category_p" style={{ color: "#B5B3B3", fontSize: "15px" }}>(최대 인원 :99)</span>
                            <br /><br /><br />
                            <span className="write_category_p" >만날 장소 </span>
                            <span className="write_category_button_span_place"  >
                                {/* <form className="write_category_place_form" noValidate autoComplete="off"> */}
                                <span style={{ width: '90%' }}>
                                    <TextField
                                        inputProps={{ style: { fontSize: 20, marginTop: '-10px' } }} // font size of input text
                                        InputLabelProps={{ style: { fontSize: 0 }, shrink: false }} // font size of input label
                                        fullWidth
                                        className="write_category_people_text" id="standard-basic" hiddenLabel="true" placeholder="장소를 입력하세요."

                                        onInput={(e) => {
                                            e.target.value = e.target.value.slice(0, 40)
                                        }}
                                        onChange={handlePlaceChange}
                                    />
                                </span>
                                {/* </form> */}
                            </span>
                            <br /><br /><br />
                            <span className="write_category_p">배송비</span>
                            <form className="write_category_cost_form" noValidate autoComplete="off">
                                <TextField
                                    InputProps={{ inputProps: { min: "1000", step: "500", style: {fontSize: 20, marginTop: '-15px'}} }}
                                    InputLabelProps={{ style: { fontSize: 0 }, shrink: false }} // font size of input label
                                    className="write_category_cost_text" id="standard-basic" hiddenLabel="true" placeholder="1000"
                                    type="number"
                                    onInput={(e) => {
                                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 5)
                                    }}
                                    onChange={handleCostChange}
                                />
                            </form>
                            <span className="write_category_p" > 원</span>
                        </div>

                    </div>

                }

                <br /><br />
                {/* <hr style={{ width: "90%" }} /> */}

                <div className="write_second_div2" style={{ height: '30vh' }} >

                    <textarea
                        placeholder="내용을 입력하세요"
                        onChange={handleContentChange}
                    />
                </div>


            </div>
        </div>
    )
}