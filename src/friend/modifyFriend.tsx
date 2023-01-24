import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import styled from "styled-components"; // styled in js
import axios from 'axios';

import { userListActions, userSearchActions, waitingListActions, receivingListActions } from '../redux/modules/reducer/userListReducer'
import { useAppSelector, useAppDispatch } from '../redux/hooks' // 커스텀된 useSelector, useDispatch

import UsersSearch from './usersSearch';
import FriendList from './friendList';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Header = styled.div`

`

const Main = styled.div`
  display: flex;
  flex-direction: row;
  background-color: antiquewhite;
`


const SearchDiv = styled.div`
  display: flex;
  flex-direction: column;
`

const Section1 = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  background-color: #d1d6d6;
  height: 100%;
`

const Section2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  background-color: aqua;
  height: 100%;
`




const Profile = styled.img`
  width: 100px;
  height: 100px;
`

function ModifiedFriend() {
  axios.defaults.withCredentials = true; // 요청, 응답에 쿠키를 포함하기 위해 필요
  const navigate = useNavigate();
  const dispatch = useAppDispatch();


  const waitingList = useAppSelector((state  => state.waitingList));
  const receivingList = useAppSelector((state  => state.receivingList));



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



  useEffect(() => { waitingListUp(); }, [])

  return(
    <Container>
      <Header>
        <h1>친구 목록 수정</h1>
      </Header>

      <Main>
        <Section1>
          <UsersSearch></UsersSearch>
          {/* <SearchDiv>
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
                          {
                            x.userID || x.receiver || x.sender ? null : <td><input onClick={() => {addFriend(x.id);}} type="button" value="친구 추가"/></td>
                          }

                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </SearchDiv> */}

<div>
            <h2>대기 리스트</h2>
            <table>
                <tbody>
                  {
                    waitingList.map((x, index) => {
                      return(
                        <tr key={index}>
                          <td><Profile src={x.profile}/></td>
                          <td>{x.nickname}</td>
                          <td><input type="button" value={x.state}/></td>
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
        </Section1>
        <Section2>
          <FriendList></FriendList>
        </Section2>
      </Main>
    </Container>
  )
}


export default ModifiedFriend;