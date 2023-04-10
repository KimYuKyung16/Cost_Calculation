/**
 * 메인 페이지
 * 
 */
import axios from 'axios';
import styled from 'styled-components';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { appointmentTestActions } from '../redux/modules/reducer/appointmentReducer';

import Header from '../components/main/calculateList/header'; // 헤더
import UserInfo from '../components/main/sideMenu/userInfo'; // 유저 정보 페이지
import CalculateList from "../components/main/calculateList/calculateList"; // 정산 리스트


function Index() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  /* 다른 페이지로 이동했을 경우: 리덕스 초기화 */
  useEffect(() => {
    return () => {
      dispatch(appointmentTestActions.setCaculateListNum(''));
      dispatch(appointmentTestActions.setCalculateName(''));
      dispatch(appointmentTestActions.setMemberCount(0));
      dispatch(appointmentTestActions.setInitialComplete({
        state: false,
        memberCount: 0,
        memberList: []
      }));
    }
  }, []);

  return(
    <Container>
      <ASide>
        <UserInfo></UserInfo>
      </ASide>

      <Main>
        <HeaderDiv>
          <Header></Header>
        </HeaderDiv>
        
        <CalculateListDiv>
          <CalculateList></CalculateList>
        </CalculateListDiv>

        <Main__Btn onClick={()=>{navigate('/appointment')}}>
          <p>일정 추가</p>
        </Main__Btn>
      </Main>
    </Container>
  )
}

const Container = styled.div`
display: flex;
flex-direction: row;
height: 100%;

@media screen and (max-width: 1023px) { 
  flex-direction: column;
}
`

const Main = styled.main`
box-sizing: border-box;
width: 80%;
padding: 2% 5%;
height: 100%;

@media screen and (max-width: 1023px) { 
  width: 100%;
  padding: 0;
}
`

const ASide = styled.aside`
width: 25%;
min-width: 300px;
height: 100%;
position: sticky;
top: 0;
z-index: 1;

@media screen and (max-width: 1023px) { 
  width: 100%;
}
`

const CalculateListDiv = styled.div`
height: 90%;
width: 100%;
padding-bottom: 20px;
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
width: 200px;
padding: 15px;
border-radius: 15px;
font-weight: 700;
font-size: 1.5rem;

bottom: 30px;
left: 75%;

box-shadow: 0px 0px 10px rgba(125, 125, 125, 0.8);

@media screen and (max-width: 768px) { 
  left: 50%; 
  transform: translateX(-40%);
  width: 50%;
  font-size: 1.1rem;
}
`

export default Index;