import { AriaAttributes, DOMAttributes, useEffect, useRef, useState } from 'react';

import { useNavigate, Link, useParams } from "react-router-dom";

import { barActions } from '../../redux/modules/reducer/barReducer'
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // 아이콘 사용 위해 필요
import { faAngleLeft, faBars, faEllipsisV } from '@fortawesome/free-solid-svg-icons'; 

import axios from 'axios'; 
import styled from "styled-components"; // styled in js

const Header = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 100%;
  background-color: #322c58;
  box-sizing: border-box;
  padding-left: 10px;

  & { // 전체
    color: white;
    font-size: 1.2em;
  }

  & p:nth-child(1) { // 뒤로가기 아이콘
    padding: 0 10px;
    font-size: 1.2em;
  }

  & p:nth-child(3) { // 뒤로가기 아이콘
    padding: 0 10px;
    font-size: 1.2em;
  }


/* 모바일, 타블렛 기준 */
@media screen and (max-width: 1023px) { 
  padding: 0;
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

  & p {
    padding-left: 5px;
  }

`





function Layout_Header() {
  const dispatch = useAppDispatch();
  
  let [appointmentTitle, setAppointmentTitle] = useState<string>('') ; // 바를 클릭한 횟수
  // let [barState, setBarState] = useState<String>('none'); // 멤버 컴포넌트 상태 -> default값: 안보임.

  let barState = useAppSelector(state => state.barState);


  const clickBar = () => { // 햄버거바를 클릭했을 때 실행되는 함수
    if (barState.visible === 'none') dispatch(barActions.setVisible('block'));
    else dispatch(barActions.setVisible('none'));
    console.log(barState.visible)
  }

  useEffect(() => {}, [appointmentTitle]);

  return (
    <Header>
      <p onClick={clickBar}><FontAwesomeIcon icon={faAngleLeft}/></p> {/* 햄버거바 */}

      <Header__title>
        <img src='/image/logo_purple.png'/>
        <p>친구 목록</p>
      </Header__title>

      <p><FontAwesomeIcon icon={faEllipsisV}/></p>
    </Header>
  )
}

export default Layout_Header;