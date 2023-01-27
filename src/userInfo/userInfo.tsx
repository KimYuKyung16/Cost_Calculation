import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import styled from "styled-components"; // styled in js
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // 아이콘 사용 위해 필요
import { faUserFriends, faEnvelope } from '@fortawesome/free-solid-svg-icons'; 

import { appointmentListTypeActions } from '../redux/modules/reducer/appointmentListReducer'
import { userInfoActions } from '../redux/modules/reducer/userInfoReducer';
import { useAppSelector, useAppDispatch } from '../redux/hooks' // 커스텀된 useSelector, useDispatch

const Main = styled.div`
background-color: #322c58;
width: 100%;
height: 100vh;
`

const Main__Friend_Message = styled.div`
/* background-color: aliceblue; */
text-align: right;
padding: 20px 20px 0 0;
box-sizing: border-box;

& {
  color: #bac7fb;
  font-size: 1.3em;
}

& :nth-child(1) {
  padding-right: 10px;
}
`


const Main__Profile = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-end;
align-items: center;
/* text-align: center; */
width: 100%;
height: 35%;

  & img { // 사용자 프로필 사진
    width: 200px;
    height: 200px;
    border-radius: 70%;
    outline: 5px solid white;
  }

  & p { // 사용자 닉네임
    color: #b7b6d6;
    font-size: 1.5rem;
    font-weight: bold;
  }
`

const Main__InfoButton = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
/* background-color: aqua; */
width: 100%;
height: 5%;

& input {
  background-color: #322c58;
  border: 3px solid #bac7fb;
  width: 30%;
  color: #bac7fb;
  font-weight: bold;
  cursor: pointer;
  border-radius: 20px;
  margin: 0 5px;
}
`
interface Type_Props {
  type: number | undefined;
}

const Main__List = styled.div`
display: flex;
flex-direction: column;
/* align-items: center; */
justify-content: center;
width: 100%;
height: 40%;
/* background-color: #6b0285; */

& ul {
  /* list-style:none; */
  display: flex;
  flex-direction: column;
  /* background-color: #bf8b46; */
  height: 100%;
  /* align-items: center; */
  /* justify-content: space-around; */
  padding-left: 0;

  & li {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: #b7b6d6;
    font-weight: bold;
    font-size: 20px;
    /* background-color: #b4b4b4; */
    /* padding: 10px; */
    height: 15%;
    padding: 5px 20px;
    cursor: pointer;
  }

  & li:nth-child(${(props: Type_Props) => props.type}) {
    background-color : #44466b;
    color : white;
  }

  & li:hover{  
    background-color : #44466b;
    color : white;
  }
}
`


function UserInfo() {
  axios.defaults.withCredentials = true; // withCredentials 전역 설정
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state  => state.userInfo));
  const appointmentListType = useAppSelector(state => state.appoinmentListType);

  const nickname = userInfo.nickname;
  const profile = userInfo.profile; 
  

  const clickAppointmentType1 = () => {
    dispatch(appointmentListTypeActions.setInitialAppointmentListType(1));
  }

  const clickAppointmentType2 = () => {
    dispatch(appointmentListTypeActions.setInitialAppointmentListType(2));
  }

  const clickAppointmentType3 = () => {
    dispatch(appointmentListTypeActions.setInitialAppointmentListType(3));
  }

  const clickAppointmentType4 = () => {
    dispatch(appointmentListTypeActions.setInitialAppointmentListType(4));
  }



  return(
    <>
      <Main>

        <Main__Friend_Message>
          <FontAwesomeIcon icon={faUserFriends}/>
          <FontAwesomeIcon icon={faEnvelope}/>
        </Main__Friend_Message>

        <Main__Profile>
          <img src={profile} />
          <p>'{nickname}' 님</p>
        </Main__Profile>

        <Main__InfoButton>
          <input onClick={()=>{navigate('/userinfo')}} type="button" value="내 정보"/>
          <input onClick={()=>{navigate('/userinfo/modify')}} type="button" value="프로필 수정"/>
        </Main__InfoButton>
        <Main__List type={appointmentListType.type}>
          <ul>
            <li onClick={clickAppointmentType1}><p># 전체 약속</p><p>0</p></li>
            <li onClick={clickAppointmentType2}><p># 정산중인 약속</p><p>0</p></li>
            <li onClick={clickAppointmentType3}><p># 정산 완료된 약속</p><p>0</p></li>
            <li onClick={clickAppointmentType4}><p># 즐겨찾기 약속</p><p>0</p></li>
          </ul>
        </Main__List>

        <div>
          <h2>친구목록</h2>
          <input onClick={()=>{navigate('/friend')}} type="button" value="친구목록 수정하기"/>
        </div>

      </Main>
    </>
  )
}

export default UserInfo;