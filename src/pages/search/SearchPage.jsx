import * as Style from "../search-fix/styles/SearchPageStyle";
//아이콘
import { IconSearch, IconUp, IconDown, IconAlarm } from "../../assets/index";

// 공통 컴포넌트
import { NavigationBar, SearchBarFix } from "../../components/index";

import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";

//병원리스트 - 병원카드 컴포넌트
import { HospitalCard } from "../search-fix/HospitalCard";

const SearchPage = () => {
  //-----검색키워드 받아오기
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredHospitals, setFilteredHospitals] = useState([]);

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
  };

  const filterHospitals = (keyword) => {
    // 검색 키워드를 포함하는 병원만 필터링
    const filtered = hospitals.filter((hospital) =>
      hospital.dutyName.includes(keyword)
    );
    setFilteredHospitals(filtered);
  };
  const usersQuery = useQuery("users", () =>
    fetch("http://localhost:9999/user").then((response) => response.json())
  );
  const hospitalsQuery = useQuery("hospitals", () =>
    fetch("http://localhost:9999/hospital").then((response) => response.json())
  );
  const favoritesQuery = useQuery("favorites", () =>
    fetch("http://localhost:9999/favorite").then((response) => response.json())
  );
  useEffect(() => {
    if (
      hospitalsQuery.data &&
      usersQuery.data &&
      favoritesQuery.data &&
      searchKeyword
    ) {
      const hospitals = hospitalsQuery.data;
      const users = usersQuery.data;
      const favorites = favoritesQuery.data;
      const user_id = users[0].id;

      let now = new Date();
      const today = now.getDay();

      filterHospitals(searchKeyword, hospitals);
    }
    console.log("keyword:", searchKeyword);
  }, [
    searchKeyword,
    hospitalsQuery.data,
    usersQuery.data,
    favoritesQuery.data,
  ]);

  if (
    usersQuery.isLoading ||
    hospitalsQuery.isLoading ||
    favoritesQuery.isLoading
  ) {
    return <div>Loading...</div>;
  }
  if (usersQuery.isError) {
    return <div>Error loading users: {usersQuery.error.message}</div>;
  }
  if (hospitalsQuery.isError) {
    return <div>Error loading hospitals: {hospitalsQuery.error.message}</div>;
  }
  if (favoritesQuery.isError) {
    return <div>Error loading favorites: {favoritesQuery.error.message}</div>;
  }
  const users = usersQuery.data;
  const hospitals = hospitalsQuery.data;
  const favorites = favoritesQuery.data;

  const user_id = users[0].id;
  //오늘 요일에 따라 다른 dutyTime 가져오기
  let now = new Date();
  const today = now.getDay();

  const handleFavorite = (hpid) => {
    // 즐겨찾기 추가 또는 제거 로직 구현
    // hpid를 기반으로 즐겨찾기 상태를 변경할 수 있습니다.
    console.log("handleFavorite 실행, hpid:", hpid);
  };
  return (
    <>
      <SearchBarFix onSearch={handleSearch} />
      {/* <SearchHeader total={hospitals.length} /> */}
      <div>
        {filteredHospitals.map((hospital) => {
          const dutyTimeStart = hospital[`dutyTime${today}s`]; // 오늘 요일에 해당하는 dutyTime 시작 시간
          const dutyTimeClose = hospital[`dutyTime${today}c`]; // 오늘 요일에 해당하는 dutyTime 종료 시간

          // 즐겨찾기 해당여부 체크
          const favorite = favorites.some(
            (favoriteItem) =>
              favoriteItem.user_id === user_id &&
              favoriteItem.hpid === hospital.id
          );

          return (
            <HospitalCard
              key={hospital.id}
              hpid={hospital.id}
              hospitalName={hospital.dutyName}
              hospitalAddress={hospital.dutyAddr}
              today={today}
              dutyTimeStart={dutyTimeStart}
              dutyTimeClose={dutyTimeClose}
              favorite={favorite}
              handleFavorite={handleFavorite}
            />
          );
        })}
      </div>
      <NavigationBar />
    </>
  );
};

export default SearchPage;
