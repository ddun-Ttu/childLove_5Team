/* eslint-disable */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import colors from "../../constants/colors";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const userToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imp1bkBlbWFpbC5jb20iLCJzdWIiOjE4LCJpYXQiOjE2ODYzNzY1NDYsImV4cCI6MTcxNzkzNDE0Nn0.nDZfyySUgGh3_eHKfw4hoh8LYXsv2u5ljcB1NdyEGcM";

// ChildBox의 저장버튼 구현
const SaveButton = styled.button`
  position: absolute;
  bottom: 10px;
  font-size: 30px;
  font-weight: 900;
  color: white;
  border: 1px solid ${colors.BtnborderOut};
  border-radius: 5px;
  background-color: ${colors.primary};
  cursor: pointer;
  padding: 0% 2.5%;
`;

export const ChildBox = ({
  id,
  gender,
  birth,
  name,
  memo,
  image,
  onRemove,
  linkTo
  }) => {
    let modifyBirth = null
    if(birth !== undefined || null){
      modifyBirth = birth?.split('-')
    } else {
      modifyBirth=Array(null, null, null)
    }
    if(image?.length ===0){
      image = null
    }
    const [selectedImage, setSelectedImage] = useState(image);
    const [kidName, setKidName] = useState(name);
    const [birthYear, setBirthYear] = useState(modifyBirth[0]);
    const [birthMonth, setBirthMonth] = useState(modifyBirth[1]);
    const [birthDay, setBirthDay] = useState(modifyBirth[2]);
    const [isEditable, setIsEditable] = useState(true);

    //사용자가 선택한 이미지 파일에 대한 참조(URL)를 selectedImage 상태에 저장
    const handleImageChange = (e) => {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
      console.log(URL.createObjectURL(e.target.files[0]))
    };

    //사용자가 이름을 입력하면 그 값을 상태에 저장하는 역할
    //이는 사용자의 입력을 실시간으로 'kidname' 상태에 반영하기 위한 것
    const handleKidNameChange = (e) => {
      setKidName(e.target.value);
    };

    //사용자가 '생년'을 입력하면 그 값을 상태에 저장하는 역할
    const handleBirthYearChange = (e) => {
      setBirthYear(e.target.value);
    };

    //사용자가 '월'을 입력하면 그 값을 상태에 저장하는 역할
    const handleBirthMonthChange = (e) => {
      setBirthMonth(e.target.value);
    };

    //사용자가 '일'을 입력하면 그 값을 상태에 저장하는 역할
    const handleBirthDayChange = (e) => {
      setBirthDay(e.target.value);
    };

    //이미지가 선택되었을 때 그 이미지를 제거하는 역할 
    //이미지 참조(selectedImage)를 null로 설정함으로써 이미지를 제거
    const removeImage = () => {
      setSelectedImage(null);
    };

    //버튼이 클릭되었을 때, 현재 입력 상태를 확정 편집을 불가능하게 만드는 역할
    //isEditable 상태를 false로 설정함으로써 이를 달성, 반대도 가능
    const handleButtonClick = async() => {
      // 이름, 생년, 월, 일 모두 채워져 있는지 확인
      if (!kidName || !birthYear || !birthMonth || !birthDay) {
        alert("모든 칸을 채워주세요");
        return;
      }
      // 이름은 두 글자 이상이어야 함
      if (kidName.length < 2) {
        alert("이름은 최소 두 글자 이상이어야 합니다");
        return;
      }
      // 생년, 월, 일이 숫자로 입력되었는지 확인
      if (isNaN(birthYear) || isNaN(birthMonth) || isNaN(birthDay)) {
        alert("생년월일은 숫자로 입력해야 합니다");
        return;
      }
      // 생년은 네 자리, 월과 일은 두 자리여야 함
      if (birthYear.length !== 4 || birthMonth.length !== 2 || birthDay.length !== 2) {
        alert("생년은 네 자리, 월과 일은 두 자리 숫자로 입력해야 합니다");
        return;
      }
      // 모든 유효성 검사를 통과하면 편집 가능 상태를 반전시킴
      /*지금 이 상태는 에러가 날 수 밖에 없습니다. 왜냐하면 id를 어떻게 받을지에 대해서 우리는 생각을 해볼 필요가 있습니다.
      만약. onRemove(id)에서 id를 제대로 받고 있다면 위에 'handleButtonClick'의 argument에서 id는 딱히 없어도 동작할
      가능성은 있겠지만, 지금 현재로써는 저는 이게 동작하는지 가늠하기가 어렵군요*/
      const originalBirth = `${birthYear}-${birthMonth}-${birthDay}`
      await axios.patch(`http://34.64.69.226:3000/kid/${id}`, {
        name: kidName,
        birth: originalBirth
      }, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      });
      setIsEditable(!isEditable);
    };

    //"삭제" 버튼이 클릭되었을 때 해당 항목을 삭제하는 역할 onRemove 함수를 호출하며, 
    //이 onRemove 함수는 ChildBox 컴포넌트를 사용하는 부모 컴포넌트에서 제공,
    //onRemove 함수는 id를 인자로 받아 해당 항목을 실제로 삭제하는 로직을 수행
    const handleRemoveClick = () => {
      onRemove(id);
    };

    //이미지를 추가 안해도 그공간을 비워놓기위해 사용
    const Placeholder = styled.div`
      width: 100px;
      height: 100px;
      background-color: transparent;
      border: 1px solid #ddd;
    `;

    //저장 버튼을 누르면 remove image 버튼이 사라져도 그공간을 비워놓기 위해
    const ButtonPlaceholder = styled.button`
      visibility: hidden;
    `;

    return (
      <ChildBoxStyle>
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          <div>
            {selectedImage ? (
              isEditable ? (
                <>
                  <img src={selectedImage} alt="Selected" />
                  <button onClick={removeImage}>Remove Image</button>
                </>
              ) : (
                <>
                  <img src={selectedImage} alt="Selected" />
                  <ButtonPlaceholder>Remove Image</ButtonPlaceholder>
                </>
              )
            ) : (
              isEditable ? (
                <>
                  <Placeholder />
                  <input type="file" accept="image/*" onChange={handleImageChange} />
                </>
              ) : (
                <Placeholder />
              )
            )}
          </div>
          <div style={{ marginLeft: "10px" }}>
            <div>
              {isEditable ? (
                <>
                  <label htmlFor="kidNameInput" style={{ fontWeight: "bold" }}>이름 </label>
                  <InputBox
                    id="kidNameInput"
                    type="text"
                    value={kidName}
                    onChange={handleKidNameChange}
                    style={{ fontWeight: "bold" }}
                  />
                </>
              ) : (
                <p style={{fontWeight: 'bold', textAlign: 'left'}}>{kidName}</p>
              )}
            </div>
            <Space2 />
            <div>
              {isEditable ? (
                <>
                  <label htmlFor="birthYearInput">생년 </label>
                  <Input2Box
                    id="birthYearInput"
                    type="text"
                    value={birthYear}
                    onChange={handleBirthYearChange}
                    style={{ fontWeight: "bold" }}
                  />
                  <label htmlFor="birthMonthInput" style={{ fontWeight: "bold" }}> 월일 </label>
                  <Input2Box
                    id="birthMonthInput"
                    type="text"
                    value={birthMonth}
                    onChange={handleBirthMonthChange}
                    style={{ fontWeight: "bold" }}
                  />
                  <Input2Box
                    id="birthDayInput"
                    type="text"
                    value={birthDay}
                    onChange={handleBirthDayChange}
                    style={{ fontWeight: "bold", marginLeft: "10px" }}
                  />
                </>
              ) : (
                <>
                  <p style={{fontWeight: 'bold', textAlign: 'left'}}>{birthYear}년 {birthMonth}월 {birthDay}일</p>
                </>
              )}
            </div>
          </div>
        </div>
        <FontAwesomeIcon 
          icon={faTimes}
          size="2x"
          style={{
            position: 'absolute', 
            top: '-20px', 
            left: '-20px', 
            backgroundColor: 'red', 
            color: 'white',
            borderRadius: '20%', 
            padding: '2px 5px',
            lineHeight: '1', 
            border: 'none'
          }} 
          onClick={handleRemoveClick}
        />
        <SaveButton style={{ alignSelf: "flex-end" }} onClick={handleButtonClick}>
          {isEditable ? "저장" : "수정"}
        </SaveButton>
      </ChildBoxStyle>
    );
  };
  
const ChildBoxStyle = styled.div`
    position: relative;
    width: 100%;
    height: 150px;
    background-color: #ffffff;
    border: solid 1px #b2b2b2;
    border-radius: 20px;
    box-sizing: border-box;
    padding: 2%;
    margin: 1% 0;
    display: flex; 
    flex-direction: column; 
    align-items: flex-start;
    justify-content: space-between;
    img {
      max-width: 100px;
      margin-right: 10px;
    }
`;
const Space = styled.div`
  margin-bottom: 20px;
`;

const Space2 = styled.div`
  margin-bottom: 5px;
`;

const InputBox = styled.input`
  width: 280px;
  box-sizing: border-box;
  font-weight: bold;
  font-size: 24px;
  padding: 2%;
`;

const Input2Box = styled.input`
  width: 75px;
  box-sizing: border-box;
  font-weight: bold;
  font-size: 11px;
  padding: 2%;
`;