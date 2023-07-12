import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // 아이콘 사용 위해 필요
import { faUserFriends, faEnvelope } from "@fortawesome/free-solid-svg-icons"; 

function Title() {
  const navigate = useNavigate();
  const userInfo = useAppSelector((state  => state.userInfo));
  const nickname = userInfo.nickname;
  const profile = userInfo.profile; 

  const memberList = useAppSelector(state => state.memberList);

  return(
    <>
      <h1>테스트</h1>
    </>
  )
}


export default Title;