import React from "react";
import styled from "styled-components";
import { Post } from "./Post";
import mainLogo from "../../assets/mainLogo.svg";
import { Container } from "../../components";

export const RegisterForm = () => {
  return (
    <>
      <Container>
        <MainLogoDiv>
          <MainLogoImg src={mainLogo}></MainLogoImg>
          <H1>병원 신규 등록</H1>
        </MainLogoDiv>
        <FormBox>
          <InputBox>
            <InputName>병원명</InputName>
            <InputContent type="text" />
          </InputBox>
          <InputBox>
            <InputName>병원 대표번호</InputName>
            <InputContent />
          </InputBox>
          <InputBox>
            <InputName>영업시간</InputName>
            <InputContent />
          </InputBox>
          <InputBox>
            <InputName>점심시간</InputName>
            <InputContent />
          </InputBox>
          <Post />
          <InputBox>
            <InputName>병원 사진</InputName>
            <ImageBox>
              <InputImage type="file" />
            </ImageBox>
          </InputBox>
        </FormBox>
      </Container>
    </>
  );
};

const FormBox = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: 1px solid #a8a8a8;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const InputBox = styled.div`
  margin: 2% 0;
  box-sizing: border-box;
  width: 50%;
  height: 30%;
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
  height: 50px;
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

const MainLogoImg = styled.img`
  margin-top: 4%;
`;

const MainLogoDiv = styled.div`
  margin-top: 4%;
`;

const H1 = styled.p`
  font-size: 38px;
  margin: 0;
  padding: 2%;
  color: #00ad5c;
  font-weight: 700;
`;
