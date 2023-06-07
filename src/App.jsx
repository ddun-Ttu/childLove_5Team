import { RegisterForm } from "./pages/registerForm/RegisterForm";
import ReservationChk from "./pages/reservationCheck/reservationChk";

import React, { useEffect, useState } from "react";
import XMLParser from "react-xml-parser";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
} from "react-router-dom";

// 공통 컴포넌트 연결해서 테스트함
import {
  Button,
  CardBox,
  Header,
  NavigationBar,
  Container,
  Footer,
  SearchBar,
} from "./components/index";
// 상수로 뽑아둔 color, fontSize 연결 링크
import colors from "./constants/colors";
import fontSize from "./constants/fontSize";

// import "./App.css";
import SearchPage from "./pages/search/SearchPage";
import { AdminHome } from "./pages/admin/AdminHome";
import Home from "./pages/home/Home";

const queryClient = new QueryClient();

function App() {
  const [arr, setArr] = useState();

  console.log(arr);

  useEffect(() => {
    fetch(
      "https://apis.data.go.kr/B552657/HsptlAsembySearchService/getHsptlMdcncFullDown?serviceKey=aQFwyyURxZPboOkpSx1uUEC9mvyECY1ClICrCdzJ9lNT9JZC0oGtU%2BKwiY7dSTrZm3wodyTWqkdltlLRwKFafQ%3D%3D&pageNo=1&numOfRows=10"
    )
      .then((res) => res.text())
      .then((data) => {
        const xml = new XMLParser().parseFromString(data);
        setArr(xml.children[1].children[0].children);
      })
      .catch(() => console.log("err"));
  }, []);

  return (
    <Router>
      {" "}
      {/* Router 컴포넌트 추가 */}
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="admin" element={<AdminHome />} />
          <Route path="/reserve" element={<ReservationChk />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
