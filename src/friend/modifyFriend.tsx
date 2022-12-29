import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import styled from "styled-components"; // styled in js
import axios from 'axios';

import { userListActions, userSearchActions, waitingListActions, receivingListActions } from '../redux/modules/reducer/userListReducer'
import { useAppSelector, useAppDispatch } from '../redux/hooks' // 커스텀된 useSelector, useDispatch

const Main = styled.div`
  display: flex;
  flex-direction: column;
`

const Profile = styled.img`
  width: 100px;
  height: 100px;
`

function ModifiedFriend() {
  axios.defaults.withCredentials = true; // 요청, 응답에 쿠키를 포함하기 위해 필요
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const userList = useAppSelector((state  => state.userList));
  const searchVal = useAppSelector((state  => state.userSearch));
  const waitingList = useAppSelector((state  => state.waitingList));
  const receivingList = useAppSelector((state  => state.receivingList));

  let onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => { dispatch(userSearchActions.setSearch(e.target.value)) }; // 변경된 아이디 저장

  // interface searchState {
  //   searchVal: string;
  // }

  function listUp() { // 유저 검색했을 때 나오는 값들 저장
    axios.get('http://localhost:6001/userList', {
      params: {
        searchVal: searchVal
      }
    })
    .then(function (response) { 
      console.log(response.data);
      dispatch(userListActions.setInitialUserList(response.data))
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  function addFriend(receiver: string) { // 친구 추가하기
    axios.post('http://localhost:6001/userList/addFriend', {
      receiver
    })
    .then(function (response) { 
      console.log(response);
      // dispatch(userListActions.setInitialUserList(response.data))
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  function waitingListUp() { // 친구 신청 대기 리스트 가져오기
    axios.get('http://localhost:6001/waitingList')
    .then(function (response) { 
      console.log(response.data);
      dispatch(waitingListActions.setInitialWaitingList(response.data))
    })
    .catch(function (error) {
      console.log(error);
    })
  }

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
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
  }



  useEffect(() => { listUp(); }, [searchVal])
  useEffect(() => { waitingListUp(); receivingListUp(); }, [])

  return(
    <>
      <h1>친구 목록 수정</h1>

      <Main>
        <input onChange={onChangeSearch} type="text" placeholder='아이디를 입력하세요'/>
        <div>
          <table>
            <tbody>
              {
                userList.map((x, index) => {
                  return(
                    <tr key={index}>
                      <td><Profile src={x.profile}/></td>
                      <td>{x.nickname}</td>
                      <td><input onClick={() => {addFriend(x.id);}} type="button" value="친구 추가"/></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </Main>

      <div>
        <h2>대기 리스트</h2>
        <table>
            <tbody>
              {
                waitingList.map((x, index) => {
                  return(
                    <tr key={index}>
                      <td>받는사람: {x.receiver}</td>
                      <td>상태: {x.state}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
      </div>

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
    </>
  )
}


export default ModifiedFriend;