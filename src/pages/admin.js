import React, { useState, Suspense } from "react";
import styled from "styled-components";

const HospitalClient = React.lazy(() =>
  import("./hospitalClient").then((module) => ({
    default: module.HospitalClient,
  }))
);
const HospitalRegister = React.lazy(() =>
  import("./hospitalRegister").then((module) => ({
    default: module.HospitalRegister,
  }))
);
const PersonalClient = React.lazy(() =>
  import("./personalClient").then((module) => ({
    default: module.PersonalClient,
  }))
);

export const AdminHome = () => {
  const [content, setContent] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState("");

  const handleMenuClick = (menu) => {
    switch (menu) {
      case "개인 클라이언트 관리":
        setContent(<PersonalClient />);
        setSelectedMenu("개인 클라이언트 관리");
        break;
      case "병원 클라이언트 관리":
        setContent(<HospitalClient />);
        setSelectedMenu("병원 클라이언트 관리");
        break;
      case "병원 등록 관리":
        setContent(<HospitalRegister />);
        setSelectedMenu("병원 등록 관리");
        break;
      default:
        setContent(null);
        setSelectedMenu(null);
    }
  };

  return (
    <>
      <AdminBox>
        <AdminMenuBox>
          <AdminMenu
            onClick={() => handleMenuClick("개인 클라이언트 관리")}
            selected={selectedMenu === "개인 클라이언트 관리"}
          >
            개인 클라이언트 관리
          </AdminMenu>
          <AdminMenu
            onClick={() => handleMenuClick("병원 클라이언트 관리")}
            selected={selectedMenu === "병원 클라이언트 관리"}
          >
            병원 클라이언트 관리
          </AdminMenu>
          <AdminMenu
            onClick={() => handleMenuClick("병원 등록 관리")}
            selected={selectedMenu === "병원 등록 관리"}
          >
            병원 등록 관리
          </AdminMenu>
        </AdminMenuBox>
        <AdminContentBox>
          <Suspense fallback={<div>Loading...</div>}>{content}</Suspense>
        </AdminContentBox>
      </AdminBox>
    </>
  );
};

const AdminBox = styled.div`
  width: 1920px;
  height: 1080px;
  display: flex;
`;

const AdminMenuBox = styled.div`
  padding-top: 270px;
  width: 530px;
  height: 1080px;
  background-color: #33bd7d;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const AdminMenu = styled.div`
  width: 530px;
  height: 145px;
  font-weight: bold;
  font-size: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? "#FFFFFF" : "transparent")};
`;
const AdminContentBox = styled.div`
  width: 100%;
  height: 1080px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
