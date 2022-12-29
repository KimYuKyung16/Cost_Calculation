import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import styled from "styled-components"; // styled in js
import axios from 'axios';

import { userInfoActions } from '../redux/modules/reducer/userInfoReducer'
import { useAppSelector, useAppDispatch } from '../redux/hooks' // 커스텀된 useSelector, useDispatch

const Main = styled.div`
background-color: #6549b9;
width: 100%;
height: 100vh;
`

const Profile = styled.img` // 사용자 프로필 사진
width: 100px;
/* height: 100px; */
`;

const Name = styled.p`
color: yellow;
`

function UserInfo() {
  axios.defaults.withCredentials = true; // withCredentials 전역 설정
  const navigate = useNavigate();
  const userInfo = useAppSelector((state  => state.userInfo));

  const nickname = userInfo.nickname;
  const profile = userInfo.profile; 


  return(
    <>
      <Main>
        <Profile src={profile} />
        <Name>'{nickname}' 님</Name>
        <input onClick={()=>{navigate('/userInfo')}} type="button" value="내 정보"/>
        <input type="button" value="프로필 수정"/>
        <ul>
          <li>전체 약속</li>
          <li>정산중인 약속</li>
          <li>정산 완료된 약속</li>
          <li>즐겨찾기 약속</li>
        </ul>

        <div>
          <h2>친구목록</h2>
          <input onClick={()=>{navigate('/modifiedFriend')}}type="button" value="친구목록 수정하기"/>
        </div>

      </Main>
    </>
  )
}

export default UserInfo;