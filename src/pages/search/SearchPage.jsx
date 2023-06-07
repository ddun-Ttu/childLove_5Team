import * as Style from "../search-fix/styles/SearchPageStyle";

//아이콘
import { IconSearch, IconUp, IconDown, IconAlarm } from "../../assets/index";

// 공통 컴포넌트
import { NavigationBar, SearchBarFix } from "../../components/index";

//import문
import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";

//병원리스트 - 병원카드 컴포넌트
import { HospitalCard } from "../search-fix/HospitalCard";
import { Wrapper } from "../../components/SearchBarStyle";

//검색 정렬 옵션
const SORT_OPTIONS = [
  { name: "인기순", state: "byPopular" },
  { name: "이름순", state: "byName" },
];

//URL
const BE_URL = `http://34.64.69.226:3000/`;

const SearchPage = () => {
  // 위치정보 depth1, depth2
  const [depth1, setDepth1] = useState("");
  const [depth2, setDepth2] = useState("");
  // 위치정보만 받았을 때의 전체 병원리스트
  const [hospitalList, setHospitalList] = useState([]);
  // 키워드 검색어
  const [searchKeyword, setSearchKeyword] = useState("");
  //키워드 검색 후 필터링 된 병원 리스트
  const [keywordFilteredHospitals, setKeywordFilteredHospitals] = useState([]);
  //정렬 옵션
  const [sortOption, setSortOption] = useState(
    SORT_OPTIONS.find((item) => item.state === "byPopular")
  );
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  const handleDepthChange = (first, second) => {
    setDepth1(first);
    setDepth2(second);
  };

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
  };

  const filterHospitals = (keyword, hospitals) => {
    const filtered = hospitalList.filter((hospital) =>
      hospital.dutyName.includes(keyword)
    );
    setKeywordFilteredHospitals(filtered);
  };

  const usersQuery = useQuery("users", () =>
    axios.get("http://localhost:9999/user").then((response) => response.data)
  );

  const hospitalsQuery = useQuery("hospitals", () =>
    axios
      .get(
        depth2 === "전체" //depth2가 전체일 경우 depth1만 url 요청
          ? `${BE_URL}hospital?depth1=${depth1}&size=10&page=0`
          : `${BE_URL}hospital?depth1=${depth1}&depth2=${depth2}&size=10&page=0`
      )
      .then((response) => response.data)
  );

  const favoritesQuery = useQuery("favorites", () =>
    axios
      .get("http://localhost:9999/favorite")
      .then((response) => response.data)
  );

  useEffect(() => {
    if (hospitalsQuery.isSuccess) {
      const hospitalList = hospitalsQuery.data.data;
      setHospitalList(hospitalList);
    }
  }, [hospitalsQuery.isSuccess]);

  useEffect(() => {
    if (searchKeyword) {
      filterHospitals(searchKeyword, hospitals);
    } else {
      setKeywordFilteredHospitals(hospitalList);
    }
  }, [searchKeyword, hospitalList]);

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

  //-----------검색 정렬 함수
  const handleSortDropdownClick = () => {
    setIsSortDropdownOpen(!isSortDropdownOpen);
  };

  const handleSortOptionChange = (e) => {
    const selectedOptionState = e.target.value;
    const selectedOption = SORT_OPTIONS.find(
      (item) => item.state === selectedOptionState
    );

    if (selectedFilter) {
      setSortOption(selectedOption);
      setIsSortDropdownOpen(false);
    }
  };
  return (
    <>
      <Wrapper>
        <SearchBarFix
          onSearch={handleSearch}
          depth1={depth1}
          depth2={depth2}
          onLocationChange={handleDepthChange}
        />
        <div>
          <span>{keywordFilteredHospitals.length}</span>
          <Style.SortDropdownContainer>
            <Style.SortDropdownButton
              isOpen={isSortDropdownOpen}
              onClick={handleSortOptionChange}
            >
              {sortOption.name}
            </Style.SortDropdownButton>
            <Style.SortDropdownMenu isOpen={isSortDropdownOpen}>
              {SORT_OPTIONS.map((item) => (
                <Style.SortDropdownMenuItem
                  key={item.state}
                  value={item.state}
                  onClick={handleSortOptionChange}
                >
                  {item.name}
                </Style.SortDropdownMenuItem>
              ))}
            </Style.SortDropdownMenu>
            <img alt="icon-down" src={IconDown} />
          </Style.SortDropdownContainer>
        </div>
        <div>
          {keywordFilteredHospitals.map((hospital) => {
            const dutyTimeStart = hospital[`dutyTime${today}s`]; // 오늘 요일에 해당하는 dutyTime 시작 시간
            const dutyTimeClose = hospital[`dutyTime${today}c`]; // 오늘 요일에 해당하는 dutyTime 종료 시간

            // 즐겨찾기 해당여부 체크 -> 즐겨찾기 api 연결 전까지 임의로 true로 하기
            // const favorite = favorites.some(
            //   (favoriteItem) =>
            //     favoriteItem.user_id === user_id &&
            //     favoriteItem.hpid === hospital.id
            // );
            const favorite = true;
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
                handleFavorite={handleFavorite}
              />
            );
          })}
        </div>
      </Wrapper>
      <NavigationBar />
    </>
  );
};

export default SearchPage;
