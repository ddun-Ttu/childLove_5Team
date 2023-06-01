import React from "react";

import { Checkbox, InfoBox, InfoTab, PersonalTitle } from "./PersonalClient";

export const HospitalClient = () => {
  return (
    <>
      <PersonalTitle>병원 클라이언트 관리</PersonalTitle>
      <InfoBox>
        <Checkbox type="checkbox" />
        <InfoTab>가입날짜</InfoTab>
        <InfoTab>아이디</InfoTab>
        <InfoTab>병원명</InfoTab>
        <InfoTab>연락처</InfoTab>
        <div></div>
      </InfoBox>
    </>
  );
};
