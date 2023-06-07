/* eslint-disable */
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const CardBox = ({ children, linkTo, display, justifyContent, alignItems }) => {
  return (
    <CardBoxStyle>
      <Link to={linkTo}>{children}</Link>
    </CardBoxStyle>
  );
};

export const CardBoxStyle = styled.div`
  position: relative;
  width: 100%;
  background-color: #ffffff;
  border: solid 1px #b2b2b2;
  border-radius: 20px;
  box-sizing: border-box;
  padding: 2%;
  margin: 1% 0;
  display: ${(props) => props.display};
  justify-content: ${(props)=> props.justifyContent};
  align-items: ${(props) => props.alignItems};
`;
