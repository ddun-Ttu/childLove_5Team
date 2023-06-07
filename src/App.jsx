/* eslint-disable */
import { RegisterForm } from "./pages/registerForm/RegisterForm";
import React, { useEffect, useState } from "react";
import XMLParser from "react-xml-parser";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// 공통 컴포넌트 연결해서 테스트함
import {
  Button,
  CardBox,
  Header,
  NavigationBar,
  Container,
  Footer,
  SearchBar,
  Modal,
} from "./components/index";
// 상수로 뽑아둔 color, fontSize 연결 링크
import colors from "./constants/colors";
import fontSize from "./constants/fontSize";

// import "./App.css";
import { SearchPage } from "./pages/search-fix/SearchPage";
import { AdminHome } from "./pages/admin/AdminHome";
import MapHospital from "./pages/map-fix/MapHospital";
import { HospitalCard } from "./pages/search-fix/HospitalCard";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <Container>
        <Router>
          <Routes>
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </Router>
      </Container>
    </>
  );
}

export default App;

