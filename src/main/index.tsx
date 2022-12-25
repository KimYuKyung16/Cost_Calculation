import { useNavigate, Link } from "react-router-dom";

import styled from 'styled-components'; // styled in js
import UserInfo from '../userInfo/userInfo'; // 유저 정보 페이지

const Total = styled.div`
  display: flex;
  flex-direction: row;
`

const Main = styled.div`
  
`


function Index() {
  const navigate = useNavigate();


  return(
    <>
      <Total>
        <UserInfo></UserInfo>
        <Main>
          <h1>메인입니다.</h1>
          <input onClick={()=>{navigate('/appointment')}} type="button" value="약속 추가하기"/>
        </Main>
      </Total>
    </>
  )
}

export default Index;