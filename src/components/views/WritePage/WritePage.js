import React, { useRef, useState, setState } from "react";
import './WritePage.css';
import { useMediaQuery } from 'react-responsive';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import TitleCategory from "../TitleCategory";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";

import TextField from '@material-ui/core/TextField';

let count = 0;

export default function WritePage() {
    axios.get('http://localhost:8080/image')
        .then(response => {
            //response.data 출력
            console.log("success");
        }) // SUCCESS
        .catch(response => {
            console.log(response);
            // alert('fail'); 
        }); // ERROR

    const [logoLoading, setLogoLoading] = useState(false);
    const [imgBase64, setImgBase64] = useState(""); // 파일 base64
    const [imageUrl, setImageUrl] = useState([]);
    const logoImageInput = useRef();
    const scroll = useRef();

    const [putImage, setPutImage] = useState([]);
    const [countImage, setCountImage] = useState(0);

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
            reader.readAsDataURL(e.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
            setPutImage(e.target.files[0]); // 파일 상태 업데이트
            // setImageUrl(reader.readAsDataURL(e.target.files[0]));
            // alert("주소:" + URL.createObjectURL(e.target.files[0]));
            // .push(URL.createObjectURL(e.target.files[0]));
            setImageUrl(oldArray => [...oldArray, URL.createObjectURL(e.target.files[0])])
            count++;
            console.log(imageUrl);
        }


        const formData = new FormData();

        formData.append('images', putImage[0]);
        return axios.post('http://localhost:8080/api/upload/image', formData)
            .then(res => alert('성공'))
            .catch(
                function (error) {
                    // alert(error);
                    console.log(error);
                }
            );
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



    return (
        <div className="write_div">
            <TitleCategory slider={false} category={false} />
            <div className="write_out_div">

                <div className="write_firtst_div">

                    <div onClick={() => { onImgInputButtonClick() }} className="write_plus_div" >
                        <AiOutlinePlus className="write_plus_icon" />
                        <input ref={logoImageInput} type='file' className="write_imgInput" id='logoImg' accept='image/*' name='file' onChange={e => onImgChange(e)} style={{ display: 'none' }} />
                    </div>
                    <div ref={scroll} className="write_scroll_div">
                        {imageUrl.map((url, i) => { return (<img className="write_image_preview_img" src={url} onClick={() => { imageClicktoDelete(url) }} />) })}
                    </div>

                    <div className="write_upload_button_div">
                        <p className="write_upload_button">업로드</p>
                    </div>

                </div>
                <div className="write_second_div" >
                    <div className="write_input_form">
                        <form className="write_input_title" noValidate autoComplete="off">
                            <TextField
                                inputProps={{ style: { fontSize: 20 } }} // font size of input text
                                InputLabelProps={{ style: { fontSize: 20 } }} // font size of input label
                                className="write_input_title" id="standard-basic" label="제목을 입력하세요"
                            />
                        </form>
                    </div>
                </div>

                <div className="write_category">
                    <div style={{width:'60%',justifyContent:'start', alignItems:'start'}}>
                        <p style={{display:'inline'}}>카테고리</p>
                        <p style={{display:'inline'}}>카테고리</p>
                    </div>
                    
                </div>

            </div>
        </div>
    )
}