import React from "react"; //, { useState }
import IconUp from "../../assets/iconUp.svg";
import { Button } from "../../components/Button";
import styled from "styled-components";
import CardBox from "../../components/CardBox";

// 상수로 뽑아둔 color, fontSize 연결 링크
import colors from "../../constants/colors";
import fontSize from "../../constants/fontSize";

// eslint-disable-next-line react/prop-types
export const ReservationMemo = ({ label }) => {
  // const [modalIsOpen, setModalIsOpen] = useState(false);

  // const openModal = () => {
  //   setModalIsOpen(true);
  // };
  // const closeModal = () => {
  //   setModalIsOpen(false);
  // };

  return (
    <>
      <CardBox>
        <ModalHeader>
          <BtnCloseModal onClick={"#"}>
            <img alt="icon-up" src={IconUp}></img>
          </BtnCloseModal>
          <div>
            <span>메모</span>
          </div>
        </ModalHeader>
        <MemoBlock>
          <HospitalName>
            <h2>{label}</h2>
          </HospitalName>
          <MemoInput>
            <InputBox type="text" placeholder="메모를 입력하세요" />
          </MemoInput>
        </MemoBlock>
        <Button
          LinkTo={"#"}
          onClick={() => {
            console.log("Button was clicked!");
          }}
          label={"저장"}
          btnFontSize={fontSize.but}
          btnColor={"white"}
          bgcolor={colors.primary}
          // width={"30px"}
          // height={"90px"}
          borderOutLine={colors.BtnborderOut}
        />
      </CardBox>
    </>
  );
};

// const MemoBlock = styled.div`
//   background: ${(props) => props.color || "white"};
//   color: white;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   border-radius: 10px;
//   font-size: 1rem;
// `;

const ModalHeader = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;

  & > div:nth-child(2) {
    color: #00ad5c;
    font-weight: 600;
    padding: 2%;
    margin: 2%;
    border-bottom: 2px solid;
  }

  & > span {
    width: 100%;
  }
`;

const BtnCloseModal = styled.button`
  background: none;
  border: none;
`;

const MemoBlock = styled.div`
  display: table-cell;
  vertical-align: middle;

  width: 100%;
  height: 100%
  border: 1px solid #b2b2b2;
`;

const HospitalName = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #h2h2h2;

  width: 100%;
  height: 100%;
`;

const MemoInput = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  }
`;

const InputBox = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%
  border: 1px solid #b2b2b2;
  border-radius: 20px;
  margin: 2% 2% 5% 2%;
  padding: 20%;

  font-size: 14px;
  
  &::placeholder{
    color: #d9d9d9;
    text-indent: left;
  }
`;

// const MemoSave = styled.button`
//   font-size: ${(props) => props.fontSize};
//   font-weight: 700;
//   color: ${(props) => props.color};
//   width: ${(props) => props.width};
//   height: ${(props) => props.height};
//   border: 1px solid ${(props) => props.borderOutLine};
//   border-radius: 5px;
//   background-color: ${(props) => props.bgcolor};
//   cursor: pointer;

//   padding: 1% 3.5%;
// `;
