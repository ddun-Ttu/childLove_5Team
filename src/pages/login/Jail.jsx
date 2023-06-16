import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


// 공통 컴포넌트
import {
  Button,
  CardBox,
  Header,
  NavigationBar,
  Container,
  Footer,
  SearchBar,
} from "../../components/index";

export const Jail = () => {
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      axios
        .get("/users/get", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.data.data.adminVerified) {
            navigate("/");
          }
        });
    } else {
      navigate("/");
    }
  }, []);
  return (
    <>
      <Container>
      <CardBox>
        <p>승인 대기중입니다</p>
        <button onClick={() => window.location.reload()}>새로고침</button>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("user");
            localStorage.removeItem("verified");
            navigate("/");
          }}
        >
          로그아웃
        </button>
        </CardBox>
      </Container>
    </>
  );
};
