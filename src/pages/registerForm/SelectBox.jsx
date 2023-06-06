import React, { useState } from "react";
import Select from "react-select";
import styled from "styled-components";

const weekTable = [
  { value: "월요일", label: "월요일" },
  { value: "화요일", label: "화요일" },
  { value: "수요일", label: "수요일" },
  { value: "목요일", label: "목요일" },
  { value: "금요일", label: "금요일" },
  { value: "토요일", label: "토요일" },
  { value: "일요일", label: "일요일" },
  { value: "휴일", label: "휴일" },
  { value: "점심시간", label: "점심시간" },
];

const openTimeTable = [
  { value: "0800", label: "0800" },
  { value: "0900", label: "0900" },
  { value: "1000", label: "1000" },
  { value: "1100", label: "1200" },
  { value: "1200", label: "1300" },
  { value: "1300", label: "1400" },
];

const closeTimeTable = [
  { value: "1200", label: "1200" },
  { value: "1300", label: "1300" },
  { value: "1400", label: "1400" },
  { value: "1500", label: "1500" },
  { value: "1600", label: "1600" },
  { value: "1700", label: "1700" },
  { value: "1800", label: "1800" },
  { value: "1900", label: "1900" },
  { value: "2000", label: "2000" },
];

export const SelectBox = () => {
  const [weekOption, setWeekOption] = useState([]); // 요일 담는 배열
  const [openTimeOption, setOpenTimeOption] = useState([]); // 오픈시간 담는 배열
  const [closeTimeOption, setCloseTimeOption] = useState([]); // 마감시간 담는 배열

  const handleWeekOptionChange = (selectedOption, index) => {
    const updatedWeekOptions = [...weekOption]; // weekOption 배열을 담는 변수
    updatedWeekOptions[index] = selectedOption; // updateWeekOption 배열에 새로 선택된 요일을 index번 째 배열에 담는다
    setWeekOption(updatedWeekOptions); //  updateWeekOption의 값으로 weekOption 배열 최신화
  };
  //위와 동일
  const handleOpenTimeOptionChange = (selectedOption, index) => {
    const updatedOpenTimeOptions = [...openTimeOption];
    updatedOpenTimeOptions[index] = selectedOption;
    setOpenTimeOption(updatedOpenTimeOptions);
  };
  // 위와 동일
  const handleCloseTimeOptionChange = (selectedOption, index) => {
    const updatedCloseTimeOptions = [...closeTimeOption];
    updatedCloseTimeOptions[index] = selectedOption;
    setCloseTimeOption(updatedCloseTimeOptions);
  };

  const renderTimeTable = () => {
    const timetables = [];

    for (let i = 0; i < weekTable.length; i++) {
      // 요일의 갯수 만큼 셀렉트 옵션 추가 ex) 월,화,수,목,금,토,일,주말,점심시간 셀렉트 옵션 생성
      timetables.push(
        <TimeTable key={i}>
          <StyledSelect // 요일 셀렉트
            placeholder="요일"
            value={weekOption[i]}
            onChange={(selectedOption) =>
              handleWeekOptionChange(selectedOption, i)
            }
            options={weekTable}
          />
          <StyledSelect
            placeholder="오픈시간" // 오픈시간 셀렉트
            value={openTimeOption[i]}
            onChange={(selectedOption) =>
              handleOpenTimeOptionChange(selectedOption, i)
            }
            options={openTimeTable}
          />
          <Span>부터</Span>
          <StyledSelect
            placeholder="마감시간" // 마감시간 셀렉트
            value={closeTimeOption[i]}
            onChange={(selectedOption) =>
              handleCloseTimeOptionChange(selectedOption, i)
            }
            options={closeTimeTable}
          />
          <Span>까지</Span>
        </TimeTable>
      );
    }
    console.log(weekOption[0]);
    console.log(openTimeOption[0]);
    console.log(closeTimeOption[0]);
    return timetables;
  };

  return (
    <>
      <SelectContainer>{renderTimeTable()}</SelectContainer>
    </>
  );
};

const TimeTable = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: 2%;
`;

const StyledSelect = styled(Select)`
  width: 25%;
`;

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  width: 100%;
`;
const Span = styled.span``;
