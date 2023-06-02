import React, { useState } from "react";
import styled from "styled-components";
import SearchBar from "../../components/SearchBar";
import IconDown from "../../assets/iconDown.svg";

const SearchHeader = ({ total }) => {
  const [totalShow, setTotalShow] = useState(total);

  const filterItem = [
    { name: "인기순", state: "byPopular" },
    { name: "이름순", state: "byName" },
  ];
  const [filter, setFilter] = useState(
    filterItem.find((item) => item.state === "byPopular")
  );
  const [isOpen, setIsOpen] = useState(false);
  const handleSelectClick = () => {
    setIsOpen(!isOpen);
  };

  const handleFilterChange = (e) => {
    const selectedFilterState = e.target.value;
    const selectedFilter = filterItem.find(
      (item) => item.state === selectedFilterState
    );

    if (selectedFilter) {
      setFilter(selectedFilter);
      setIsOpen(false);
    }
  };

  return (
    <Wrapper>
      <SearchBar />
      <div>
        <Total>총 {totalShow} 개</Total>
        <div>
          <DropdownContainer>
            <DropdownButton isOpen={isOpen} onClick={handleSelectClick}>
              {filter.name}
            </DropdownButton>
            <DropdownMenu isOpen={isOpen}>
              {filterItem.map((item) => (
                <DropdownMenuItem
                  key={item.state}
                  value={item.state}
                  onClick={handleFilterChange}
                >
                  {item.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenu>
          </DropdownContainer>
          <img alt="icon-down" src={IconDown}></img>
        </div>
      </div>
    </Wrapper>
  );
};

export default SearchHeader;

const Wrapper = styled.div`
  position: relative;
  border-bottom: 1px solid #121212;
  box-sizing: border-box;

  & > div:nth-child(2) {
    width: 100%;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 2%;
  }
`;

const Total = styled.span`
  font-size: 20px;
  margin-left: 2%;
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  font-size: 20px;
  background: none;
  border: none;
  display: flex;
  justify-content: center;
  background-color: #ffffff;
  color: #121212;
  padding: 0.5rem;
  border-radius: 4px;
  outline: none;
`;

const DropdownMenu = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 999;
  width: 100%;
`;

const DropdownMenuItem = styled.option`
  margin: 5% 0;
  cursor: pointer;
  font-size: 16px;
`;
