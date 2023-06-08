import { useState, useEffect } from "react";
import * as Style from "./styles/SearchPageStyle";
import { useQuery } from "react-query";
import axios from "axios";

const BE_URL = `http://34.64.69.226:3000/`;

const userToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQG5hdmVyLmNvbSIsInN1YiI6NDIsImlhdCI6MTY4NjE1NzgyMSwiZXhwIjoxNzE3NzE1NDIxfQ.rJ62SE50lqU5cXLSuE-knIiIYhJr2KpTjLQpAERovXk";
const endpoint_user = `users`;
// const endpoint_hospitals = `hospital?size=10&page=0`;
const endpoint_hospitals = `hospital?depth1=부산광역시&size=10&page=0`;
const endpoint_favorite = `favorite/`;
//sort -> name
export const SearchPage = () => {
  const [user_id, setUser_id] = useState(null);
  const usersQuery = useQuery("users", () =>
    axios
      .get(`${BE_URL}${endpoint_user}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => response.data)
  );

  const hospitalsQuery = useQuery("hospitals", () =>
    axios
      .get(`${BE_URL}${endpoint_hospitals}`)
      .then((response) => response.data)
  );

  const favoritesQuery = useQuery("favorites", () =>
    axios
      .get(`${BE_URL}${endpoint_favorite}user`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => response.data)
  );

  useEffect(() => {
    if (usersQuery.isSuccess) {
      const fetchedUser_id = usersQuery.data.data.id;
      setUser_id(fetchedUser_id);
    }
  }, [usersQuery]);

  console.log("user_id:", user_id);
  useEffect(() => {
    if (user_id !== null && favoritesQuery.isSuccess) {
      favoritesQuery.refetch();
    }
  }, [favoritesQuery, user_id]);

  console.log("favorite:", favoritesQuery);

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

  //오늘 요일에 따라 다른 dutyTime 가져오기
  let now = new Date();
  const today = now.getDay();

  const handleFavorite = (hpid) => {
    // 즐겨찾기 추가 또는 제거 로직 구현
    // hpid를 기반으로 즐겨찾기 상태를 변경할 수 있습니다.
    console.log("handleFavorite 실행, hpid:", hpid);
  };
  return <></>;
};
