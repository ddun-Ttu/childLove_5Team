/* eslint-disable */
import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// 이미지 링크
import mainLogo from "../assets/mainLogo.svg";
import MainBanner from "../assets/mainBanner.png";
import iconPeople from "../assets/iconPeople.svg";
import arrowRight from "../assets/arrowRight.svg";

// 공통 컴포넌트 연결 링크
import { Button } from "../components/Button";
import { NavigationBar } from "../components/NavigationBar";
import { Container } from "../components/Container";
import { Footer } from "../components/Footer";
import { CardBox } from "../components/CardBox";
import { SearchBar } from "../components/SearchBar";

// 상수로 뽑아둔 color, fontSize 연결 링크
import colors from "../constants/colors";
import fontSize from "../constants/fontSize";

// react-slick 라이브러리
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Login = () => {
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
};
export default Login;

const mainLogoDiv = styled.div`
  margin-top: 4%;
`;

const mainLogoImg = styled.img`
  padding: 3% 3% 0 3%;
`;

const H1 = styled.p``;
