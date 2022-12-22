import styled from 'styled-components'; // styled in js
import UserInfo from '../userInfo/userInfo'; // 유저 정보 페이지

const Total = styled.div`
  display: flex;
  flex-direction: row;
`

const Main = styled.div`
  
`


function Index() {



  return(
    <>
      <Total>
        <UserInfo></UserInfo>
        <Main>
          <h1>메인입니다.</h1>
        </Main>
      </Total>
    </>
  )
}

export default Index;