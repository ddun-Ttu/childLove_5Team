import React, { useState, useEffect } from "react";
import axios from "axios";
// 공통 컴포넌트
import { CardBox } from "../../components/index";
// 아이콘
import IconLeft from "../../assets/iconLeftGreen.svg";
import IconRight from "../../assets/iconRightGreen.svg";
import MiniChk from "../../assets/miniLogo4.svg";

import dayjs from "dayjs";
import Calendar from "react-calendar";
import { ReDetail } from "./reDetail";
// css
import styled from "styled-components";

export const MyCalendar = () => {
  const curDate = new Date(); // 현재 날짜
  const [value, onChange] = useState(curDate); // 클릭한 날짜 - 초기값 현재 날짜
  const activeDate = dayjs(value).format("YY.MM.DD"); // 클릭한 날짜 (년-월-일)
  const activeMonth = dayjs(value).get("month") + 1 + "월";

  const [datesOnly, setDatesOnly] = useState([]); //날짜만 추출
  const [extractedData, setExtractedData] = useState([]); //예약 정보만 추출

  useEffect(() => {
    axios
      .get("./reservation/user", {
        headers: {
          Accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjFAMS4xIiwic3ViIjoxLCJpYXQiOjE2ODYxMDg4MzksImV4cCI6MTcxNzY2NjQzOX0.KoXifXgRmenLuMXmJ_RP1ZJnjinLlyhjD-HN1GAXc5A",
        },
      })
      .then((res) => {
        console.log(res.data);

        // 추출된 정보들을 저장할 배열
        const resData = res.data.data;
        // 추출 정보에서 날짜, 시간, 병원이름, 메모만 저장할 배열
        const extractedData = resData.map((item) => {
          const createdAt = dayjs(item.createdAt);
          return {
            date: createdAt.format("YYYY-MM-DD"),
            time: createdAt.format("HH:mm:ss"),
            dutyName: item.hospital.dutyName,
            memo: item.memo,
          };
        });

        console.log(extractedData);

        // 날짜만 추출
        const datesOnly = extractedData.map((item) => item.date);
        setDatesOnly(datesOnly); // 날짜만 추출된 배열 설정
        setExtractedData(extractedData); // 추출된 예약 정보 배열 설정
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // 예약 있는 날에 표시 추가
  const addContent = ({ date }) => {
    if (datesOnly.includes(dayjs(date).format("YYYY-MM-DD"))) {
      return (
        <>
          <img
            alt="reservation-chk"
            src={MiniChk}
            className="reservation-icon"
          />{" "}
          {/* 이미지 표시 */}
        </>
      );
    }
    return null; // 예약 없는 경우는 아무 내용도 반환하지 않음
  };

  // 예약된 날짜에 해당하는 타일에 클래스 이름 추가
  const tileClassName = ({ date }) => {
    if (datesOnly.includes(dayjs(date).format("YYYY-MM-DD"))) {
      return "reserved-date"; // 예약된 날짜에 해당하는 클래스 이름
    }
    return null; // 예약 없는 경우는 클래스 이름 없음
  };

  // 예약된 날짜에 해당하는 ReDetail 컴포넌트 자동 생성
  const renderReDetails = () => {
    if (!extractedData || extractedData.length === 0) {
      return null;
    }

    return extractedData.map((item, index) => (
      <ReDetail
        key={index}
        hospitalName={item.dutyName}
        date={item.date}
        time={item.time}
        memo={item.memo}
      />
    ));
  };

  return (
    <>
      <CardBox linkTo={"#"} bxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)">
        <ShowDate>
          <h1>{activeDate}</h1>
        </ShowDate>
      </CardBox>
      <CardBox linkTo={"#"} bxShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}>
        <ShowCalendar>
          <ReCalendar
            locale="ko"
            onChange={onChange}
            value={value}
            nextLabel={<img alt="icon-right" src={IconRight}></img>}
            prevLabel={<img alt="icon-left" src={IconLeft}></img>}
            next2Label={null}
            prev2Label={null}
            showNeighboringMonth={false} // 앞뒤달에 이어지는 날짜
            tileContent={addContent}
            tileClassName={tileClassName}
          />
        </ShowCalendar>
      </CardBox>
      <CardBox linkTo={"#"} bxShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}>
        <DiaryHeader>
          <h2>{activeMonth}</h2>
        </DiaryHeader>
        <DiaryMain>
          <ReTime>
            <ReDate>
              <h3>10일</h3>
              <h3>토</h3>
            </ReDate>
            <ReHour>
              <h3>PM 3</h3>
            </ReHour>
          </ReTime>
          {/* 예약된 날짜에 해당하는 ReDetail 컴포넌트 자동 생성 */}
          {renderReDetails()}
          <DueDate>
            <h2>D-day</h2>
          </DueDate>
        </DiaryMain>
      </CardBox>
    </>
  );
};

// 날짜 표시
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

// 달력 부분
const ShowCalendar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const ReCalendar = styled(Calendar)`
  .react-calendar {
    width: 100%;
    max-width: 832px;
    background-color: #fff;
    border: 1px solid #a0a096;
    font-family: Arial, Helvetica
  }

  /* 상단 네비게이션 바 */
  .react-calendar__navigation {
    display: flex;
    width: 100%;
    height: 80px;
    margin-bottom: 10px;

    .react-calendar__navigation__label {
      font-weight: bold;
      font-size: 20px;
      background: none;
      border:none;
    }

    .react-calendar__navigation__arrow {
      flex-grow: 0.333;
      background: none;
      border:none;
    }

    .react-calendar__navigation__label > span {
      font-size: 20px;
      font-weight: bold;
      color: #121212;
    }
  }

  /* 요일 표시 */
  .react-calendar__month-view__weekdays {
    background: none;
    abbr { /*월,화,수... 글자 부분*/
      color: #121212};
      font-size: 18px;
      margin-bottom: 10px;
    }
  }

  /* day 타일 모양 */
  .react-calendar__tile {
    position: relative; /* 상대적 위치 설정 */
    background: none;
    text-align: center;
    border: 5px solid white;
    line-height: 80px;
    font-size: 18px;
    color: #121212;
    border-radius: 100%;

    width: 100%;
    height: 100%;
    padding-top: 15px;
    padding-bottom: 5px;

    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .react-calendar__tile img {
    position: absolute; /* 절대적 위치 설정 */
    bottom: 5px; /* 이미지를 아래쪽으로 20px 내리기 */
    left: 50%; /* 이미지를 가운데로 정렬하기 위해 왼쪽 위치 설정 */
    transform: translateX(-50%); /* 이미지의 가로 중앙 정렬 */
    width: 20px;
    height: 20px;
    border: 2px solid #fff;
    border-radius: 50%;
    background: white;
  }
  }
  /*hover, focus, 선택됐을 시 */
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus,
  .react-calendar__tile--active {
    background: #00ad5c;
    border-radius: 100%;
    color: white;
    font-weight: bold;
    border: 5px solid #00ad5c;
  }

  /* 오늘 표시 */
  .react-calendar__tile--now {
    border: 5px solid #00ad5c;
    color: #121212;
    font-weight: bold;
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background-color: #00ad5c;
    color: white;
  }

  /* 주말일때 일 표시 */
  .react-calendar__month-view__days__day--weekend {
    color: #a9a9a9;
  }
`;

const DiaryHeader = styled.div`
  display: flex;
  justify-content: left;
  margin: 10px;
  border-bottom: 1px solid #b2b2b2;

  & > h2 {
    width: 100%;
    font-size: 20px;
    font-weight: bold;
    color: #121212;
    margin-bottom: 10px;
  }
`;

const DiaryMain = styled.div`
  display: flex;
  justify-content: left;
  margin: 10px;
`;

const ReTime = styled.div`
  width: 30%;
  align-items: center;
  justify-content: center;s
`;

const ReDate = styled.div`
  width: 50%;
  float: left;
  display: flex;

  & > h3 {
    font-size: 18px;
    font-weight: bold;
    color: #121212;
  }
`;

const ReHour = styled.div`
  width: 50%;
  float: left;
  display: flex;

  & > h3 {
    font-size: 18px;
    font-weight: bold;
    color: #121212;
  }
`;

const DueDate = styled.div`
  width: 15%;
  display: flex;
  align-items: center;
  justify-content: center;

  & > h2 {
    width: 100%;
    font-size: 20px;
    font-weight: bold;
    color: #121212;
    margin-bottom: 10px;
  }
`;
