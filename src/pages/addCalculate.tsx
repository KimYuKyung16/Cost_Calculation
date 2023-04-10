/**
 * 일정 추가
 * 
 */
import styled from "styled-components"; // styled in js

import Header from "../components/addCalculate/header";
import Info from "../components/addCalculate/info"; // 일정 정보
import MemberList from "../components/addCalculate/memberList"; // 추가된 멤버 리스트

function AddCalculate() {

  return(
    <>
      <Header/>
      <Main>
        <Info/>
        <MemberList/>
      </Main>
    </>
  );
}

const Main = styled.main`
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
background-color: #322c58;
`

export default AddCalculate;