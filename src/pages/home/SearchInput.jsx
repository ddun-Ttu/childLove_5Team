import * as Style from "../../components/styles/SearchBarStyle";
import React, { useState, useEffect, useMemo } from "react";

//아이콘 & 행정구역데이터 - assets
import {
  addressList as locationData,
  IconSearch,
  IconDown,
  IconAlarm,
} from "../../assets/index";

// 공통 컴포넌트
import { Modal } from "../../components/index";

export const SearchInput = ({ onSearch }) => {
  //--------------------검색부분
  //검색어
  const [search, setSearch] = useState("");
  const onChange = (e) => {
    setSearch(e.target.value);
  };
  // 폼 전송 처리 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(search);
  };

  return (
    <Style.Wrapper>
      <Style.InputBox>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={search}
            onChange={onChange}
            placeholder="병원 이름을 검색해보세요"
          />
          <button type="submit" style={{ cursor: "pointer" }}>
            <img alt="search-button" src={IconSearch} />
          </button>
        </form>
      </Style.InputBox>
    </Style.Wrapper>
  );
};
