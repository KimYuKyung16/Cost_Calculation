import { useEffect, useRef, useState } from 'react';
import styled from "styled-components"; // styled in js

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
background-color: #322c58;
width: 100vw;
height: 100vh;
padding: 0 auto;
`


export default Message;