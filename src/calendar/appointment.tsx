import { useEffect, useRef, useState } from 'react';

import { useNavigate, useParams } from "react-router-dom";

import { barActions } from '../redux/modules/reducer/barReducer'
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import Layout_Header from './header';
import MemberList from './appointment_MembrList';
import CostList from './costList';

import axios from 'axios'; 
import styled, { Keyframes, keyframes } from "styled-components"; // styled in js

const Header = styled.div`
height: 40px;
border-bottom: 1px solid white;


/* 모바일, 타블렛 기준 */
@media screen and (max-width: 1023px) { 
  z-index: 1;
}
`

const Total = styled.div`
display: flex;
flex-direction: column;
width: 100%; 
height: 100%;
/* background-color: #ffffff; */
box-sizing: border-box;
`


const Container = styled.div`
display: flex;
flex-direction: row;
/* height: calc(100% - 40px); */
height: 100%;
width: 100%;
position: relative;
`

interface MemberList_Props {
  visable: string | undefined;
}

interface Black_Props {
  visable: string | undefined;
}

const Main__MemberList = styled.div`
/* position: sticky;
top: 0; */
  width: 40%;
  height: calc(100vh - 40px);
  /* background-color: aqua; */

/* 모바일, 타블렛 기준 */
@media screen and (max-width: 1023px) { 
  /* display:  */
  position: absolute;
  top: 0;
  width: 70%;
  /* animation: ${(props: MemberList_Props) => props.visable} 1s ease-out both; */
  transform: ${(props: MemberList_Props) => props.visable === 'block' ? 'translateX(-0%)' : 'translateX(-100%)' };
  transition: ${(props: MemberList_Props) => props.visable === 'block' ? 'transform 1s ease-out' : 'transform 1s ease-in'};
  z-index: 1;
}
`

const Main__CostList = styled.div`
/* display: flex; */
height: calc(100vh - 40px);
width: 100%;
`
const BlackContainer = styled.div`
/* 모바일, 타블렛 기준 */

`

const Black = styled.div`
width: 100%;
height: 100%;
background-color: black;
position: absolute;
opacity: 50%;
display: none;

@media screen and (max-width: 1023px) { 
display: ${(props: MemberList_Props) => props.visable}; // block으로 하면 점진적인 검은색 화면 애니메이션 가능 but 스크롤 불가능
/* transform: translateX(-150%); */
z-index: 1;
opacity: ${(props: MemberList_Props) => props.visable === 'block' ? '80%' : '0%' };
transition: ${(props: MemberList_Props) => props.visable === 'block' ? 'opacity 1s ease-out' : 'opacity 1s ease-in'};
}
`

function Appointment() {
  axios.defaults.withCredentials = true; // 요청, 응답에 쿠키를 포함하기 위해 필요
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  let params = useParams();
  let num: string|undefined = params.num;

  let barState = useAppSelector(state => state.barState);

  const testRef:any = useRef();
  const testRef2:any = useRef();

 useEffect(() => {
    function handleOutsideClick(e: any) {
      if (testRef.current && testRef.current.contains(e.target)) {
        dispatch(barActions.setVisable('none'))
      }
    }

    // Component rendering 후 이벤트 등록
    document.addEventListener('click', handleOutsideClick, true);
    // Component 제거 시 이벤트 제거
    return () => {
      document.removeEventListener('click', handleOutsideClick, true);
    };
  }, [testRef]);


  return(
    <Total>

      <BlackContainer ref={testRef}>
        <Black visable={barState.visable}></Black>
      </BlackContainer>

      <Header>
        <Layout_Header num={num}></Layout_Header>
      </Header>

      <Container>
        <Main__MemberList visable={barState.visable}>
          <MemberList num={num}></MemberList> 
        </Main__MemberList>
        <Main__CostList>
          <CostList num={num}></CostList>
        </Main__CostList>
      </Container>  

    </Total>
  )
}

export default Appointment;