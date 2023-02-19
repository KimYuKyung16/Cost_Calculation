/** 
 * 일정 상세 페이지
 * 
 * */  

import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import { barActions } from '../../redux/modules/reducer/barReducer'
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import Appointment_Header from './header';
import MemberList from './membrList';
import CostList from './costList/index';

import axios from 'axios'; 
import styled from "styled-components";

function Appointment() {
  axios.defaults.withCredentials = true; // 요청, 응답에 쿠키를 포함하기 위해 필요
  const dispatch = useAppDispatch();

  const params = useParams();
  const num: string | undefined = params.num; // 일정 번호

  const barState = useAppSelector(state => state.barState);

  const blackRef: any = useRef(null); 

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (blackRef.current && blackRef.current.contains(e.target)) {
        dispatch(barActions.setVisible('none'))
      }
    }
    document.addEventListener('click', handleOutsideClick, true); // Component rendering 후 이벤트 등록
    return () => {
      document.removeEventListener('click', handleOutsideClick, true); // Component 제거 시 이벤트 제거
    };
  }, [blackRef]);


  return(
    <Total>

      <Black visable={barState.visible} ref={blackRef}></Black>

      <Header>
        <Appointment_Header num={num}></Appointment_Header>
      </Header>

      <Container>
        <Main__MemberList visable={barState.visible}>
          <MemberList num={num}></MemberList> 
        </Main__MemberList>
        <Main__CostList>
          <CostList num={num}></CostList>
        </Main__CostList>
      </Container>  

    </Total>
  )
}

const Total = styled.div`
display: flex;
flex-direction: column;
width: 100%; 
height: 100%;
`

const Black = styled.div` // 멤버리스트 열렸을 때 검은 바탕 화면
display: none;
position: absolute;
width: 100%;
height: 100%;
background-color: black;
opacity: 50%;

@media screen and (max-width: 1023px) { 
  display: ${(props: MemberList_Props) => props.visable}; // block으로 하면 점진적인 검은색 화면 애니메이션 가능 but 스크롤 불가능
  opacity: ${(props: MemberList_Props) => props.visable === 'block' ? '80%' : '0%' };
  transition: ${(props: MemberList_Props) => props.visable === 'block' ? 'opacity 0.5s ease-out' : 'opacity 0.5s ease-in'};
  z-index: 1;
}
`

const Header = styled.div` // 헤더
height: 40px;
border-bottom: 1px solid white;

@media screen and (max-width: 1023px) { 
  z-index: 1;
}
`

const Container = styled.div`
display: flex;
flex-direction: row;
position: relative;
height: 100%;
width: 100%;
`

interface MemberList_Props {
  visable: string | undefined;
}

const Main__MemberList = styled.div` // 멤버 리스트
width: 40%;
height: calc(100vh - 40px);

@media screen and (max-width: 1023px) { 
  width: 70%;
  position: absolute;
  top: 0;
  transform: ${(props: MemberList_Props) => props.visable === 'block' ? 'translateX(-0%)' : 'translateX(-100%)' };
  transition: ${(props: MemberList_Props) => props.visable === 'block' ? 'transform 0.5s ease-out' : 'transform 0.5s ease-in'};
  z-index: 1;
}
`

const Main__CostList = styled.div` // 지출 내역 리스트
width: 100%;
height: calc(100vh - 40px);
`

export default Appointment;