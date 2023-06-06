import { useState } from "react";
import * as Style from "./ModalStyle";

// 상수로 뽑아둔 color, fontSize 연결 링크
import colors from "../constants/colors";
import fontSize from "../constants/fontSize";

export const Modal = ({ title = "모달제목", children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModalHandler = () => {
    // isOpen의 상태를 변경하는 메소드를 구현
    // !false -> !true -> !false
    setIsOpen(!isOpen);
  };

  //모달 버튼의 props 옵션
  const ModalBtnProps = {
    btnColor: "#FFFFFF",
    btnFontSize: `${fontSize.h2}`,
    bgcolor: `${colors.primary}`,
    borderOutLine: `${colors.BtnborderOut}`,
    width: "fit-content",
    height: "fit-content",
  };

  return (
    <>
      <Style.ModalContainer>
        <Style.ModalShowBtn
          onClick={openModalHandler}
          // 클릭하면 Modal이 열린 상태(isOpen)를 boolean 타입으로 변경하는 메소드가 실행되어야 합니다.
        >
          {" "}
          Open Modal
          {/* 조건부 렌더링을 활용해서 Modal이 열린 상태(isOpen이 true인 상태)일 때는 ModalBtn의 내부 텍스트가 'Opened!' 로 Modal이 닫힌 상태(isOpen이 false인 상태)일 때는 ModalBtn 의 내부 텍스트가 'Open Modal'이 되도록 구현 */}
        </Style.ModalShowBtn>
        {/* 조건부 렌더링을 활용해서 Modal이 열린 상태(isOpen이 true인 상태)일 때만 모달창과 배경이 뜰 수 있게 구현 */}
        {isOpen ? (
          <Style.ModalBackdrop onClick={openModalHandler}>
            {/* event 버블링을 막는 메소드 */}
            <Style.ModalView onClick={(e) => e.stopPropagation()}>
              <Style.ModalTitle>
                <span>{title}</span>
              </Style.ModalTitle>
              <div>{children}</div>
              <div>
                <Style.ModalBtn
                  {...ModalBtnProps}
                  label={"닫기"}
                  onClick={openModalHandler}
                >
                  닫기
                </Style.ModalBtn>
                <Style.ModalBtn {...ModalBtnProps} label={"확인"}>
                  확인
                </Style.ModalBtn>
              </div>
            </Style.ModalView>
          </Style.ModalBackdrop>
        ) : null}
      </Style.ModalContainer>
    </>
  );
};
