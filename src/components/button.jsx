/* eslint-disable */
import React from "react";
import styled from "styled-components";
import colors from "../constants/colors";
import fontSize from "../constants/fontSize";

export const Button = ({
  btnColor,
  btnFontSize,
  bgcolor,
  borderOutLine,
  width,
  height,
  label,
  onClick,
}) => {
  return (
    <>
      <ButtonStyle
        onClick={onClick}
        fontSize={btnFontSize}
        color={btnColor}
        bgcolor={bgcolor}
        borderOutLine={borderOutLine}
        width={width}
        height={height}
      >
        {label}
      </ButtonStyle>
    </>
  );
};

const ButtonStyle = styled.button`
  font-size: ${(props) => props.fontSize};
  font-weight: 700;
  color: ${(props) => props.color};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: 1px solid ${(props) => props.borderOutLine};
  border-radius: 5px;
  background-color: ${(props) => props.bgcolor};
  cursor: pointer;

  padding: 1% 3.5%;
`;
