/** 
 * 일정 상세 페이지 - 헤더
 * 
 * */

 import {  useEffect, useState } from 'react';

 import axios from 'axios'; 
 import styled from "styled-components";
 
 import { useAppDispatch, useAppSelector } from "../../redux/hooks";
 import { barActions } from '../../redux/modules/reducer/barReducer'
 
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 import { faBars, faEllipsisV } from '@fortawesome/free-solid-svg-icons'; // 햄버거바 아이콘
 
 function Message_Header() {

 
   return (
     <Header>
       <Header__title>
         <img src='/image/logo_purple.png'/>
         <p>{'test'}</p>
         <p>지출 등록</p>
       </Header__title>
 
 
     </Header>
   )
 }
 
 
 const Header = styled.div`
   display: flex;
   align-items: center;
   flex-direction: row;
   width: 100%;
   height: 40px;
   background-color: #322c58;
   box-sizing: border-box;
   padding-left: 10px;
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
   padding: 0;
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
 
   & img { // 로고 이미지
     width: auto;
     height: 60%;
     border-radius: 70%;
     border: 2px solid white;
   }
 
   & > p:nth-child(2) {
     padding-left: 5px;
   }

   & > p:nth-child(3) {
     padding-left: 5px;
     color: yellow;
   }
 
 `
 
 export default Message_Header;