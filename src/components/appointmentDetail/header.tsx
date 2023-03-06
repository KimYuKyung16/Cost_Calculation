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

function Appointment_Header(props: Props) {
  const dispatch = useAppDispatch();

  const appointment_num = props.num;
  const barState = useAppSelector(state => state.barState); // 바 상태 : none | block

  let [appointmentTitle, setAppointmentTitle] = useState<string>('') ; // 일정 이름
  let [menuState, setMenuState] = useState<string>('none');

  /* 약속 이름 가져오기 */
  const getTitle = async () => { 
    try {
      let title = await axios.get('http://localhost:6001/appointment_title', {
        params: { num: appointment_num }
      })
      setAppointmentTitle(title.data.title); // 약속 이름
    } catch(e) {
      console.log(e);
    }
  }

  /* 햄버거바를 클릭했을 때 실행되는 함수 */
  const clickBar = () => {
    if (barState.visible === 'none') dispatch(barActions.setVisible('block'));
    else dispatch(barActions.setVisible('none'));
  }

  const clickMenuBar = () => {
    if (menuState === 'none') setMenuState('block');
    else setMenuState('none');
  }

  useEffect(()=> { getTitle() }, []);

  return (
    <Header>
      <p onClick={clickBar}><FontAwesomeIcon icon={faBars}/></p>
      <Header__title>
        <img src='/image/logo_purple.png'/>
        <p>{appointmentTitle}</p>
      </Header__title>

      <Test>
        <p onClick={clickMenuBar}><FontAwesomeIcon icon={faEllipsisV}/></p>
        <Menu visible={menuState}>
          <ul>
            <li>일정 수정</li>
            <li>삭제</li>
          </ul>
        </Menu>
      </Test>

    </Header>
  )
}

const Test = styled.div`
display: flex;
flex-direction: column;
position: relative;
/* width: 300px; */
/* background-color: antiquewhite; */

& > p {
  padding-right: 15px;
}
`

interface Visible_Props {
  visible: string | undefined;
}

const Menu = styled.div`
display: ${(props: Visible_Props) => props.visible };
padding: 0;
background-color: #ffffff;
position: absolute;
top: 55px;
right: 3px;
width: 200px;
z-index: 1;
border: none;
border-radius: 10px;
box-shadow: 0 5px 20px rgba(59, 59, 59, 0.8);


* {
  padding: 0;
  margin: 0;
}

  & > ul {
    list-style: none;
    font-size: 0.8em;

    & > li {
      text-align: center;
      padding: 10px;
      cursor: pointer;
    }

    & > li:nth-child(1) {
      color: #6d6d6d;
    }

    & > li:nth-child(2) {
      background-color: #b40606;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;

      &:hover {
        background-color: #d80707;
        font-weight: bold;
      }
    }
  }
`

type Props = {
  num: string|undefined;
}

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

  & > p:first-child { // 햄버거바 아이콘
    display: none;
    padding: 0 10px;
    font-size: 1.2em;
  }

  & > p:last-child { // 메뉴 아이콘
    padding-right: 15px;
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

  & p {
    padding-left: 5px;
  }

`

export default Appointment_Header;