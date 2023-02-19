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


const Container = styled.main`
  width: 100%;
  height: 100%;
  background-color: #322c5a;
  padding: 10px 0;

  & div {
    height: 100%;
  }
`

const Profile = styled.img`
  /* width: 50px;
  height: 50px;
  border-radius: 70%; */
`
const Main__List = styled.table`
  width: 100%;
  height: 100%;
  border-spacing: 0px;
  border-collapse: separate;
  font-size: 1em;
  font-weight: bold;
  /* box-sizing: border-box; */
  color: #4f4f4f;
  background-color: #322c58;

  & tr {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #b3b9d3;
    width: 100%;
    height: 70px;
    padding: 0.5em;
    box-sizing: border-box;

    & > input {
      background-color: #ecd876;
      border: 1px solid #6a6a6a;
      color: #322c58;
      height: 50%;
      width: 10%;
      min-width: 70px;
    }
  }

  & td:nth-child(1) {
    display: flex;
    align-items: center;
    width: 100%;
    /* background-color: aliceblue; */

    & div {
      width: 10%;
      height: 50px;
      /* padding-bottom: 10%; */
      position: relative;
      border-radius: 70%;
      margin: 0 0.5rem;

      max-height: 50px;
      max-width: 50px;
      background-color: #a34747;

      & img {
        width: 100%;
        height: 100%;
        border-radius: 70%;
        padding-top: 0%;
        position: absolute;
        top: 0;
        border: 1px solid #bfbfbf;
      } 
    }
  }

  & td:nth-child(2) {
    /* visibility: hidden; */
    padding: 0 20px;
    color: #a34747;
    /* background-color: aqua; */
  }
`

const Main__List_None = styled.div`
width: 100%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;

& h3 {
color: #b5b8d5;
font-size: 1em;
margin-bottom: 30%;
}
`


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
                    <td>
                      <div><Profile src={x.profile}/></div>
                      {x.nickname}
                    </td>
                    <input onClick={()=>{accept(x);}} type="button" value="수락"/>
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
        {/* <div> */}
          {component_change()}
        {/* </div> */}
      </Container>
    )
}

export default ReceivingFriendList;