import styled from "styled-components";
import Header from "../components/userInfo/header";
import Profile from "../components/userInfo/profile";
import CalculateList from "../components/userInfo/calculateList";

function UserInfo() {
  return (
    <Container>
      <Header />
      <Main>
        <Profile />
        <CalculateList />
      </Main>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: #322c58;
`;

const Main = styled.main`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: auto;
  background-color: #322c58;
  max-width: 1000px;

  @media screen and (max-width: 1023px) {
    flex-direction: column;
    align-items: center;
  }
`;

export default UserInfo;
