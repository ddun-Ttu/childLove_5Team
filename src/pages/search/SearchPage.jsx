import React, { useEffect } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
// import { useSetRecoilState, useRecoilValue } from "recoil";
// import {
//   userState,
//   favoriteState,
//   hospitalState,
// } from "../../recoil/RecoilAtoms";
import SearchHeader from "./SearchHeader";
import HospitalCard from "./HospitalCard";

const SearchPage = () => {
  const usersQuery = useQuery("users", () =>
    fetch("http://localhost:9999/user").then((response) => response.json())
  );
  const hospitalsQuery = useQuery("hospitals", () =>
    fetch("http://localhost:9999/hospital").then((response) => response.json())
  );
  const favoritesQuery = useQuery("favorites", () =>
    fetch("http://localhost:9999/favorite").then((response) => response.json())
  );

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

  // const setUser = useSetRecoilState(userState);
  // const setFavorite = useSetRecoilState(favoriteState);
  // const setHospital = useSetRecoilState(hospitalState);

  // const fetchUserData = async () => {
  //   try {
  //     const response = await fetch("http://localhost:9999/user");
  //     const userData = await response.json();
  //     console.log("user-res:", response);
  //     console.log("userData:", userData);
  //     setUser(userData.user);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // // 즐겨찾기 데이터를 받아온 후 Recoil atom에 저장하는 로직 작성
  // const fetchFavoriteData = async () => {
  //   try {
  //     const response = await fetch("http://localhost:9999/favorite");
  //     const favoriteData = await response.json();
  //     setFavorite(favoriteData.favorite);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // // 병원 데이터를 받아온 후 Recoil atom에 저장하는 로직 작성
  // const fetchHospitalData = async () => {
  //   try {
  //     const response = await fetch("http://localhost:9999/hospital");
  //     const hospitalData = await response.json();
  //     setHospital(hospitalData.hospital);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // // 컴포넌트가 마운트될 때 데이터를 가져오도록 호출
  // useEffect(() => {
  //   fetchUserData();
  //   fetchFavoriteData();
  //   fetchHospitalData();
  // }, []);

  // // 데이터 리코일value 가져오기
  // const users = useRecoilValue(userState);
  // const hospitals = useRecoilValue(hospitalState);
  // const favorites = useRecoilValue(favoriteState);
  // console.log("users:", users);

  const user_id = users[0].id;
  //오늘 요일에 따라 다른 dutyTime 가져오기
  let now = new Date();
  const today = now.getDay();

  return (
    <>
      <PageWrap>
        <SearchHeader total={hospitals.length} />
        <div>
          {hospitals.map((hospital) => {
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
              />
            );
          })}
        </div>
      </PageWrap>
    </>
  );
};

export default SearchPage;

const PageWrap = styled.div`
  max-width: 833px;
`;
