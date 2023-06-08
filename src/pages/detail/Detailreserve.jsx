import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Link, useLocation } from "react-router-dom";
import { useQuery } from "react-query";

// 아이콘
import star from "../../assets/star.svg";
import clockGreen from "../../assets/clockGreen.svg";
import IconLeft from "../../assets/iconLeft.svg";

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

// 상수로 뽑아둔 color, fontSize 연결 링크
import colors from "../../constants/colors";
import fontSize from "../../constants/fontSize";

// 공통 컴포넌트 수정활용 *즐겨찾기,뒤로가기 클릭 이벤트 추가해야함
const NewHeader = ({ label, onClick }) => {
    return (
      <>
        <HeaderWrap>
          <BtnBack onClick={onClick}>
            <img alt="icon-left" src={IconLeft}></img>
          </BtnBack>
          <div>
            <h2>{label}</h2>
          </div>
          <HeaderStar><img alt="star" src={star}></img></HeaderStar>
        </HeaderWrap>
      </>
    );
  };
const NewCardBox = ({
    bgcolor,
    fontSize,
    color,
    width,
    height,
    label,
    onClick,
    disabled,
    borderRad,
    button,
    margin,
}) => {
    return (
      <NewCardBoxStyle 
        onClick={onClick}
        fontSize={fontSize}
        color={color}
        bgcolor={bgcolor}
        width={width}
        height={height}
        disabled={disabled}
        borderRad={borderRad}
        margin={margin}>
        {label}
        {button}
      </NewCardBoxStyle>
    );
  };

  

// 백엔드 주소
const BEdata = "http://34.64.69.226:3000"


const Reserve = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    // const hospitalID = searchParams.get("id")
    const hospitalID = "A1100401" //테스트용

    const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3Rtb29uQG5hdmVyLmNvbSIsInN1YiI6NDQsImlhdCI6MTY4NjE5Mzc2NiwiZXhwIjoxNzE3NzUxMzY2fQ.odDsjoxuSy5fmGeFBxl-UQ6f0CRh6RbBMxef-11D4Ng"
    // localStorage.getItem("token"); 위의 토큰 대체
    // if(hospitalID || token == false){
    //     alert("잘못된 접근입니다")
    // }


    const [hospitalData, setHospitalData] = useState({});
    const [hospitalImg, setHospitalImg] = useState("");
    const [hospitalReviews, setHospitalReviews] = useState([]);
    const [hospitalReviewState, setHospitalReviewState] = useState({});
    const [userReviews, setUserReviews] = useState([]);

    useEffect(() => {
        fetch(`${BEdata}/hospital/${hospitalID}`, {
            headers: {
              Accept: "application / json",
            },
            method: "GET",
          })
          .then(res => res.json())
          .then((hospitalID) => {
            setHospitalData(hospitalID.data);
          });
      
        fetch(`${BEdata}/image/hospital/${hospitalID}`)
        .then(res => res.json())
        .then((hospitalD) => {
          setHospitalImg(hospitalD.data);
        });
    
        fetch(`${BEdata}/reviews/${hospitalID}`)
        .then(res => res.json())
        .then(reviewData => {
          setHospitalReviews(reviewData.data)
        });
        }, []);

    return (
        <Container>
            <HeaderContainer>
                <NewHeader label={hospitalData.dutyName}/>
            </HeaderContainer>
            <TopContentContainer>
             <div>{hospitalData.dutyName}</div>
              <UnderLine />
            </TopContentContainer>
            <BottomContentContainer>
                <HpInfo>
                <img src={clockGreen} alt="" />
                <HpInfoGrid>
                    {hospitalData.dutyTime1c && hospitalData.dutyTime1s && <HpInfoCard>월 {hospitalData.dutyTime1s}-{hospitalData.dutyTime1c}</HpInfoCard> }
                    {hospitalData.dutyTime2c && hospitalData.dutyTime2s && <HpInfoCard>화 {hospitalData.dutyTime2s}-{hospitalData.dutyTime2c}</HpInfoCard> }
                    {hospitalData.dutyTime3c && hospitalData.dutyTime3s && <HpInfoCard>수 {hospitalData.dutyTime3s}-{hospitalData.dutyTime3c}</HpInfoCard> }
                    {hospitalData.dutyTime4c && hospitalData.dutyTime4s && <HpInfoCard>목 {hospitalData.dutyTime4s}-{hospitalData.dutyTime4c}</HpInfoCard> }
                    {hospitalData.dutyTime5c && hospitalData.dutyTime5s && <HpInfoCard>금 {hospitalData.dutyTime5s}-{hospitalData.dutyTime5c}</HpInfoCard> }
                    {hospitalData.dutyTime6c && hospitalData.dutyTime6s && <HpInfoCard>토 {hospitalData.dutyTime6s}-{hospitalData.dutyTime6c}</HpInfoCard> }
                    {hospitalData.dutyTime7c && hospitalData.dutyTime7s && <HpInfoCard>일 {hospitalData.dutyTime7s}-{hospitalData.dutyTime7c}</HpInfoCard> }
                </HpInfoGrid>
                </HpInfo>
                <NewCardBox bgcolor={"#FEFEFE"} width={"100%"} height={"86px"} label={"05. 26. (금)"} borderRad={"16px"} color={colors.primary} fontSize={"25px"} margin={"37px 0 45px 0"}
                button={ <Button width={"100px"} height={"43px"} bgcolor={colors.primary} label={<span>지도</span>} 
                    borderOutLine={"#ffffff"} btnColor={"white"} btnFontSize={"20px"} linkTo={"/map"}>
                    </Button>
                }></NewCardBox>
            </BottomContentContainer>
        </Container>
    )
}

