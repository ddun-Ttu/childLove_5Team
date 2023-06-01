import React from "react";
import styled from "styled-components";
import { Post } from "./Post";

export const RegisterForm = () => {
  return (
    <>
      <FormBox>
        <InputBox>
          <InputName>병원명</InputName>
          <InputContent />
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
        <InputBox>
          <PostBox>
            <InputName>주소</InputName>
            <Post />
          </PostBox>

          <InputContent />
        </InputBox>
      </FormBox>
    </>
  );
};

const FormBox = styled.div`
  box-sizing: border-box;
  width: 625px;
  height: 998px;
  border: 1px solid #a8a8a8;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const InputBox = styled.div`
  box-sizing: border-box;
  width: 455px;
  height: 90px;
`;

const InputName = styled.span`
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  display: flex;
  justify-content: flex-start;
  color: #121212;
`;

const InputContent = styled.input`
  width: 100%;
  box-sizing: border-box;
  height: 68px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

const PostBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
