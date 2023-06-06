import React, { useEffect, useState } from "react";
import { Map } from "react-kakao-maps";
import styled from "styled-components";

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

const MapHospital = () => {
  const dutyName = "엄민숙소아청소년과의원";
  const hospitalAddress = "서울시광진구";
  const todayText = "몇";
  const dutyTimeStart = "09:00";
  const dutyTimeClose = "18:30";
  const dutyTel = "02-000-0000";

  useEffect(() => {}, []);

  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Wrapper>
      <Header headerTitle={dutyName} />
      <MapContainer>
        <div
          id="map"
          style={{
            width: "100%",
            height: "100vh",
            position: "relative",
            zIndex: "2",
          }}
        />
        <CardBoxWrap isOpen={isOpen}>
          <CardBox linkTo={"#"}>
            <div>
              <CardBoxHeader>
                <BtnHidden onClick={handleToggle}>
                  <img alt={"icon-down"} src={isOpen ? IconDown : IconUp}></img>
                </BtnHidden>
                <div>{dutyName}</div>
              </CardBoxHeader>
              <CardBoxContent>
                <div>
                  <img alt={"icon-clock"} src={IconClockMap} />
                  <span>
                    {todayText +
                      "요일 " +
                      dutyTimeStart +
                      " ~ " +
                      dutyTimeClose}
                  </span>
                </div>
                <div>
                  <img alt={"icon-location"} src={IconMapGray} />
                  <span>{hospitalAddress}</span>
                </div>
                <div>
                  <img alt={"icon-telephone"} src={IconTel} />
                  <span>{dutyTel}</span>
                </div>
              </CardBoxContent>
            </div>
          </CardBox>
        </CardBoxWrap>
        <ButtonStyle>
          <img alt={"icon-here"} src={IconMyLocationW}></img>
          <span>현위치</span>
        </ButtonStyle>
      </MapContainer>
      <NavigationBar />
    </Wrapper>
  );
};

export default MapHospital;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const MapContainer = styled.div`
  flex: 1;
  position: relative;
`;

const CardBoxWrap = styled.div`
  display: block;
  position: absolute;
  top: ${({ isOpen }) => (isOpen ? "80%" : "110%")};
  left: 50%;
  width: 70%;
  z-index: 3;
  transform: translate(-50%, -50%);
`;

const CardBoxHeader = styled.div`
  display: flex;
  font-size: 30px;
  font-weight: 700;
  margin: 3% 0 5% 0;

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
  margin-bottom: 5%;

  & > div {
    display: flex;
    justify-content: center;
    margin: 2%;
  }
`;

const BtnHidden = styled.button`
  background: none;
  border: none;
`;

const ButtonStyle = styled.button`
  display: block;
  position: absolute;
  width: 20%;
  z-index: 3;
  transform: translate(-50%, -50%);
  bottom: 0%;
  left: 60%;
  z-index: 3;
  font-size: 20px;

  font-weight: 700;
  color: white;
  border: 1px solid #00954f;
  border-radius: 5px;
  background-color: #00ad5c;
  cursor: pointer;
  transform: translate(70%, -70%);
  padding: 1% 3.5%;
`;
