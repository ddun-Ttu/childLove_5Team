import React from "react";

import { Checkbox, InfoBox, InfoTab, PersonalTitle } from "./personalClient";

export const HospitalRegister = () => {
  return (
    <>
      <PersonalTitle>병원 등록 관리</PersonalTitle>
      <InfoBox>
        <Checkbox type="checkbox" />
        <InfoTab>병원명</InfoTab>
        <InfoTab>주소</InfoTab>
        <InfoTab>이메일</InfoTab>
        <InfoTab>연락처</InfoTab>
        <div></div>
      </InfoBox>
    </>
  );
};
