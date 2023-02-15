import { useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";

import styled from "styled-components"; // styled in js
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // 아이콘 사용 위해 필요
import { faUserFriends, faEnvelope, faBars } from '@fortawesome/free-solid-svg-icons'; 

import { appointmentListTypeActions } from '../../redux/modules/reducer/appointmentListReducer'
import { userInfoActions } from '../../redux/modules/reducer/userInfoReducer';
import { useAppSelector, useAppDispatch } from '../../redux/hooks' // 커스텀된 useSelector, useDispatch

import "../../static/fonts/font.css"

const Profile = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 70%;
  border: 1.5px solid #7a7a7a;
`

const Main = styled.ul`
  /* background-color: #706eae; */
  padding: 0;
  list-style: none;
  text-align: center;

  & > li:nth-child(n+3) {
    text-align: left;
    padding: 10px;
    font-weight: 500;
    color: #535353;
    font-family: "NotoSans"
  }

  & > li:nth-child(n+3):hover { // 3번째부터 끝까지
    background-color: #44466b;
    cursor: pointer;
    font-weight: bold;
    color: white;
  }
`


function MiniUserInfo() {
  axios.defaults.withCredentials = true; // withCredentials 전역 설정
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state  => state.userInfo));

  const nickname = userInfo.nickname;
  const profile = userInfo.profile; 
  

  return(
    <>
      <Main>
        <li><Profile src={profile}/></li>
        <li>{nickname}</li>
        <hr />
        <li onClick={()=>{navigate('/friend')}}><FontAwesomeIcon icon={faUserFriends}/> 친구목록</li>
        <li><FontAwesomeIcon icon={faEnvelope}/> 메세지</li>
        <hr />
        <li onClick={()=>{navigate('/userinfo')}}>내 정보</li>
        <li onClick={()=>{navigate('/userinfo/modify')}}>프로필 수정</li>
      </Main>
    </>
  )
}

export default MiniUserInfo;