//스타일 - 헤더
const HeaderContainer = styled.div`
  width: 100%;
  height: 74px;
  align-items: center;
  display: flex;
  border-bottom: 1px solid #b2b2b2;
`;

const HeaderStar = styled.div`
  display: flex;
  text-align: center;
  float: right;
  width: 29px;
  height: 28px;
  margin-right: 10px;
  @media screen and (max-width: 600px) {
    width: 21px;
    height: 21px;
  }
`
const HeaderWrap = styled.div`
  width: 100%;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: space-between;
  & h2 {
    font-size: 20px;
    color: #00ad5c;
    font-weight: 600;
    @media screen and (max-width: 600px) {
      font-size: 17px;
    }
  }
`;

const BtnBack = styled.button`
  background: none;
  border: none;
  float: left;
`;

//스타일 - 메인컨텐츠
const TopContentContainer = styled.div`
  position: relative;
  margin-top: 13px;
  width: 100%;
  height: 83px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 30px;
  @media screen and (max-width: 600px) {
    font-size: 20px;
  }
  a {
    position: absolute;
    right: 41px;
    @media screen and (max-width: 800px) {
      display:none;
    }
  }
`;

const UnderLine = styled.div`
  position: absolute;
  bottom: 0px;
  width: 100px;
  border-bottom: 2px solid ${colors.primary};
`;

const BottomContentContainer = styled.div`
  flex-direction: column;
  text-align: left;
  padding-left: 71px;
  padding-right: 71px;
  @media screen and (max-width: 600px) {
  padding-left: 30px;
  padding-right: 30px;
  }
`;

const HpInfo = styled.div`
  margin-top: 42px;
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 18px;
  span {
    margin-left: 22px;
  }
  h1 {
    margin-left: 22px;
    color: ${colors.primary};
  }
  @media screen and (max-width: 500px) {
    font-size: 15px;
  }
`;

const HpInfoCard = styled.span`
  font-weight: 400;
  font-size: 16px;
  padding: 7px 15px 7px 15px;
  border: solid 1px #BEBEBE;
  border-radius: 17.5px;
  @media screen and (max-width: 640px) {
    font-size: 13px;
  }
`;

const HpInfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 10px;
  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 10px;
  }
  @media screen and (max-width: 450px) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
  }
`;

const NewCardBoxStyle = styled.div`
display: flex;
position: relative;
border: solid 1px #b2b2b2;
box-sizing: border-box;
padding: 2%;
margin: ${(props) => props.margin};
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
align-items: center;
justify-content: center;
border-radius: ${(props) => props.borderRad};
font-size: ${(props) => props.fontSize};
color: ${(props) => props.color};
width: ${(props) => props.width};
height: ${(props) => props.height};
background-color: ${(props) => props.bgcolor};
font-weight: 600;

button {
    position: absolute;
    right: 58px;
    bottom: 22px;
}
&:disabled {
    color: white;
    background-color: #DADADA;
    border: 1px solid ;
    cursor: not-allowed;
  }
`;

export default Reserve;