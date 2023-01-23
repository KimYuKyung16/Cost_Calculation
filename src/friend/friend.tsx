import { useEffect, useRef, useState } from 'react';

import { useNavigate, Link, useParams } from "react-router-dom";

import { costActions } from '../redux/modules/reducer/costReducer'
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // 아이콘 사용 위해 필요
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'; // 제거 아이콘

import axios from 'axios'; 
import styled from "styled-components"; // styled in js

import Layout_Header from './header';
import FriendList from './friendList';
import AddFriend from './addFriend';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* height: 100vh; */
`

const Header = styled.header`
height: 40px;
border-bottom: 1px solid white;

/* 모바일, 타블렛 기준 */
@media screen and (max-width: 1023px) { 
  z-index: 1;
}
`

const Main = styled.main`
  width: 100%;
  height: calc(100vh - 41px);
  padding: 0;
  position: relative;
`

const Main__FriendList = styled.div`
  width: 100%;
  height: calc(100vh - 41px);
  padding: 0;
`

const Main__AddFriend = styled.div`
  width: 100%;
  height: 100vh;
  padding: 0;
  position: absolute;
  bottom: 0;
  background-color: #663d3d;
  z-index: 1;


`


function Friend() {

    return(
      <Container>
        <Header>
          <Layout_Header></Layout_Header>
        </Header>
        <Main>
          <Main__AddFriend>
            <AddFriend></AddFriend>
          </Main__AddFriend>
          <Main__FriendList>
            <FriendList></FriendList>
          </Main__FriendList>
        </Main>
      </Container>
    )
}

export default Friend;