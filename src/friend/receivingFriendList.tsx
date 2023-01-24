import { useEffect, useRef, useState } from 'react';

import { useNavigate, Link, useParams } from "react-router-dom";

import { userListActions, receivingListActions } from '../redux/modules/reducer/userListReducer'
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
      // console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
  }



  useEffect(() => { receivingListUp(); }, [])

    return(
      <Container>
        <div>
          <h2>친구 신청 온 거 리스트</h2>
          <table>
              <tbody>
                {
                  receivingList.map((x, index) => {
                    return(
                      <tr key={index}>
                        <td>보낸 사람: {x.sender}</td>
                        {/* <td>상태: {x.state}</td> */}
                        <input onClick={()=>{accept(x);}} type="button" value="수락"/>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
        </div>
      </Container>
    )
}

export default ReceivingFriendList;