/* eslint-disable */

import React, { useEffect, useState } from "react";
import XMLParser from "react-xml-parser";
import { QueryClient, QueryClientProvider } from "react-query";

import { Button } from "./components/button";
import { NavigationBar } from "./components/navigationBar";
import { Container } from "./components/container";

import "./App.css";
import { Footer } from "./components/Footer";
import SearchPage from "./pages/search/SearchPage";

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
    <>
      <Container>
      <QueryClientProvider client={queryClient}>
        <SearchPage />
        <NavigationBar />
        <Footer />
        </QueryClientProvider>
      </Container>
    </>
  );
}

export default App;
