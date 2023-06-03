import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery, useQueryClient } from "react-query";
import { fetchList } from "../server/Fetcher";
import { Button } from "../components/button";

export const PersonalClient = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const maxPostPage = 10;
  const queryClient = useQueryClient();

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZpcnN0QHRlc3QuZ29vZCIsInN1YiI6IjY0NzdlOTk2YTkwZTQwOWYxYTQ4NzIyMSIsInJvbGUiOiJjbGllbnQiLCJpYXQiOjE2ODU1ODA0MTQsImV4cCI6MTcxNzEzODAxNH0.cWYJrF8kSJrmC4csSlR2x5B4v_ASZhinvKl5NFoShGc";
  const { isLoading, data: list } = useQuery(["list", currentPage], () =>
    fetchList(token, currentPage + 1)
  );

  useEffect(() => {
    if (currentPage <= maxPostPage - 2) {
      // 마지막 페이지가 10이므로 9페이지까지만 다음페이지 데이터를 받음
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery(["posts", nextPage], () => fetchList(nextPage));
    }
  }, [currentPage, queryClient]);
  console.log(list);
  if (isLoading) return <h1>로딩중입니다..</h1>;
  if (!isLoading)
    return (
      <>
        <PersonalTitle>개인 클라이언트 관리</PersonalTitle>
        <InfoBox>
          <Checkbox type="checkbox" />
          <InfoTab>가입날짜</InfoTab>
          <InfoTab>이름</InfoTab>
          <InfoTab>아이디</InfoTab>
          <InfoTab>연락처</InfoTab>
          <InfoTab></InfoTab>
        </InfoBox>
        <div>
          {list &&
            list.map((item) => (
              <ListBox key={item._id.$oid}>
                <Checkbox type="checkbox" />
                <InfoTab>{item.createdAt.$date.slice(0, 10)}</InfoTab>
                <InfoTab>{item.name}</InfoTab>
                <InfoTab>{item.email}</InfoTab>
                <InfoTab>{item.phoneNumber}</InfoTab>
                <Button></Button>
              </ListBox>
            ))}
        </div>
        <button
          disabled={currentPage <= 0} // 현재페이지가 0 이하면 previous 버튼 비활성화
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous page
        </button>
        <span>Page {currentPage + 1}</span>
        <button
          disabled={currentPage >= maxPostPage - 1} // 현재페이지가 9 이상이면 next 버튼 비활성화
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next page
        </button>
      </>
    );
};

export const PersonalTitle = styled.p`
  padding-top: 134px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 900;
  font-size: 42px;
  line-height: 51px;
`;

export const InfoBox = styled.div`
  margin-top: 50px;
  border: 1px red solid;
  border-left: none;
  border-right: none;
  border-top: 3px solid;
  border-bottom: 1px solid #929292;
  width: 1257px;
  height: 81px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const Checkbox = styled.input``;
export const InfoTab = styled.span`
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
`;

const ListBox = styled.div`
  margin-top: 50px;
  border: none;
  width: 1257px;
  height: 81px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
