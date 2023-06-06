import React from "react";
import * as Style from "./styles/HospitalCardStyle";

//아이콘
import {
  IconClockHospital,
  IconLocationHospital,
  IconStarEmpty,
  IconStarFilled,
} from "../../assets/index";

// 공통 컴포넌트
import { CardBox } from "../../components/index";

const WEEK = ["월", "화", "수", "목", "금", "토", "일", "공휴일"];

export const HospitalCard = ({
  hpid,
  hospitalName = "엄민숙소아청소년과의원",
  hospitalAddress = "서울시 광진구",
  today = 1,
  dutyTimeStart = "0900",
  dutyTimeClose = "1830",
  favorite,
}) => {
  //요일 정보 변환
  const todayText = WEEK[today - 1];

  // 시간 형식을 변환하는 함수
  const formatTime = (time) => {
    const hours = time.slice(0, 2);
    const minutes = time.slice(2);
    return `${hours}:${minutes}`;
  };

  // InfoCard에 넣어줄 요소
  const INFO_PROPS = [
    {
      alt: "icon-clock",
      icon: IconClockHospital,
      content: `${todayText}요일 ${formatTime(dutyTimeStart)} ~ ${formatTime(
        dutyTimeClose
      )}`,
    },
    {
      alt: "icon-location",
      icon: IconLocationHospital,
      content: hospitalAddress,
    },
  ];

  return (
    <>
      <CardBox>
        <Style.HospitalName>{hospitalName}</Style.HospitalName>
        {INFO_PROPS.map((prop) => (
          <React.Fragment key={prop.alt}>
            <img alt={prop.alt} src={prop.icon} />
            <span>{prop.content}</span>
          </React.Fragment>
        ))}
        <Style.Favorite>
          <img
            alt={"icon-favorite"}
            src={favorite ? IconStarFilled : IconStarEmpty}
          ></img>
        </Style.Favorite>
      </CardBox>
    </>
  );
};
