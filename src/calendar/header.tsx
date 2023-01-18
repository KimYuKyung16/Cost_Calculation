import { AriaAttributes, DOMAttributes, useEffect, useRef, useState } from 'react';

import { useNavigate, Link, useParams } from "react-router-dom";

import { memberListActions } from '../redux/modules/reducer/memberListReducer'
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // 아이콘 사용 위해 필요
import { faBars } from '@fortawesome/free-solid-svg-icons'; // 뒤로가기, 햄버거바 아이콘

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

  & > p:first-child { // 햄버거바 아이콘
    display: none;
    padding: 0 10px;
    font-size: 1.2em;
  }

/* 모바일, 타블렛 기준 */
@media screen and (max-width: 1023px) { 
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











type Props = {
  num: string|undefined;
}

function Layout_Header(props: Props) {
  const appointment_num = props.num;
  const dispatch = useAppDispatch();
  
  let [appointmentTitle, setAppointmentTitle] = useState<string>('') ; // 바를 클릭한 횟수
  let [barState, setBarState] = useState<String>('none'); // 멤버 컴포넌트 상태 -> default값: 안보임.

  const getTitle = async () => { // 약속 이름 가져오기
    try {
      let title = await axios.get('http://localhost:6001/appointment_title', {
        params: { num: appointment_num }
      })
      setAppointmentTitle(title.data.title); // 약속 이름
    } catch(e) {
      console.log(e);
    }
  }

  const clickBar = () => { // 햄버거바를 클릭했을 때 실행되는 함수
    setBarState ((prev) => {
      if (prev === 'none') return ('block'); // 이전 값이 none이면 보이게 처리
      else return ('none'); // 이전 값이 block이면 안보이게 처리
    })
  }

  useEffect(()=> {getTitle();}, []);
  useEffect(() => {}, [appointmentTitle]);

  return (
    <Header>
      <p onClick={clickBar}><FontAwesomeIcon icon={faBars}/></p> {/* 햄버거바 */}
      <Header__title>
        <img src='/image/logo_purple.png'/>
        <p>{appointmentTitle}</p>
      </Header__title>
    </Header>
  )
}

export default Layout_Header;