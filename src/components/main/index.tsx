import { useNavigate, Link } from "react-router-dom";

import styled from 'styled-components'; // styled in js

import Header from './header';
import UserInfo from '../userInfo/userInfo'; // 유저 정보 페이지
import AppointmentList from "./appointmentList";

import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // 아이콘 사용 위해 필요
import { faPlus, faPlusCircle } from '@fortawesome/free-solid-svg-icons'; // 제거 아이콘
 
const Total = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;

/* 모바일, 타블렛 기준 */
@media screen and (max-width: 1023px) { 
  flex-direction: column;
}
`

const Main = styled.div`
box-sizing: border-box;
width: 80%;
padding: 2% 5%;
height: 100%;

/* 모바일, 타블렛 기준 */
@media screen and (max-width: 1023px) { 
  width: 100%;
  padding: 0;
}
`

const UserInfoDiv = styled.div`
width: 25%;
min-width: 300px;
height: 100%;
position: sticky;
top: 0;
z-index: 1;

/* 모바일, 타블렛 기준 */
@media screen and (max-width: 1023px) { 
  width: 100%;
}
`

const AppointmentListDiv = styled.div`
  height: 90%;
  width: 100%;
  padding-bottom: 20px;
  /* background-color: beige; */
`

const HeaderDiv = styled.div`
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;

@media screen and (max-width: 1023px) { 
  position: static;
}
`


const Main__Btn = styled.div`
display: flex;
justify-content: center;
align-items: center;
position: sticky;
background-color: #322c59;
color: #ffffff;
width: 20%;
height: 50px;
font-size: 1em;
border-radius: 15px;
border: 3px solid #6e6e6e;
font-weight: bold;

bottom: 30px;
left: 90%;
box-shadow: 0px 0px 10px rgba(125, 125, 125, 0.8);

@media screen and (max-width: 1023px) { 
  /* position: static; */
  bottom: 30px;
  left: 40%;
}
`

function Index() {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true; // 요청, 응답에 쿠키를 포함하기 위해 필요


  return(
    <>
      <Total>
        <UserInfoDiv>
          <UserInfo></UserInfo>
        </UserInfoDiv>

        <Main>
          <HeaderDiv>
            <Header></Header>
          </HeaderDiv>
          
          <AppointmentListDiv>
            <AppointmentList></AppointmentList>
          </AppointmentListDiv>

          <Main__Btn onClick={()=>{navigate('/appointment')}}>
            <p><FontAwesomeIcon  icon={faPlusCircle}/> 일정 추가</p>
          </Main__Btn>
    
        </Main>
      </Total>
    </>
  )
}

export default Index;