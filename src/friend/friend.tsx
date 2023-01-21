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

const Header = styled.header`
height: 40px;
border-bottom: 1px solid white;

/* 모바일, 타블렛 기준 */
@media screen and (max-width: 1023px) { 
  z-index: 1;
}
`

function Friend() {

    return(
      <>
        <Header>
          <Layout_Header></Layout_Header>
        </Header>
        <FriendList></FriendList>
      </>
    )
}

export default Friend;