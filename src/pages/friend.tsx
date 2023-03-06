import { useEffect, useRef, useState } from 'react';

import { useNavigate, Link, useParams } from "react-router-dom";

import { costActions } from '../redux/modules/reducer/costReducer'
import { friendVisibleActions } from '../redux/modules/reducer/barReducer'
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import axios from 'axios'; 
import styled from "styled-components"; // styled in js

import Layout_Header from '../components/friend/header';
import FriendList from '../components/friend/friendList';
import AddFriend from '../components/friend/addFriend';


function Friend() {
  axios.defaults.withCredentials = true; // 요청, 응답에 쿠키를 포함하기 위해 필요
  const dispatch = useAppDispatch();

  const friendVisibleState = useAppSelector(state => state.friendVisible);

  const otherRef:any = useRef(); 

  useEffect(() => {
    function handleOutsideClick(e: any) {
      if (otherRef.current && otherRef.current.contains(e.target)) {
        dispatch(friendVisibleActions.setVisible('none'));
      }
    }

    // Component rendering 후 이벤트 등록
    document.addEventListener('click', handleOutsideClick, true);
    // Component 제거 시 이벤트 제거
    return () => {
      document.removeEventListener('click', handleOutsideClick, true);
    };
  }, [otherRef]);

  return(
    <Container>

      <BlackContainer ref={otherRef}>
        <Black visible={friendVisibleState.visible}></Black>
      </BlackContainer>

      <Header>
        <Layout_Header></Layout_Header>
      </Header>

      <Main>
        <Main__AddFriend visible={friendVisibleState.visible}>
          <AddFriend></AddFriend>
        </Main__AddFriend>
        <Main__FriendList>
          <FriendList></FriendList>
        </Main__FriendList>
      </Main>

    </Container>
  )
}

const Container = styled.div`
display: flex;
flex-direction: column;
height: 100vh;
overflow: hidden;
`

/* 헤더 */
const Header = styled.header`
height: 40px;
border-bottom: 1px solid white;

@media screen and (max-width: 768px) { 
  /* z-index: 1; */
}
`

const Main = styled.main`
display: flex;
flex-direction: row;
width: 100%;
height: calc(100vh - 41px);
padding: 0;
position: relative;
overflow: none;

@media screen and (max-width: 768px) { 
  display: block;
}
`

interface AddFriend_Props {
  visible: string | undefined;
}

const Main__AddFriend = styled.div`
box-sizing: border-box;
width: 40%;
height: 100%;
padding: 0;
bottom: 0px;
background-color: #9a9a9a;
/* z-index: 2; */
border: 1px solid black;

@media screen and (max-width: 768px) { 
  width: 100%;
  height: 90%;
  position: absolute;
  transform: ${(props: AddFriend_Props) => props.visible === 'block' ? 'translateY(-0%)' : 'translateY(100%)' };
  transition: ${(props: AddFriend_Props) => props.visible === 'block' ? 'transform 0.5s ease-out' : 'transform 0.5s ease-in'};
  z-index: 2;
}
`

const Main__FriendList = styled.div`
box-sizing: border-box;
width: 60%;
height: calc(100vh - 41px);
padding: 1% 2%;
z-index: 0;

@media screen and (max-width: 768px) { 
  width: 100%;
  padding: 0;
}
`

const BlackContainer = styled.div`
`

const Black = styled.div`
width: 100%;
height: 100%;
background-color: black;
position: absolute;
display: none;

@media screen and (max-width: 768px) { 
  display: ${(props: AddFriend_Props) => props.visible};
  opacity: ${(props: AddFriend_Props) => props.visible === 'block' ? '80%' : '0%' };
  z-index: 1;
}
`

export default Friend;