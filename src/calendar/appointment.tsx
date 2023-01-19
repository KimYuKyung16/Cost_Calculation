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
background-color: aquamarine;
box-sizing: border-box;
`


const Container = styled.div`
display: flex;
flex-direction: row;
height: calc(100% - 40px);
position: relative;
`

const appear = keyframes`
0% {
  transform: translateX(-150%);
}

100% {
  transform: translateX(0%);
}
`

const disappear = keyframes`
0% {
  transform: translateX(0%);
}
100% {
  transform: translateX(-150%);
}
`

const default_disappear = keyframes`
0% {
  transform: translateX(-150%);
}
100% {
  transform: translateX(-150%);
}
`



const opacity = keyframes` // 불투명하게
0% {
  opacity: 0%;
}
100% {
  opacity: 50%;
}
`

const transparency = keyframes` // 투명하게
0% {
  opacity: 50%;
}
100% {
  opacity: 0%;
}
`



interface MemberList_Props {
  visable: Keyframes | undefined;
}

interface Black_Props {
  visable: string | undefined;
}

const Main__MemberList = styled.div`
  width: 30%;
  height: 100%;
  background-color: aqua;

/* 모바일, 타블렛 기준 */
@media screen and (max-width: 1023px) { 
  /* display:  */
  position: absolute;
  top: 0;
  width: 70%;
  animation: ${(props: MemberList_Props) => props.visable} 1s ease-out forwards;
  z-index: 1;
}
`


const Main__CostList = styled.div`
height: 100%;
width: 70%;

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
display: block;
/* transform: translateX(-150%); */
z-index: 1;
animation: ${(props: Black_Props) => props.visable === 'block' ? opacity : transparency} 1s ease-out forwards;
}
`

function Appointment() {
  axios.defaults.withCredentials = true; // 요청, 응답에 쿠키를 포함하기 위해 필요
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  let params = useParams();
  let num: string|undefined = params.num;

  let barState = useAppSelector(state => state.barState);
  // let [screenOpacity, setScreenOpacity] = useState<Keyframes>(); 
  let [visable, setVisable] = useState<Keyframes>();

  // const ResizedComponent = () => {
  //   const [windowSize, setWindowSize] = useState(
  //     window.innerWidth,
  //   );
   
  //   const handleResize = () => {
  //     setWindowSize(window.innerWidth);
  //   }
   
  //   useEffect(() => {
  //     window.addEventListener('resize', handleResize);
  //     return () => { // cleanup 
  //       window.removeEventListener('resize', handleResize);
  //     }
  //   }, []);

  // }


  const appearAnimation = () => {
    if (barState.visable === 'none') {
      setVisable(disappear);
      // setScreenOpacity(transparency);
    } else {
      setVisable(appear);
      // setScreenOpacity(opacity);
    } 
  }


  useEffect(() => {
    appearAnimation();
  }, [barState])




  return(
    <Total>

      <BlackContainer>
        <Black visable={barState.visable}></Black>
      </BlackContainer>

      <Header>
        <Layout_Header num={num}></Layout_Header>
      </Header>

      <Container>
        <Main__MemberList visable={visable} >
          <MemberList num={num}></MemberList> 
        </Main__MemberList>
        <Main__CostList>
          {/* <CostList num={num}></CostList> */}
        </Main__CostList>
      </Container>  

    </Total>
  )
}

export default Appointment;