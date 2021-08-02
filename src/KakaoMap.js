
/* global kakao */
import React, { useState, useEffect } from "react";

export default function KakaoMap(props){
    // console.log("카카오맵API를 받아옵니다 ***", window.kakao);
    useEffect(() => {
        const script = document.createElement("script");
        script.async = true;
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_API_KEY}&libraries=services`;
        document.head.appendChild(script);

        var geocoder = new kakao.maps.services.Geocoder();
        navigator.geolocation.getCurrentPosition(function (position) {
            // console.log("Latitude is :", position.coords.latitude); //37....
            // console.log("Longitude is :", position.coords.longitude);//126~127...
            var geocoder = new kakao.maps.services.Geocoder();
        
            var coord = new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var callback = function (result, status) {
              if (status === kakao.maps.services.Status.OK) {
                console.log('그런 너를 마주칠까 ' + result[0].address.address_name + '을 못가');
                localStorage.setItem("currentLocation",result[0].address.address_name);
              }
            };
            
            // geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
          });
        
    });
    // return(
    //     <div>

    //     </div>
    // )
}