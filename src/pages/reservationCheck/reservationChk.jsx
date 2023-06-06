import React from "react";
import { ReservationMemo } from "./memoModal";
import { MyCalendar } from "./MyCalendar";

// 공통 컴포넌트 연결해서 테스트함
import {
  Button,
  CardBox,
  Header,
  NavigationBar,
  Container,
  Footer,
  SearchBar,
} from "../../components/index";

// 상수로 뽑아둔 color, fontSize 연결 링크
import colors from "../../constants/colors";
import fontSize from "../../constants/fontSize";

const ReservationChk = () => {
  return (
    <>
      <Header label={"예약 현황"} />
      <MyCalendar />
      <ReservationMemo label={"아이사랑 소아과"} />
      <Footer />
      <NavigationBar />
    </>
  );
};

export default ReservationChk;
