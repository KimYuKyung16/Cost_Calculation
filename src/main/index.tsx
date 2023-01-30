import { useNavigate, Link } from "react-router-dom";

import styled from 'styled-components'; // styled in js
import UserInfo from '../userInfo/userInfo'; // 유저 정보 페이지
import AppointmentList from "../main/appointmentList";

import axios from 'axios';

const Total = styled.div`
  display: flex;
  flex-direction: row;

/* 모바일, 타블렛 기준 */
@media screen and (max-width: 1023px) { 
  flex-direction: column;
}
`

const Main = styled.div`
box-sizing: border-box;
  width: 80%;
  padding: 2% 10%;

/* 모바일, 타블렛 기준 */
@media screen and (max-width: 1023px) { 
  width: 100%;
  padding: 0;
}
`

const UserInfoDiv = styled.div`
width: 20%;
min-width: 300px;

/* 모바일, 타블렛 기준 */
@media screen and (max-width: 1023px) { 
  width: 100%;
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
          <AppointmentList></AppointmentList>
          <input onClick={()=>{navigate('/appointment')}} type="button" value="약속 추가하기"/>
        </Main>
      </Total>
    </>
  )
}

export default Index;