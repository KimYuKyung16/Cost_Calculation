import styled from "styled-components";

import Header from "../components/message/header";
import List from "../components/message/messageList";


function Message() {
  return (
    <Container>
      <Header/>
      <List />
    </Container>
  )
}

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 100vw;
height: 100vh;
background-color: #322c58;
padding: 0 auto;
`


export default Message;