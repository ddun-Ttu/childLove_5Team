import * as Style from "./styles/SearchPageStyle";

//아이콘
import { IconSearch, IconUp, IconDown, IconAlarm } from "../../assets/index";

// 공통 컴포넌트
import { NavigationBar, SearchBar } from "../../components/index";

//import문
import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";

//병원리스트 - 병원카드 컴포넌트
import { HospitalCard } from "./HospitalCard";
import { Wrapper } from "../../components/styles/SearchBarStyle";
import SearchHeader from "./SearchHeader";

//검색 정렬 옵션
const SORT_OPTIONS = [
  { name: "인기순", state: "byPopular" },
  { name: "이름순", state: "byName" },
];

//URL
const BE_URL = `http://34.64.69.226:3000/`;
const userToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGUubWFpbCIsInN1YiI6MSwiaWF0IjoxNjg2MjM0NjUxLCJleHAiOjE3MTc3OTIyNTF9.QORp6FfVmnROH3A-OCvHzYKjzZVAXjADpKcwmCwGeAA";
const endpoint_user = `users`;
const endpoint_favorite = `favorite/`;

export const SearchPageFix = () => {
  // 위치정보 depth1, depth2
  const [depth1, setDepth1] = useState("서울특별시");
  const [depth2, setDepth2] = useState("전체");
  const handleDepthChange = (first, second) => {
    setDepth1(first);
    setDepth2(second);
  };

  // 유저 정보
  const { data: user, userIsLoading } = useQuery(["user"], async () => {
    try {
      const response = await axios.get(`${BE_URL}${endpoint_user}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  });
  // 병원리스트
  const { data: hospitalList, hospitalListIsLoading } = useQuery(
    ["hospitals", depth1, depth2],
    async () => {
      try {
        const response = await axios.get(
          // depth2가 전체면 depth1만 넣어서 요청보냄
          depth2 === "전체"
            ? `${BE_URL}hospital?depth1=${depth1}&size=10&page=0`
            : `${BE_URL}hospital?depth1=${depth1}&depth2=${depth2}&size=10&page=0`
        );
        return response.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  );
  // 즐겨찾기 리스트
  const { data: favoriteList, favoriteListIsLoading } = useQuery(
    ["favorites"],
    async () => {
      try {
        const response = axios
          .get(`${BE_URL}${endpoint_favorite}user`, {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          })
          .then((response) => response.data);
        return response.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  );

  if (userIsLoading || hospitalListIsLoading || favoriteListIsLoading) {
    return null;
  }
  const list = hospitalList?.data ?? [];
  console.log("list:", list);

  //오늘 날짜(요일) 저장
  let now = new Date();
  const today = now.getDay();

  return (
    <>
      <Wrapper>
        <SearchBar
          onSearch={() => {}}
          depth1={depth1}
          depth2={depth2}
          onLocationChange={handleDepthChange}
        />
        {list.length > 0 ? (
          list.map((hospital) => {
            const dutyTimeStart = hospital[`dutyTime${today}s`]; // 오늘 요일에 해당하는 dutyTime 시작 시간
            const dutyTimeClose = hospital[`dutyTime${today}c`]; // 오늘 요일에 해당하는 dutyTime 종료 시간

            //즐겨찾기 해당여부 체크
            const favorite = true;
            //    favorites.data.some(
            //     (favoriteItem) =>
            //       favoriteItem.user_id === user_id &&
            //       favoriteItem.hpid === hospital.id
            //   );

            return (
              <HospitalCard
                key={hospital.id}
                hpid={hospital.id}
                hospitalName={hospital.dutyName}
                hospitalAddress={`${hospital.dutyAddr1Depth} ${hospital.dutyAddr2Depth} ${hospital.dutyAddr3Depth}`}
                today={today}
                dutyTimeStart={dutyTimeStart}
                dutyTimeClose={dutyTimeClose}
                favorite={favorite}
                handleFavorite={() => {}}
              />
            );
          })
        ) : (
          <div>No hospitals found</div>
        )}
      </Wrapper>
    </>
  );
};
