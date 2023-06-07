import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery, useQueryClient } from "react-query";
import { fetchList } from "../../server/Fetcher";
import { Button } from "../../components/Button";
import colors from "../../constants/colors";
import { check } from "prettier";

export const PersonalClient = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const maxPostPage = 10;
  const queryClient = useQueryClient();

  const { isLoading, data: list } = useQuery("list", () => fetchList());

  const [checkValue, setCheckValue] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [checkList, setCheckList] = useState([]);
  const onChange = (e) => {
    setCheckValue(e.target.value);
    setSubmitted(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleSingleCheck = (checked, id) => {
    if (checked) {
      setCheckList((prev) => [...prev, id]);
    } else {
      setCheckList((prev) => prev.filter((el) => el !== id));
    }
  };
  const handleDelete = () => {
    const deleteId = paginatedList.filter((item) =>
      checkList.includes(item.id)
    );
    console.log("삭제할 id:", deleteId[0].id);
    fetch(`/admin/delete/${deleteId[0].id}`, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjFAMS4xIiwic3ViIjoxLCJpYXQiOjE2ODYxMDg4MzksImV4cCI6MTcxNzY2NjQzOX0.KoXifXgRmenLuMXmJ_RP1ZJnjinLlyhjD-HN1GAXc5A",
      },
    });
    queryClient.invalidateQueries("list");

    setCheckList([]);
  };

  useEffect(() => {
    if (currentPage <= maxPostPage - 1) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery(["posts", nextPage], () => fetchList());
    }
  }, [currentPage, queryClient]);

  if (isLoading) {
    return <h1>로딩중입니다..</h1>;
  }

  const filteredList = list.data?.filter(
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
      <Table>
        <thead>
          <tr>
            <TableHeader>
              <Checkbox type="checkbox" />
            </TableHeader>
            <TableHeader>가입날짜</TableHeader>
            <TableHeader>이름</TableHeader>
            <TableHeader>아이디</TableHeader>
            <TableHeader>연락처</TableHeader>
            <TableHeader>삭제</TableHeader>
          </tr>
        </thead>
        <tbody>
          {paginatedList.map((item) => (
            <TableRow key={item.id}>
              <TableData>
                <Checkbox
                  onChange={(e) => handleSingleCheck(e.target.checked, item.id)}
                />
              </TableData>
              <TableData>{item.createdAt.slice(0, 10)}</TableData>
              <TableData>{item.name}</TableData>
              <TableData>{item.email}</TableData>
              <TableData>{item.phoneNumber}</TableData>
              <TableData>
                <Button
                  width={"80px"}
                  height={"30px"}
                  label={"삭제"}
                  bgcolor={colors.primary}
                  btnColor={"white"}
                  onClick={handleDelete}
                />
              </TableData>
            </TableRow>
          ))}
        </tbody>
      </Table>
      <ButtonBox>
        <button
          disabled={currentPage <= 0}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          이전 페이지
        </button>
        <span>Page {currentPage + 1}</span>
        <button
          disabled={currentPage >= maxPostPage - 1}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          다음 페이지
        </button>
      </ButtonBox>
    </>
  );
};

export const PersonalTitle = styled.p`
  padding-top: 6.5%;
  font-family: "Inter";
  font-style: normal;
  font-weight: 900;
  font-size: 42px;
  line-height: 51px;
`;

export const Table = styled.table`
  margin-top: 20px;
  border-collapse: collapse;
  width: 90%;
`;

export const TableHeader = styled.th`
  text-align: center;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  padding: 10px;
  border-bottom: 1px solid #929292;
  border-top: 3px solid #000000;
`;

const TableData = styled.td`
  text-align: center;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  padding: 10px;
  height: 5%;
  padding-top: 2%;
`;

const TableRow = styled.tr`
  height: 70px;
`;
const Checkbox = styled.input.attrs({ type: "checkbox" })`
  width: 100%;
  cursor: pointer;
`;

const SearchBox = styled.div`
  border: 1px solid #b2b2b2;
  margin-top: 2%;
  padding: 1% 2.5%;
  box-sizing: border-box;
  border-radius: 28px;
  text-align: center;
`;

const InputContent = styled.input`
  width: 100%;
  box-sizing: border-box;
  height: 100%;
  outline: none;
  border: none;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2%;

  button {
    background-color: #e5e5e5;
    border: none;
    padding: 12px 20px;
    margin-right: 10px;
    cursor: pointer;
    outline: none;
  }

  span {
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
  }
`;
