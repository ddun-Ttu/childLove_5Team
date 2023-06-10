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

export const SearchPage = () => {
  //유저 id
  const [user_id, setUser_id] = useState(null);
  // 위치정보 depth1, depth2
  const [depth1, setDepth1] = useState("서울특별시");
  const [depth2, setDepth2] = useState("전체");
  // 병원리스트
  const [hospitalList, setHospitalList] = useState([]);
  // 키워드 검색어
  const [searchKeyword, setSearchKeyword] = useState("");
  //정렬 옵션
  const [sortOption, setSortOption] = useState(
    SORT_OPTIONS.find((item) => item.state === "byPopular")
  );
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  //---------------- axios get ----------------------//
  const usersQuery = useQuery("users", () =>
    axios
      .get(`${BE_URL}${endpoint_user}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => response.data)
  );

  const hospitalsQuery = useQuery("hospitals", async () => {
    try {
      const response = await axios.get(
        depth2 === "전체"
          ? `${BE_URL}hospital?depth1=${depth1}&size=10&page=0`
          : `${BE_URL}hospital?depth1=${depth1}&depth2=${depth2}&size=10&page=0`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error; // 에러를 다시 던져서 useQuery 훅이 에러 상태로 전환하도록 함
    }
  });

  const favoritesQuery = useQuery("favorites", () =>
    axios
      .get(`${BE_URL}${endpoint_favorite}user`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => response.data)
  );

  //user_id 불러오기
  useEffect(() => {
    if (usersQuery.isSuccess) {
      const fetchedUser_id = usersQuery.data.data.id;
      setUser_id(fetchedUser_id);
    }
  }, []);

  // user_id가 불러와졌다면, 즐겨찾기 목록 가져오기
  // useEffect(() => {
  //   if (user_id !== null && favoritesQuery.isSuccess) {
  //     favoritesQuery.refetch();
  //   }
  // }, [favoritesQuery, user_id]);

  //병원리스트 출력하기
  useEffect(() => {
    console.log("병원리스트 출력하기");
    if (hospitalsQuery.isSuccess) {
      const newHospitalList = hospitalsQuery.data.data;
      setHospitalList([...newHospitalList]); // 새로운 상태를 생성하여 불필요한 재렌더링 방지
      console.log(hospitalList);
    }
  }, []);

  // 위치 정보 변경 시, 병원 리스트 재렌더링
  const handleDepthChange = (first, second) => {
    setDepth1(first);
    setDepth2(second);
  };

  useEffect(() => {
    if (hospitalsQuery.isSuccess && hospitalsQuery.data) {
      const filteredHospitalList = hospitalsQuery.data.data.filter(
        (hospital) => {
          if (depth2 === "전체") {
            return hospital.depth1 === depth1;
          } else {
            return hospital.depth1 === depth1 && hospital.depth2 === depth2;
          }
        }
      );

      setHospitalList([...filteredHospitalList]);
      console.log(hospitalList);
    }
  }, [depth1, depth2]);

  const handleFavorite = (hospitalId, isFavorite) => {
    // const endpoint = `${BE_URL}${endpoint_favorite}${
    //   isFavorite ? "unfavorite" : "favorite"
    // }/${hospitalId}`;
    // axios
    //   .post(
    //     endpoint,
    //     {},
    //     {
    //       headers: {
    //         Authorization: `Bearer ${userToken}`,
    //       },
    //     }
    //   )
    //   .then(() => favoritesQuery.refetch());
  };

  //키워드 핸들링
  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
  };
  // 키워드로 검색 시, 병원리스트 재설정
  useEffect(() => {
    if (hospitalsQuery && hospitalsQuery.data) {
      const filteredHospitalList = hospitalsQuery.data.data.filter((hospital) =>
        hospital.dutyName.includes(searchKeyword)
      );
      setHospitalList([...filteredHospitalList]);
    }
  }, [searchKeyword]);

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
  const favorites = favoritesQuery.data || []; // favoritesQuery.data가 없을 경우 빈 배열로 초기화
  // console.log("hospitalsQuery.data.data:", hospitalsQuery.data.data);
  // console.log("hospitals.data.data:", hospitals.data);
  //오늘 요일에 따라 다른 dutyTime 가져오기
  let now = new Date();
  const today = now.getDay();

  //-----------검색 정렬 함수
  const handleSortDropdownClick = () => {
    setIsSortDropdownOpen(!isSortDropdownOpen);
  };

  const handleSortOptionChange = (e) => {
    const selectedOptionState = e.target.value;
    const selectedOption = SORT_OPTIONS.find(
      (item) => item.state === selectedOptionState
    );

    if (selectedOption) {
      setSortOption(selectedOption);
      setIsSortDropdownOpen(false);
    }
  };
  return (
    <>
      <Wrapper>
        <SearchBar
          onSearch={handleSearch}
          depth1={depth1}
          depth2={depth2}
          onLocationChange={handleDepthChange}
        />
        <SearchHeader
          total={hospitalList.length}
          sortOption={"byPopular"}
          onOptionChange={handleSortOptionChange}
        ></SearchHeader>
        {hospitalsQuery.isLoading ? (
          <div>Loading...</div>
        ) : hospitalsQuery.isError ? (
          <div>Error occurred while fetching hospital data</div>
        ) : (
          <div>
            {hospitalList.length > 0 ? (
              hospitalList.map((hospital) => (
                <HospitalCard
                  key={hospital.id}
                  hospital={hospital}
                  isFavorite={
                    favoritesQuery.isSuccess &&
                    favoritesQuery.data.data.some(
                      (favorite) => favorite.hospitalId === hospital.id
                    )
                  }
                  handleFavorite={handleFavorite}
                  user_id={user_id}
                />
              ))
            ) : (
              <div>No hospitals found</div>
            )}
          </div>
        )}
      </Wrapper>
      <NavigationBar />
    </>
  );
};
