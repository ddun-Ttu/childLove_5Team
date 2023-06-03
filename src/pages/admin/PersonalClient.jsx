import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery, useQueryClient } from "react-query";
import { fetchList } from "../../server/Fetcher";
import { Button } from "../../components/Button";

export const PersonalClient = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const maxPostPage = 10;
  const queryClient = useQueryClient();

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZpcnN0QHRlc3QuZ29vZCIsInN1YiI6IjY0NzdlOTk2YTkwZTQwOWYxYTQ4NzIyMSIsInJvbGUiOiJjbGllbnQiLCJpYXQiOjE2ODU1ODA0MTQsImV4cCI6MTcxNzEzODAxNH0.cWYJrF8kSJrmC4csSlR2x5B4v_ASZhinvKl5NFoShGc";
  const { isLoading, data: list } = useQuery("list", () => fetchList(token));

  const [checkValue, setCheckValue] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const onChange = (e) => {
    setCheckValue(e.target.value);
    setSubmitted(false);
    console.log(checkValue);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  useEffect(() => {
    if (currentPage <= maxPostPage - 2) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery(["posts", nextPage], () => fetchList(nextPage));
    }
  }, [currentPage, queryClient]);

  if (isLoading) {
    return <h1>로딩중입니다..</h1>;
  }

  const filteredList = list.filter(
    (item) => !submitted || item.email === checkValue
  );

  const startIndex = currentPage * 10;
  const endIndex = startIndex + 10;
  const paginatedList = filteredList.slice(startIndex, endIndex);

  return (
    <>
      <PersonalTitle>개인 클라이언트 관리</PersonalTitle>
      <SearchBox>
        <form onSubmit={onSubmit}>
          <InputContent type="text" value={checkValue} onChange={onChange} />
        </form>
      </SearchBox>
      <InfoBox>
        <Checkbox type="checkbox" />
        <InfoTab>가입날짜</InfoTab>
        <InfoTab>이름</InfoTab>
        <InfoTab>아이디</InfoTab>
        <InfoTab>연락처</InfoTab>
        <InfoTab />
      </InfoBox>
      <div>
        {paginatedList.map((item) => (
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
        disabled={currentPage <= 0}
        onClick={() => setCurrentPage((prev) => prev - 1)}
      >
        Previous page
      </button>
      <span>Page {currentPage + 1}</span>
      <button
        disabled={currentPage >= maxPostPage - 1}
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

export const Checkbox = styled.input`
  width: 20%;
`;
export const InfoTab = styled.span`
  text-align: center;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  width: 20%;
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

const SearchBox = styled.div`
  width: 30%;
  border: 1px solid #b2b2b2;
  margin-top: 2%;
  padding: 2% 2.5%;
  box-sizing: border-box;
  border-radius: 28px;
  text-align: center;

  & > input {
    font-size: 24px;
    border: none;
    width: 100%;
  }
  & > input::placeholder {
    color: #d9d9d9;
  }
  & > input:focus {
    outline: none;
  }
`;

const InputContent = styled.input`
  width: 100%;
  box-sizing: border-box;
  height: 50px;
  outline: none;
  border: none;
  border-radius: 5px;

  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 15px;
`;
