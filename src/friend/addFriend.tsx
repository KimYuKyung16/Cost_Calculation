import { useEffect, useRef, useState } from 'react';

import { useNavigate, Link, useParams } from "react-router-dom";

import { costActions } from '../redux/modules/reducer/costReducer'
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // 아이콘 사용 위해 필요
import { faTimesSquare } from '@fortawesome/free-solid-svg-icons'; // 제거 아이콘

import styled from "styled-components"; // styled in js

import UsersSearch from './usersSearch';
import ReceivingFriendList from './receivingFriendList';


const Container = styled.main`
display: flex;
flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #9c815d;

  & p:nth-child(1) {
    color: #000000;
    text-align: right;
    margin: 0;
    /* background-color: aqua; */
    font-size: 1.2rem;
    padding: 5px 5px 5px 0;
  }
`

function AddFriend() {

    return(
      <Container>
        <UsersSearch />
        <ReceivingFriendList />
      </Container>
    )
}

export default AddFriend;