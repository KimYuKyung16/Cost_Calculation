import { useEffect, useRef, useState } from 'react';

import { useNavigate, Link, useParams } from "react-router-dom";

import { friendListActions } from '../../redux/modules/reducer/friendReducer'
import { userListActions, receivingListActions } from '../../redux/modules/reducer/userListReducer'
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // 아이콘 사용 위해 필요
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'; // 제거 아이콘

import axios from 'axios'; 
import styled from "styled-components"; // styled in js

import Layout_Header from './header';
import FriendList from './friendList';
import UsersSearch from './usersSearch';


function ReceivingFriendList() {
  axios.defaults.withCredentials = true; // 요청, 응답에 쿠키를 포함하기 위해 필요
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const receivingList = useAppSelector((state  => state.receivingList));

  function receivingListUp() { // 친구 신청 받은 거 리스트 가져오기
    axios.get('http://localhost:6001/receivingList')
    .then(function (response) { 
      console.log(response.data);
      dispatch(receivingListActions.setInitialReceivingList(response.data))
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  function accept(list: {}) {
    axios.post('http://localhost:6001/receivingList/accept', {
      list: list
    })
    .then(function (response) { 
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  const component_change = () => {
    console.log(receivingList)
    if (receivingList.length) {
      return(
        <Main__List>
          <tbody>
            {
              receivingList.map((x, index) => {
                return(
                  <tr key={index}>
                    <td><Profile src={x.profile}/>{x.nickname}</td>
                    <td><input onClick={()=>{accept(x);}} type="button" value="수락"/></td>
                    <td><input type="button" value="거절"/></td>
                  </tr>
                )
              })
            }
          </tbody>
        </Main__List>
      )
    } else {
      return (
        <Main__List_None>
          <h3>친구 신청이 없습니다.</h3>
        </Main__List_None>
      )
    }
  }

  useEffect(() => { receivingListUp(); }, [])
  useEffect(() => { component_change(); }, [receivingList])

    return(
      <Container>
        {component_change()}
      </Container>
    )
}

const Container = styled.main`
width: 100%;
height: 100%;
background-color: #322c5a;
padding: 10px 0;
`

/* 친구 신청 받은 리스트 */
const Main__List = styled.table`
width: 100%;
height: 100%;
border-spacing: 0px;
border-collapse: separate;
font-weight: bold;
background-color: #322c58;
color: #4f4f4f;

& tr {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  background-color: #b3b9d3;
  padding: 5px;
  border-radius: 8px;
}

& td:nth-child(1) { // 프로필 & 이름
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 1.2rem;
}

& td:nth-child(2), td:nth-child(3) { // 친구 수락, 거절 버튼
  width: auto;

  & > input {
    background-color: #9d9d9d;
    border: 1px solid #bfbfbf;
    color: #ffffff;
    font-weight: 500;
    padding: 3px 15px;
    font-size: 1.3rem;
    border-radius: 8px;
    margin-left: 5px;
  }
}

& td:nth-child(3) { // 친구 거절 버튼
  & > input {
    background-color: #ff6b6b;
    color: #ffffff;
  }
}

@media screen and (max-width: 768px) { 
  & td:nth-child(2), td:nth-child(3) { // 친구 수락 버튼
    & > input {
      padding: 3px 10px;
      font-size: 1.2rem;
    }
  }
} 
`

/* 친구 신청이 없을 경우 */
const Main__List_None = styled.div`
width: 100%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;

& h3 {
  color: #b5b8d5;
  font-size: 1.2rem;
  margin-bottom: 70px;
}
`

const Profile = styled.img`
width: 50px;
height: 50px;
border-radius: 70px;
border: 1px solid #bfbfbf;
margin-right: 3px;

@media screen and (max-width: 768px) { 
  width: 45px;
  height: 45px;
} 
`


export default ReceivingFriendList;