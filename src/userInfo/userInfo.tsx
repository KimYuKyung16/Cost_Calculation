import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import styled from "styled-components"; // styled in js
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // 아이콘 사용 위해 필요
import { faUserFriends, faEnvelope, faBars } from '@fortawesome/free-solid-svg-icons'; 

import { appointmentListTypeActions } from '../redux/modules/reducer/appointmentListReducer'
import { userInfoActions } from '../redux/modules/reducer/userInfoReducer';
import { useAppSelector, useAppDispatch } from '../redux/hooks' // 커스텀된 useSelector, useDispatch

import AppointmentListType from './appointmentListType';

import MiniUserInfo from '../main/mini_userInfo';

const Main = styled.div`
display: flex;
flex-direction: column;
align-items: center;
background-color: #322c58;
width: 100%;
height: 100vh;

& > h1 {
display: none; // 화면 클 때는 햄버거바 안보임.
color: #bac7fb;
font-size: 1.5em;
padding: 0 10px;
}

/* 모바일, 타블렛 기준 */
@media screen and (max-width: 1023px) { 
  height: 60px;
  flex-direction: row;

  & > h1 {
    display: block; // 화면 작을 때는 햄버거바 보임.
  }
}
`

const Main__Friend_Message = styled.div`
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

/* 모바일, 타블렛 기준 */
@media screen and (max-width: 1023px) { 
  display: none;
}
`


interface UserInfo_Props {
  visible: string | undefined;
}


const MiniUserInfoDiv = styled.div`
  display: none;
  position: absolute;
  top: 53px;
  left: 5px;
  z-index: 30;
  background-color: #e0e0e0;
  width: 200px;
  border: 1px solid #5b5b5b;

  box-shadow: 0 5px 20px rgba(206, 206, 206, 0.8);
  border-radius: 10px;

/* 모바일, 타블렛 기준 */
@media screen and (max-width: 1023px) { 
  display: ${(props: UserInfo_Props) => props.visible };
}
`

const Main__Profile = styled.div`
  display: flex;
flex-direction: row;
width: 200px;
/* background-color: antiquewhite; */

/* 모바일, 타블렛 기준 */
@media screen and (max-width: 1023px) { 
  flex-direction: column;
position: relative;
}
`




const Main__Profile_Image = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100%;
height: 35%;
max-width: 250px;

  & div {
    width: 90%;
    position: relative;
    border-radius: 70%;
    background-color: #ffffff;
    padding-top: 90%;

    & img {
      width: 100%;
      height: 100%;
      border-radius: 70%;
      padding-top: 0%;
      position: absolute;
      top: 0;
      outline: 5px solid white;
    } 
  }

  & p { // 사용자 닉네임
    color: #b7b6d6;
    font-size: 1.3em;
    font-weight: bold;
  }

/* 모바일, 타블렛 기준 */
@media screen and (max-width: 1023px) { 
  /* flex-direction: row; */
  min-width: 40px;
  max-width: 40px;
  padding: 10px;

  & div {
    & img {
      outline: 2px solid #d3d3d3;
    }
  }
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

/* 모바일, 타블렛 기준 */
@media screen and (max-width: 1023px) { 
  display: none;
}
`

function UserInfo() {
  axios.defaults.withCredentials = true; // withCredentials 전역 설정
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state  => state.userInfo));

  const nickname = userInfo.nickname;
  const profile = userInfo.profile; 

  let [userInfoVisible, setUserInfoVisible] = useState('none');
  

  const profileMouseClick = () => {
    if (userInfoVisible === 'none') setUserInfoVisible('block');
    else setUserInfoVisible('none');
  }

  return(
    <>
      <Main>
        {/* <h1><FontAwesomeIcon icon={faBars}/></h1> */}

        <Main__Friend_Message>
          <FontAwesomeIcon onClick={()=>{navigate('/friend')}} icon={faUserFriends}/>
          <FontAwesomeIcon icon={faEnvelope}/>
        </Main__Friend_Message>

        <Main__Profile>
          <Main__Profile_Image>
            <div><img src={profile} onClick={profileMouseClick}/></div>
          </Main__Profile_Image>
          <MiniUserInfoDiv visible={userInfoVisible}>
            <MiniUserInfo></MiniUserInfo>
          </MiniUserInfoDiv>
        </Main__Profile>
      
        <Main__InfoButton>
          <input onClick={()=>{navigate('/userinfo')}} type="button" value="내 정보"/>
          <input onClick={()=>{navigate('/userinfo/modify')}} type="button" value="프로필 수정"/>
        </Main__InfoButton>

        <AppointmentListType /> {/* 약속 리스트 종류 출력 */}
        
      </Main>
    </>
  )
}

export default UserInfo;