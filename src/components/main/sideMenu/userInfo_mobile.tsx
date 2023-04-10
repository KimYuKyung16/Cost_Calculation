import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "../../../redux/hooks";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // 아이콘 사용 위해 필요
import { faUserFriends, faEnvelope } from "@fortawesome/free-solid-svg-icons"; 
import * as UserInfoMobileStyle from "../../../styles/main/userInfoMobileStyle"; 
import "../../../static/fonts/font.css"; // 폰트 정보

function MiniUserInfo() {
  const navigate = useNavigate();
  const userInfo = useAppSelector((state  => state.userInfo));
  const nickname = userInfo.nickname;
  const profile = userInfo.profile; 

  return(
      <UserInfoMobileStyle.Container>
        <li><UserInfoMobileStyle.Profile src={profile}/></li>
        <li><span>'{nickname}'</span> 님</li>
        <hr />
        <li onClick={()=>{navigate('/friend')}}><FontAwesomeIcon icon={faUserFriends}/> 친구목록</li>
        <li onClick={()=>{navigate('/message')}}><FontAwesomeIcon icon={faEnvelope}/> 쪽지</li>
        <hr />
        <li onClick={()=>{navigate('/userinfo')}}>내 정보</li>
        <li onClick={()=>{navigate('/userinfo/modify')}}>프로필 수정</li>
      </UserInfoMobileStyle.Container>
  )
}


export default MiniUserInfo;