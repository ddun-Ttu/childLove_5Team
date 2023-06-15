import React, { useEffect, useState } from "react";
import { instance } from "../server/Fetcher";
import { useQuery } from "react-query";
import styled from "styled-components";
import { calculateDday, formatDay, formatTime } from "../utils";
import { Link } from "react-router-dom";

export const Alarm = ({ onListChange }) => {
  // 현재 날짜
  const activeDate = new Date();

  const [list, setList] = useState([]);

  useEffect(() => {
    instance.get("/reservation/alarm").then((res) => {
      setList(res.data.data);
      onListChange(res.data.data.length);
    });
  }, [onListChange]);

  const alarmGetRead = (id) => {
    instance.patch(`/reservation/read/${id}`, {
      read: true,
    });
  };

  return (
    <Box>
      {list.map((item) => {
        return (
          <ReservationBox
            key={item.id}
            onClick={() => alarmGetRead(item.id)}
            to={"/reserve"}
            style={
              item.read
                ? { backgroundColor: "#d9d9d9" }
                : { backgroundColor: "rgba(0,173,92,0.5)" }
            }
          >
            <h2>{calculateDday(activeDate, item.reservedDate)}</h2>

            <ReservationList className="hosName">
              {item.hospital.dutyName}
            </ReservationList>
            <ReservationList className="resDate">
              {formatDay(item.reservedDate)}
            </ReservationList>
            <ReservationList className="resTime">
              {formatTime(item.reservedTime)}
            </ReservationList>
          </ReservationBox>
        );
      })}
    </Box>
  );
};

const ReservationBox = styled(Link)`
  display: flex;
  justify-content: space-around;
  text-align: left;

  width: 80%;

  margin: 3% auto;
  padding: 4%;

  border: 1px solid #d9d9d9;
  border-radius: 20px;

  & > h2 {
    font-size: 20px;
    font-weight: bold;
    width: 20%;
  }
`;

const ReservationList = styled.span`
  font-size: 18px;
  text-align: left;

  &.hosName {
    width: 40%;

    font-size: 20px;
    font-weight: bold;
  }

  &.resDate {
    width: 10%;
    margin-right: 5%;
  }

  &.resTime {
    width: 10%;
  }
`;

const Box = styled.div`
  height: 500px;
  overflow-y: scroll;
`;
