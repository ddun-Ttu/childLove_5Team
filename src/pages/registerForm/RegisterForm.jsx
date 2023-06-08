import React, { useState } from "react";
import styled from "styled-components";
import { Post } from "./Post";
import { Button } from "../../components";
import colors from "../../constants/colors";
import mainLogo from "../../assets/mainLogo.svg";
import { SelectBox } from "./SelectBox";
import axios from "axios";

export const RegisterForm = () => {
  const [dutyName, setDutyName] = useState(""); // 병원명 인풋 관리
  const [phone, setPhone] = useState(""); // 전화번호 관리
  const [addr1, setAddr1] = useState(""); // 시,도 주소
  const [addr2, setAddr2] = useState(""); // 상세주소
  const [openTime, setOpenTime] = useState([]); // 오픈시간
  const [closeTime, setCloseTime] = useState([]); //마감시간

  // 함수형 태로 자식 props를 보내서 Post의  주소 데이터를 받아온다
  const getAddrData = (addr1, addr2) => {
    setAddr1(addr1);
    setAddr2(addr2);
  };

  // 마찬가지로 SelectBox 에서 오픈시간 데이터를 받아온다.
  const getOpenTimeData = (openTime) => {
    setOpenTime(openTime);
  };

  // 마찬가지로 SelectBox 에서 마감시간 데이터를 받아온다.
  const getCloseTimeData = (closeTime) => {
    setCloseTime(closeTime);
  };

  // 병원명 인풋
  const handleNameInput = (e) => {
    const value = e.target.value;
    setDutyName(value);
  };

  //병원번호 인풋
  const handlePhone = (e) => {
    const value = e.target.value;
    setPhone(value);
  };

  // - 사용 및 유효성 검사
  const phoneRegex = /^01[0-9]{1}-[0-9]{4}-[0-9]{4}$/;
  const phoneValid = phoneRegex.test(phone) ? true : false;

  // 신규 등록 버튼 클릭 시 서버로 데이터 전송
  const onClick = () => {
    const openDutyTimes = Array(8).fill(""); // 병원 영업 시간을 저장할 배열 생성 및 초기화
    const closeDutyTimes = Array(8).fill(""); // 병원 마감 시간 저장 배열
    // SelectBox 에서 받아온 openTime 배열을 돌면서 dutyTimes에 저장
    openTime.forEach((option, index) => {
      openDutyTimes[index] = option.value;
    });

    closeTime.forEach((option, index) => {
      closeDutyTimes[index] = option.value;
    });
    const [
      dutyTime1s,
      dutyTime2s,
      dutyTime3s,
      dutyTime4s,
      dutyTime5s,
      dutyTime6s,
      dutyTime7s,
      dutyTime8s,
    ] = openDutyTimes;

    const [
      dutyTime1c,
      dutyTime2c,
      dutyTime3c,
      dutyTime4c,
      dutyTime5c,
      dutyTime6c,
      dutyTime7c,
      dutyTime8c,
    ] = closeDutyTimes;

    const dutyTime9s = openTime[8].value;
    const dutyTime9c = closeTime[8].value;
  };
  return (
    <>
      <MainLogoDiv>
        <MainLogoImg src={mainLogo}></MainLogoImg>
        <H1>병원 신규 등록</H1>
      </MainLogoDiv>
      <FormBox>
        <InputBox>
          <InputName>병원명</InputName>
          <InputContent type="text" onChange={handleNameInput} />
        </InputBox>
        <InputBox>
          <InputName>병원 대표번호</InputName>
          <InputContent type="text" value={phone} onChange={handlePhone} />
          {!phoneValid && phone.length > 0 && (
            <ErrorMessage>-을 붙여서 입력해주세요</ErrorMessage>
          )}
        </InputBox>
        <InputBox>
          <InputName>영업시간 및 점심시간</InputName>
          <SelectBox
            getOpenTimeData={getOpenTimeData}
            getCloseTimeData={getCloseTimeData}
          />
        </InputBox>

        <Post addr1={addr1} getAddrData={getAddrData} />
        <InputBox>
          <InputName>병원 사진</InputName>
          <ImageBox>
            <InputImage type="file" />
          </ImageBox>
        </InputBox>
        <InputBox>
          <Button
            label={"신규 등록하기"}
            width={"100%"}
            height={"35%"}
            btnColor={"#ffffff"}
            bgcolor={colors.primary}
            btnFontSize={"18px"}
            onClick={onClick}
          />
        </InputBox>
      </FormBox>
    </>
  );
};

const MainLogoDiv = styled.div`
  margin-top: 4%;
`;

const MainLogoImg = styled.img`
  padding: 3% 3% 0 3%;
`;

const H1 = styled.p`
  font-size: 38px;
  margin: 0;
  padding: 2%;
  color: #00ad5c;
  font-weight: 700;
`;

const FormBox = styled.div`
  box-sizing: border-box;
  width: 100%;
  border: 1px solid #a8a8a8;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2%;
`;

export const InputBox = styled.div`
  box-sizing: border-box;
  width: 60%;
  margin: 2% 0;
  display: flex;
  flex-direction: column;
`;

export const InputName = styled.span`
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  display: flex;
  justify-content: flex-start;
  color: #121212;
`;

export const InputContent = styled.input`
  width: 100%;
  box-sizing: border-box;
  height: 35%;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border: 1px solid #a8a8a8;
  border-radius: 5px;

  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 15px;
`;

const ImageBox = styled.div`
  width: 100%;
  box-sizing: border-box;
  height: 50px;
  border: 1px solid #a8a8a8;
  border-radius: 5px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 10px;
`;

const InputImage = styled.input`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 15px;
`;

const ErrorMessage = styled.p`
  margin-top: 2%;
  color: #c20000;
`;
