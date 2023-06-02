import React, { useEffect, useState } from "react";
// import { Map } from "react-kakao-maps";
import Header from "../../components/Header";
import styled, { keyframes, css } from "styled-components";
import IconHereWhite from "../../assets/iconHereWhite.svg";
import IconHereGreen from "../../assets/iconHereGreen.svg";
import { NavigationBar } from "../../components/NavigationBar";
import API_KEYS from "./apikeys.js";

const MapHospital = () => {
  useEffect(() => {
    const kakaoMapsApiKey = API_KEYS.kakaoMaps;

    // API 로드를 위한 스크립트 추가
    const script = document.createElement("script");
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapsApiKey}&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.978),
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);

        // 현재 위치 받아오기
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
            const lat = position.coords.latitude; // 현재 위치의 위도
            const lng = position.coords.longitude; // 현재 위치의 경도

            const myLocationMarkerPosition = new window.kakao.maps.LatLng(
              lat,
              lng
            ); // 현재 위치 좌표

            const myLocationMarker = new window.kakao.maps.Marker({
              position: myLocationMarkerPosition,
              map: map,
              image: new window.kakao.maps.MarkerImage(
                IconHereGreen,
                new window.kakao.maps.Size(70, 70)
              ),
            });

            const bounds = new window.kakao.maps.LatLngBounds();
            bounds.extend(myLocationMarkerPosition);
            map.setBounds(bounds);
          });
        }
      });
    };
  }, []);

  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Wrapper>
      <Header headerTitle={"내 위치 설정"}></Header>
      <div
        id="map"
        style={{
          width: "100%",
          height: "100vh",
          position: "relative",
          zIndex: 1,
        }}
      />
      <ButtonStyle>
        <img alt={"icon-here"} src={IconHereWhite}></img>
        <span>위치 지정 완료</span>
      </ButtonStyle>
      <NavigationBar />
    </Wrapper>
  );
};

export default MapHospital;

const Wrapper = styled.div`
  display: relative;
`;

const ButtonStyle = styled.button`
  position: absolute;
  display: flex;
  bottom: 0%;
  left: 50%;
  z-index: 3;
  font-size: 20px;

  font-weight: 700;
  color: white;
  border: 1px solid #00954f;
  border-radius: 5px;
  background-color: #00ad5c;
  cursor: pointer;
  transform: translate(-50%, -70%);
  padding: 1% 3.5%;
`;
