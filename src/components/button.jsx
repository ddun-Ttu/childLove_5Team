import React from "react";
import styled from "styled-components";

export const Button = () => {
  return (
    <>
      <ButtonStyle>수정하기</ButtonStyle>
    </>
  );
};

const ButtonStyle = styled.button`
  font-size: 20px;

  font-weight: 700;
  color: white;
  border: 1px solid #00954f;
  border-radius: 5px;
  background-color: #00ad5c;
  cursor: pointer;

  padding: 1% 3.5%;
`;
