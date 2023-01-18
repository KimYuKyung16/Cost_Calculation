import { AriaAttributes, DOMAttributes, useEffect, useRef, useState } from 'react';

import { useNavigate, Link, useParams } from "react-router-dom";

import { memberListActions } from '../redux/modules/reducer/memberListReducer'
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // 아이콘 사용 위해 필요
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'; // 제거 아이콘

import Layout_Header from './header';
import MemberList from './appointment_MembrList';
import CostList from './costList';

import axios from 'axios'; 
import styled from "styled-components"; // styled in js

const Header = styled.div`
height: 40px;
border-bottom: 1px solid white;
`

const Total = styled.div`
display: flex;
flex-direction: column;
width: 100%; 
/* height: 100%; */
background-color: aquamarine;
box-sizing: border-box;
`


const Container = styled.div`
display: flex;
flex-direction: row;
height: calc(100vh - 40px);
  /* width: 100vw; */
  /* height: 100vw; */
`

const Main__MemberList = styled.div`
  width: 30%;
  height: 100%;
  background-color: aqua;

/* 모바일, 타블렛 기준 */
@media screen and (max-width: 1023px) { 
  display: none;
}
`

const Main__CostList = styled.div`
width: 70%;
`

function Appointment() {
  axios.defaults.withCredentials = true; // 요청, 응답에 쿠키를 포함하기 위해 필요
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  let params = useParams();
  let num: string|undefined = params.num;
  console.log(typeof(params.num)); // 리스트 번호
  console.log(num);


  return(
    <Total>
      <Header><Layout_Header num={num}></Layout_Header></Header>
      <Container>
        <Main__MemberList><MemberList num={num}></MemberList> </Main__MemberList>
        <Main__CostList><CostList num={num}></CostList></Main__CostList>
      </Container>  
    </Total>
  )
}

export default Appointment;