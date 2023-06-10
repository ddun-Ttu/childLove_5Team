import styled from "styled-components";

export const Wrapper = styled.div`
  & > div:first-child {
    width: 100%;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 2%;
    flex-direction: column;
  }
`;

export const SearchHeader = styled.div`
  position: relative;
  border-bottom: 1px solid #121212;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 2%;

  & > span {
    font-size: 20px;
    margin-left: 2%;
  }
`;

export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;

  & > button {
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
  }

  & > div {
    display: ${({ isOpen }) => (isOpen ? "block" : "none")};
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #ffffff;
    border-radius: 4px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    z-index: 999;
    width: 100%;
  }

  & option {
    margin: 5% 0;
    cursor: pointer;
    font-size: 16px;
  }
`;
