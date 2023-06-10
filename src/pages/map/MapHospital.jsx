import * as Style from "./styles/MapStyle";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Map } from "react-kakao-maps-sdk";
import axios from "axios";

//아이콘
import {
  IconDown,
  IconUp,
  IconClockMap,
  IconMapGray,
  IconTel,
  IconMyLocationW,
} from "../../assets/index";

// 공통 컴포넌트
import { Header, NavigationBar, CardBox } from "../../components/index";

//요일 정보 지정을 위한 상수
const WEEK = ["월", "화", "수", "목", "금", "토", "일", "공휴일"];
//오늘 날짜(요일) 저장
let now = new Date();
const today = now.getDay();

//URL
const BE_URL = `http://34.64.69.226:3000/`;
const endpoint_hospital = `hospital/`;
export const MapHospital = () => {
  const hospital_id = "A1100401";

  useEffect(() => {
    const mapElement = document.getElementById("map");
    mapElement.style.display = "block"; // display를 block으로 변경하여 보이도록 설정
  }, []);

  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // 해당 병원 데이터 받아오기
  const { data: hospitalQuery, hospitalIsLoading } = useQuery(
    ["hospital"],
    async () => {
      try {
        const response = await axios.get(
          `${BE_URL}${endpoint_hospital}${hospital_id}`
        );
        return response.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  );

  //로딩중일 경우 null값 반환
  if (hospitalIsLoading) {
    return null;
  }

  //병원 데이터
  const hospitalData = hospitalQuery?.data ?? [];
  console.log(hospitalData);

  //요일 정보 변환
  const todayText = WEEK[today - 1];
  const dutyTimeStart = hospitalData[`dutyTime${today}s`]; // 오늘 요일에 해당하는 dutyTime 시작 시간
  const dutyTimeClose = hospitalData[`dutyTime${today}c`]; // 오늘 요일에 해당하는 dutyTime 종료 시간

  // 시간 형식을 변환하는 함수
  const formatTime = (time) => {
    if (!time) {
      return null;
    }
    const hours = time?.slice(0, 2);
    const minutes = time?.slice(2);
    return `${hours}:${minutes}`;
  };
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
          center={{ lat: 37.5665, lng: 126.978 }}
          level={3}
        />
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
                  <img alt={"icon-clock"} src={IconClockMap} />
                  <span>
                    {`${todayText}요일 ${formatTime(
                      dutyTimeStart
                    )} ~ ${formatTime(dutyTimeClose)}`}
                  </span>
                </div>
                <div>
                  <img alt={"icon-location"} src={IconMapGray} />
                  <span>{hospitalData.dutyAddr}</span>
                </div>
                <div>
                  <img alt={"icon-telephone"} src={IconTel} />
                  <span>{hospitalData.dutyTel1}</span>
                </div>
              </Style.CardBoxContent>
            </div>
          </CardBox>
        </Style.CardBoxWrap>
        <Style.ButtonStyle>
          <img alt={"icon-here"} src={IconMyLocationW}></img>
          <span>현위치</span>
        </Style.ButtonStyle>
      </Style.MapContainer>
      <NavigationBar />
    </Style.Wrapper>
  );
};
