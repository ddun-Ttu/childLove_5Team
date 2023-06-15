import * as Style from "./styles/MapStyle";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import axios from "axios";
import { useLocation } from "react-router-dom";

//아이콘
import {
  IconDown,
  IconUp,
  IconClockMap,
  IconMapGray,
  IconTel,
  IconMyLocationW,
  IconMapG,
  IconMyLocationG,
} from "../../assets/index";

// 공통 컴포넌트
import { Header, NavigationBar, CardBox } from "../../components/index";
//utils
import { formatTime, BE_URL, endpoint_hospital } from "../../utils.js";

//요일 정보 지정을 위한 상수
//일~월 : 0~6
const WEEK = ["일", "월", "화", "수", "목", "금", "토"];
//오늘 날짜(요일) 저장
let now = new Date();
const today = now.getDay();

export const MapHospital = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  //병원 데이터
  const [hospitalData, setHospitalData] = useState([]);
  const [hosLat, setHosLat] = useState(0);
  const [hosLon, setHosLon] = useState(0);
  //지도 위치를 현재 위치로 이동시킴
  const [mapState, setMapState] = useState({
    // 지도의 초기 위치
    center: { lat: hosLat, lng: hosLon },
    // 지도 위치 변경시 panto를 이용할지에 대해서 정의
    isPanto: false,
  });

  const moveMaptoCurrent = () => {
    const myLat = myLocation.center.lat;
    const myLon = myLocation.center.lon;
    setMapState({
      center: { lat: myLat, lng: myLon },
      isPanto: true,
    });
  };

  useEffect(() => {
    const mapElement = document.getElementById("map");
    mapElement.style.display = "block"; // display를 block으로 변경하여 보이도록 설정
  }, []);

  const [myLocation, setMyLocation] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });

  //유저의 현재위치 받아오기
  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMyLocation((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }));
        },
        (err) => {
          setMyLocation((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setMyLocation((prev) => ({
        ...prev,
        errMsg: "geolocation을 사용할수 없어요..",
        isLoading: false,
      }));
    }
  }, []);

  //url에서 병원id 추출
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const hospital_id = searchParams.get("id");

  // 해당 병원 데이터 받아오기
  const { data: hospitalQuery, isLoading: hospitalIsLoading } = useQuery(
    ["hospital"],
    async () => {
      try {
        const response = await axios
          .get(`${BE_URL}${endpoint_hospital}${hospital_id}`)
          .then((response) => {
            setHospitalData(response.data.data);
            setHosLat(hospitalData.wgs84Lat);
            setHosLon(hospitalData.wgs84Lon);
          });
      } catch (error) {
        console.log(error);
      }
    }
  );
  //로딩중일 경우 null값 반환
  if (hospitalIsLoading) {
    return null;
  }

  //요일 정보 변환
  const todayText = WEEK[today];
  //today가 0일 경우(일요일) 7번째 dutyTime값을 가져오도록 함
  const dutyTimeStart =
    today === 0 ? hospitalData.dutyTime7s : hospitalData[`dutyTime${today}s`]; // 오늘 요일에 해당하는 dutyTime 시작 시간
  const dutyTimeClose =
    today === 0 ? hospitalData.dutyTime7c : hospitalData[`dutyTime${today}c`]; // 오늘 요일에 해당하는 dutyTime 종료 시간

  return (
    <Style.Wrapper>
      <Header label={hospitalData.dutyName} />
      <Style.MapContainer>
        <Map
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
          center={{ lat: mapState.center.lat, lng: mapState.center.lon }}
          level={3}
        >
          <MapMarker
            position={{ lat: hosLat, lng: hosLon }}
            image={{
              src: IconMapG,
              size: {
                width: 64,
                height: 69,
              }, // 마커이미지의 크기입니다
              options: {
                offset: {
                  x: 27,
                  y: 69,
                }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
              },
            }}
          />
          {!myLocation.isLoading && (
            <MapMarker
              position={myLocation.center}
              image={{
                src: IconMyLocationG,
                size: {
                  width: 64,
                  height: 69,
                }, // 마커이미지의 크기입니다
                options: {
                  offset: {
                    x: 27,
                    y: 69,
                  }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
                },
              }}
            />
          )}
        </Map>
        <Style.CardBoxWrap isOpen={isOpen}>
          <CardBox linkTo={"#"}>
            <div>
              <Style.CardBoxHeader>
                <Style.BtnHidden onClick={handleToggle}>
                  <img alt={"icon-down"} src={isOpen ? IconDown : IconUp}></img>
                </Style.BtnHidden>
                <div>{hospitalData.dutyName}</div>
              </Style.CardBoxHeader>
              <Style.CardBoxContent>
                <div>
                  <img alt={"icon-location"} src={IconMapGray} />
                  <span>{hospitalData.dutyAddr}</span>
                </div>
                <div>
                  <img alt={"icon-clock"} src={IconClockMap} />
                  <span>
                    {dutyTimeStart
                      ? // dutyTime이 null 값일 경우 휴무로 표시
                        `${todayText}요일 ${formatTime(
                          dutyTimeStart
                        )} ~ ${formatTime(dutyTimeClose)}`
                      : `${todayText}요일 휴무`}
                  </span>
                </div>
                <div>
                  <img alt={"icon-telephone"} src={IconTel} />
                  <span>{hospitalData.dutyTel1}</span>
                </div>
              </Style.CardBoxContent>
            </div>
          </CardBox>
        </Style.CardBoxWrap>
        <Style.MoveMyLocation onClick={moveMaptoCurrent}>
          <img alt={"icon-here"} src={IconMyLocationW}></img>
          <span>현위치</span>
        </Style.MoveMyLocation>
      </Style.MapContainer>
      <NavigationBar />
    </Style.Wrapper>
  );
};
