import { useNavigate, Link } from "react-router-dom";

import styled from 'styled-components'; // styled in js
import UserInfo from '../userInfo/userInfo'; // 유저 정보 페이지
import AppointmentList from "../main/appointmentList";

import axios from 'axios';

const Total = styled.div`
  display: flex;
  flex-direction: row;
  /* background-color: #b7b6d6; */
`

const Main = styled.div`
  width: 80%;
`

const UserInfoDiv = styled.div`
width: 20%;
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
          <h1>메인입니다.</h1>
          <AppointmentList></AppointmentList>
          <input onClick={()=>{navigate('/appointment')}} type="button" value="약속 추가하기"/>
        </Main>
      </Total>
    </>
  )
}

export default Index;