import React, { useState } from "react";
import DaumPostCode from "react-daum-postcode";
import styled from "styled-components";
import colors from "../../constants/colors";
import { InputBox, InputContent, InputName } from "./RegisterForm";
import { Button } from "../../components/Button";

export const Post = ({ getAddrData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [fulladdress, setFulladdress] = useState("");
  const [dutyAddr1Depth, setDutyAddr1Depth] = useState("");
  const [dutyAddr2Depth, setDutyAddr2Depth] = useState("");

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

    const newAddress = data.address.split(" ");
    const dutyAddr1Depth = newAddress.splice(0, 2).join(" ");
    const dutyAddr2Depth = [...newAddress].join(" ");

    setDutyAddr2Depth(dutyAddr2Depth);
    setDutyAddr1Depth(dutyAddr1Depth);
    getAddrData(dutyAddr1Depth, dutyAddr2Depth);
    handleCloseModal();
  };

  return (
    <>
      <InputBox>
        <PostBox>
          <InputName>주소</InputName>
          <Button
            width={"100px"}
            height={"30px"}
            bgcolor={colors.primary}
            onClick={handleOpenModal}
            btnColor={"#FFFFFF"}
            label={"주소찾기"}
            fontSize={"18px"}
          />

          {isOpen && (
            <ModalContainer>
              <Modal width={"30%"}>
                <PostCodeContainer>
                  <DaumPostCode
                    onComplete={handleComplete}
                    className="post-code"
                  />
                </PostCodeContainer>
                <button onClick={handleCloseModal}>닫기</button>
              </Modal>
            </ModalContainer>
          )}
        </PostBox>
        <InputContent type="text" value={dutyAddr1Depth} readOnly />
        <InputContent type="text" value={dutyAddr2Depth} readOnly />
      </InputBox>
    </>
  );
};

const PostCodeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 800px;
  height: 600px;
`;

const PostBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

export const ModalContainer = styled.div`
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

export const Modal = styled.div`
  width: ${(props) => props.width};
  height: auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
`;
