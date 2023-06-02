import React, { useState } from "react";
import moment from "moment";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import CardBox from "../../components/CardBox";
import styled from "styled-components";

export const MyCalendar = () => {
  const [value, onChange] = useState(new Date());

  return (
    <>
      <CardBox linkTo={"#"}>
        <ShowDate>
          <h1>{moment(value).format("YY. MM. DD")}</h1>
        </ShowDate>
      </CardBox>
      <CardBox linkTo={"#"}>
        <ShowCalendar>
          <Calendar onChange={onChange} value={value} />
        </ShowCalendar>
      </CardBox>
    </>
  );
};

const ShowDate = styled.div`
  width: 100%;
  display: flex;
  text-align: center;
  justify-content: center;

  & h1 {
    font-size: 30px;
    color: #00ad5c;
    font-weight: bold;
    text-decoration-line: none;
  }
`;

const ShowCalendar = styled.div`
  width: 100%;
  display: flex;
  text-align: center;
  justify-content: center;
`;
