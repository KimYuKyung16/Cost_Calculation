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
import UsersSearch from './usersSearch';


const Container = styled.main`
  width: 100%;
  height: 100%;
`


function AddFriend() {

    return(
      <Container>
        <UsersSearch></UsersSearch>
      </Container>
    )
}

export default AddFriend;