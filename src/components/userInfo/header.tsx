/** 
 * 내 정보 페이지 - 헤더
 * 
 * */

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faUserFriends, faEnvelope } from "@fortawesome/free-solid-svg-icons"; 

//  import * as HeaderStyle from "../../styles/message/headerStyle";

function Header() {
  const navigate = useNavigate();

  return (
    <Header_>
      <img onClick={() => { navigate('/main') }} src='/image/logo_name.png' />

      <Header__Icon>
        <FontAwesomeIcon onClick={()=>{ navigate('/friend') }} icon={faUserFriends}/>
        <FontAwesomeIcon onClick={()=>{ navigate('/message') }} icon={faEnvelope}/>
      </Header__Icon>
    </Header_>
  )
}

const Header_ = styled.header`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
width: 100%;
height: 40px;
background-color: #322c58;
border-bottom: 1px solid #ffffff;
overflow: auto;

& > img {
  height: 80%;
  padding-left: 15px;
}

@media screen and (max-width: 768px) { 
  & > img {
    height: 60%;
  }
} 
`

/* 친구 & 쪽지 아이콘 */
const Header__Icon = styled.div`
display: flex;
flex-direction: row;
justify-content: flex-end;
width: 50px;
color: #bac7fb;
font-size: 1.7rem;
margin-right: 20px;
gap: 20px;

@media screen and (max-width: 768px) { 
  font-size: 1.4rem;
  margin-right: 10px;
  gap: 10px;
} 
`
 
  
export default Header;