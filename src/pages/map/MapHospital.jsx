import React, { useEffect } from "react";
// import { Map } from "react-kakao-maps";
import Header from "../../components/Header";
import styled from "styled-components";
import CardBox from "../../components/CardBox";
import IconDown from "../../assets/iconDown.svg";
import IconClock from "../../assets/iconClockMap.svg";
import IconLocationGray from "../../assets/iconLocationMap.svg";
import IconTelephone from "../../assets/iconTelMap.svg";
// import { NavigationBar } from "../../components/NavigationBar";
import { NavigationBar } from "../../components/navigationBar";
import API_KEYS from "./apikeys.js";

export const MapHospital = () => {
  const dutyName = "엄민숙소아청소년과의원";
  const hospitalAddress = "서울시광진구";
  const todayText = "몇";
  const dutyTimeStart = "09:00";
  const dutyTimeClose = "18:30";
  const dutyTel = "02-000-0000";

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
      });
    };
  }, []);

  return (
    <Wrapper>
      <Header headerTitle={dutyName} />
      <div
        id="map"
        style={{
          width: "100%",
          height: "100vh",
          position: "relative",
          zIndex: -99,
        }}
      />
      <CardBoxWrap>
        <CardBox>
          <div>
            <CardBoxHeader>
              <BtnHidden>
                <img alt={"icon-down"} src={IconDown}></img>
              </BtnHidden>
              <div>{dutyName}</div>
            </CardBoxHeader>
            <CardBoxContent>
              <div>
                <img alt={"icon-clock"} src={IconClock} />
                <span>
                  {todayText + "요일 " + dutyTimeStart + " ~ " + dutyTimeClose}
                </span>
              </div>
              <div>
                <img alt={"icon-location"} src={IconLocationGray} />
                <span>{hospitalAddress}</span>
              </div>
              <div>
                <img alt={"icon-telephone"} src={IconTelephone} />
                <span>{dutyTel}</span>
              </div>
            </CardBoxContent>
          </div>
        </CardBox>
      </CardBoxWrap>
      <NavigationBar />
    </Wrapper>
  );
};

// export default MapHospital;

const Wrapper = styled.div``;

const CardBoxWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 35%;
  box-sizing: border-box;
  z-index: 1;
  transform: translate(-50%, -50%);
`;

const CardBoxHeader = styled.div`
  display: flex;
  font-size: 30px;
  font-weight: 700;
  margin: 1% 0 3% 0;

  & > div {
    margin-left: 2%;
  }
`;

const CardBoxContent = styled.div`
  font-size: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  & > div {
    display: flex;
    justify-content: center;
    margin: 1%;
  }
`;
const BtnHidden = styled.button`
  background: none;
  border: none;
`;
