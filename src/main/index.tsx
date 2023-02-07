import { useNavigate, Link } from "react-router-dom";

import styled from 'styled-components'; // styled in js

import Header from './header';
import UserInfo from '../userInfo/userInfo'; // 유저 정보 페이지
import AppointmentList from "../main/appointmentList";

import axios from 'axios';

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
height: 100vh;

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
background-color: antiquewhite;
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
  /* background-color: beige; */
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
          <Header></Header>
          <AppointmentListDiv><AppointmentList></AppointmentList></AppointmentListDiv>
        </Main>
      </Total>
    </>
  )
}

export default Index;