import { RegisterForm } from "./pages/registerForm/RegisterForm";

import React from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 페이지 연결
import {
  AdminHome,
  Home,
  MyPage,
  Login,
  SearchPage,
  SignUp,
  Detail,
  Reserve,
  MapHospital,
  Jail,
  ReservationChk,
  ChildPage,
  Favorite,
  ModifyForm,
} from "./pages/index";

function App() {
  return (
    <Router>
      {" "}
      {/* Router 컴포넌트 추가 */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Helmet>
                <title>아이사랑</title>
              </Helmet>
              <Home />
            </>
          }
        ></Route>
        <Route
          path="/login"
          element={
            <>
              <Helmet>
                <title>아이사랑 - 로그인</title>
              </Helmet>
              <Login />
            </>
          }
        ></Route>
        <Route
          path="/SignUp"
          element={
            <>
              <Helmet>
                <title>아이사랑 - 회원가입</title>
              </Helmet>
              <SignUp />
            </>
          }
        ></Route>
        <Route
          path="/register"
          element={
            <>
              <Helmet>
                <title>아이사랑 - 신규병원등록</title>
              </Helmet>
              <RegisterForm />
            </>
          }
        />
        <Route
          path="admin"
          element={
            <>
              <Helmet>
                <title>아이사랑 - 관리자페이지</title>
              </Helmet>
              <AdminHome />
            </>
          }
        />
        <Route
          path="/reserve"
          element={
            <>
              <Helmet>
                <title>아이사랑 - 예약현황</title>
              </Helmet>
              <ReservationChk />
            </>
          }
        />
        <Route
          path="/search"
          element={
            <>
              <Helmet>
                <title>아이사랑 - 병원찾기</title>
              </Helmet>
              <SearchPage />
            </>
          }
        />
        <Route
          path="/detail/"
          element={
            <>
              <Helmet>
                <title>아이사랑 - 병원상세</title>
              </Helmet>
              <Detail />
            </>
          }
        />
        <Route
          path="/detail/reserve"
          element={
            <>
              <Helmet>
                <title>아이사랑 - 예약하기</title>
              </Helmet>
              <Reserve />
            </>
          }
        />
        <Route
          path="/detail/map"
          element={
            <>
              <Helmet>
                <title>아이사랑 - 병원위치찾기</title>
              </Helmet>
              <MapHospital />
            </>
          }
        />
        <Route
          path="/Mypage"
          element={
            <>
              <Helmet>
                <title>아이사랑 - 내정보</title>
              </Helmet>
              <MyPage />
            </>
          }
        />
        <Route
          path="/Mypage/ChildPage"
          element={
            <>
              <Helmet>
                <title>아이사랑 - 아이정보</title>
              </Helmet>
              <ChildPage />
            </>
          }
        />
        <Route
          path="/favorite"
          element={
            <>
              <Helmet>
                <title>아이사랑 - 즐겨찾기</title>
              </Helmet>
              <Favorite />
            </>
          }
        />
        <Route
          path="/modify"
          element={
            <>
              <Helmet>
                <title>아이사랑 - 병원정보수정</title>
              </Helmet>
              <ModifyForm />
            </>
          }
        />
        <Route
          path="/jail"
          element={
            <>
              <Helmet>
                <title>아이사랑 - 승인대기</title>
              </Helmet>
              <Jail />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
