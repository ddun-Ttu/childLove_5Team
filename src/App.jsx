/* eslint-disable */

import React, { useEffect, useState } from "react";
import XMLParser from "react-xml-parser";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Button } from "./components/button";
import { NavigationBar } from "./components/navigationBar";
import { Container } from "./components/container";
import { Footer } from "./components/Footer";

import "./App.css";

import colors from "./constants/colors";
import fontSize from "./constants/fontSize";

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
    <>
      <Container>
        <Button
          onClick={() => {
            console.log("Button was clicked!");
          }}
          label={"안녕"}
          btnFontSize={fontSize.but}
          btnColor={"white"}
          bgcolor={colors.primary}
          // width={"30px"}
          // height={"90px"}
          borderOutLine={colors.BtnborderOut}
        />
        <Router>
          <Button />
          <NavigationBar />
          <Footer />
        </Router>
      </Container>
    </>
  );
}

export default App;
