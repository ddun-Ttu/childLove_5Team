import React, { useState, useEffect } from "react";
import VirtualScroll from "./VirtualScroll";
import { instance } from "../../server/Fetcher";
export const MyComponent = ({ hospitalNameInput }) => {
  const [scrollData, setScrollData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const Elem = ({ i, style }) => {
    return (
      <>
        <div>{i}</div>
        <div>{scrollData[i].dutyName}</div>
      </>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (hospitalNameInput) {
          console.log("default");
          const response = await instance.get(
            `/hospital/hp10/${hospitalNameInput}?size=10&page=${page}`
          );

          if (response.data.success) {
            setScrollData(response.data.data);
          }
        }
      } catch (error) {}
    };

    fetchData();
  }, [hospitalNameInput]);

  const fetchMoreData = async () => {
    setPage((prev) => prev + 1);

    if (hospitalNameInput) {
      console.log("more");

      const newScrollData = await instance.get(
        `/hospital/hp10/${hospitalNameInput}?size=10&page=${page}`
      );

      console.log("뉴스크롤", newScrollData.data.data);
      console.log("ㅇㅇ", scrollData);
      if (newScrollData.data.success) {
        const nextScrollData = [...scrollData, ...newScrollData.data.data];
        setScrollData(nextScrollData);
      }
    }
  };
  console.log("밖의 스크롤데이터", scrollData);
  // 데이터 리미트
  useEffect(() => {
    if (scrollData.length >= 100) {
      setHasMore(false);
    }
  }, [scrollData.length]);

  const rowRenderer = ({ index, key, style }) => (
    <Elem key={key} i={index} style={style} />
  );

  return (
    <>
      <VirtualScroll
        dataLength={scrollData.length}
        hasMore={hasMore}
        next={fetchMoreData}
        loader={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            loading...
          </div>
        }
        height={400}
        elementHeight={70} // 새로 추가
        rowRenderer={rowRenderer}
        children={scrollData}
      />
    </>
  );
};

export default MyComponent;
