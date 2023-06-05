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
  { value: "공휴일", label: "공휴일" },
];

const openTimeTable = [
  { value: "0800", label: "0800" },
  { value: "0900", label: "0900" },
  { value: "1000", label: "1000" },
  { value: "1100", label: "1100" },
];

const closeTimeTable = [
  { value: "1700", label: "1700" },
  { value: "1800", label: "1800" },
  { value: "1900", label: "1900" },
  { value: "2000", label: "2000" },
];

const lunchTimeOpenTable = [
  { value: "1100", label: "1100" },
  { value: "1200", label: "1200" },
  { value: "1300", label: "1300" },
];

const lunchTimeCloseTable = [
  { value: "1200", label: "1200" },
  { value: "1300", label: "1300" },
  { value: "1400", label: "1400" },
];
const StyledSelect = styled(Select)`
  width: 8%;
  height: 10%;
`;

export const SelectBox = () => {
  const [weekOption, setWeekOption] = useState(null);
  const [openTimeOption, setOpenTimeOption] = useState(null);
  const [closeTimeOption, setCloseTimeOption] = useState(null);
  const [lunchTimeStartOption, setLunchTimeStartOption] = useState(null);
  const [lunchTimeEndOption, setLunchTimeEndOption] = useState(null);

  return (
    <>
      <TimeTable>
        <StyledSelect
          value={weekOption}
          onChange={setWeekOption}
          options={weekTable}
        />
        <span style={{ width: "2%" }}>부터</span>
        <StyledSelect
          value={openTimeOption}
          onChange={setOpenTimeOption}
          options={openTimeTable}
        />
        까지
        <StyledSelect
          value={closeTimeOption}
          onChange={setCloseTimeOption}
          options={closeTimeTable}
        />
        부터
        <StyledSelect
          value={lunchTimeStartOption}
          onChange={setLunchTimeStartOption}
          options={lunchTimeOpenTable}
        />
        까지
        <StyledSelect
          value={lunchTimeEndOption}
          onChange={setLunchTimeEndOption}
          options={lunchTimeCloseTable}
        />
      </TimeTable>
    </>
  );
};

const TimeTable = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;
