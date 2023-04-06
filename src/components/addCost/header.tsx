/** 
 * 지출 등록 - 헤더
 * 
 * */

 import {  useEffect, useState } from 'react';

 import axios from 'axios'; 
 import styled from "styled-components";
 
 import { useAppDispatch, useAppSelector } from "../../redux/hooks";
 import { barActions } from '../../redux/modules/reducer/barReducer'
 
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 import { faBars, faEllipsisV } from '@fortawesome/free-solid-svg-icons'; // 햄버거바 아이콘
import { useNavigate } from 'react-router-dom';
 
function AddCost_Header() {
  const navigate = useNavigate();

  return (
    <Header>
      <Header__title>
        <img onClick={() => {navigate('/main')}} src='/image/back_icon.svg'/>
        <img src='/image/appointment_logo_icon.svg'/>
        <p>{'test'}{' > '}<span>지출 등록</span></p>
      </Header__title>


    </Header>
  )
}
 
 
 const Header = styled.div`
   display: flex;
   align-items: center;
   flex-direction: row;
   height: 40px;
   background-color: #322c58;
   box-sizing: border-box;
   border-bottom: 1px solid #ffffff;
 
   & { // 전체
     color: white;
     font-size: 1.2em;
   }
 
   & > p {
    height: 80%;
   }
 
 /* 모바일, 타블렛 기준 */
 @media screen and (max-width: 768px) { 
   & > p:first-child { // 햄버거바 아이콘
     display: block;
   }
 }
 
 `
 
 const Header__title = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 width: 100%;
 height: 100%;
 box-sizing: border-box;

& > img:nth-child(1) { // 뒤로가기 아이콘
  height: 40%;
  padding: 0 10px;
}

& > img:nth-child(2) { // 로고 이미지
  height: 50%;
}
 
& > p:nth-child(3) {
  padding-left: 5px;
  font-size: 1.2rem;

  & > span {
    color: yellow;
    font-size: 1.2rem;
  }
} 
`
 
 export default AddCost_Header;