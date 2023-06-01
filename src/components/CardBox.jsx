import React from "react";
import styled from "styled-components";

const CardBox = ({ children }) => {
  return <CardBoxStyle>{children}</CardBoxStyle>;
};

export default CardBox;

const CardBoxStyle = styled.button`
  position: relative;
  width: 100%;
  background: none;
  border: solid 1px #b2b2b2;
  border-radius: 20px;
  box-sizing: border-box;
  padding: 2%;
  margin: 1% 0;
`;
