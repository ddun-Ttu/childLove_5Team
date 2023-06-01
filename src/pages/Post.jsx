import React, { useState } from "react";
import DaumPostCode from "react-daum-postcode";
import styled from "styled-components";
import { ButtonStyle } from "../components/button";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 9999;
`;

const Modal = styled.div`
  position: relative;
  padding: 20px;
  background-color: white;
`;

const DaumPostModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    const { addressType, bname, buildingName } = data;
    if (addressType === "R") {
      if (bname !== "") {
        extraAddress += bname;
      }
      if (buildingName !== "") {
        extraAddress += `${extraAddress !== "" && ", "}${buildingName}`;
      }
      fullAddress += `${extraAddress !== "" ? ` ${extraAddress}` : ""}`;
    }
    console.log(fullAddress);

    // 주소 선택 후에 필요한 로직을 추가할 수 있습니다.

    handleCloseModal();
  };

  return (
    <>
      <ButtonStyle onClick={handleOpenModal}>주소 찾기</ButtonStyle>
      {isOpen && (
        <ModalContainer>
          <Modal>
            <DaumPostCode onComplete={handleComplete} className="post-code" />
            <button onClick={handleCloseModal}>닫기</button>
          </Modal>
        </ModalContainer>
      )}
    </>
  );
};

export const Post = () => {
  return (
    <>
      <DaumPostModal />
    </>
  );
};
