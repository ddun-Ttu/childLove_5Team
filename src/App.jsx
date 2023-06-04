/* eslint-disable */

import React, { useEffect, useState } from "react";
import XMLParser from "react-xml-parser";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// 공통 컴포넌트 연결해서 테스트함
import { NavigationBar } from "./components/NavigationBar";
import { Container } from "./components/Container";
import { Footer } from "./components/Footer";
import { Home } from "./pages/home/Home";
import { Login } from "./pages/login/Login";
import { SignUp } from "./pages/signUp/SignUp";

// 상수로 뽑아둔 color, fontSize 연결 링크
import colors from "./constants/colors";
import fontSize from "./constants/fontSize";

import "./App.css";

function App() {
  return (
    <>
      <Container>
        <Router>
          <Footer />
          <NavigationBar />
        </Router>
      </Container>
    </>
  );
}

export default App;
