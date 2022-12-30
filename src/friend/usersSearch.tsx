import { useEffect } from 'react';

import styled from "styled-components"; // styled in js
import axios from 'axios';

import { userListActions, userSearchActions } from '../redux/modules/reducer/userListReducer'
import { useAppSelector, useAppDispatch } from '../redux/hooks' // 커스텀된 useSelector, useDispatch

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Main = styled.div`
  background-color: aqua;
  position: relative;
`

const List = styled.div`
  background-color: #5a2222;
  position: absolute;
  z-index: 1;
  width: 100%;

  & > tbody {
    background-color: antiquewhite;
    width: 100%;
  }

  & tr td:nth-child(2){ 
    text-align: right;
    background-color: #ba996e;
  }
`

const Profile = styled.img`
  width: 50px;
  height: 50px;
`

function UsersSearch() {
  const dispatch = useAppDispatch();

  const userList = useAppSelector((state  => state.userList));
  const searchVal = useAppSelector((state  => state.userSearch));

  console.log(userList);

  let onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => { dispatch(userSearchActions.setSearch(e.target.value)) }; // 변경된 아이디 저장

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
      // console.log(response);
      // dispatch(userListActions.setInitialUserList(response.data))
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  useEffect(() => { listUp(); }, [searchVal])

  return (
    <>
      <Container>
        <input onChange={onChangeSearch} type="text" placeholder='아이디를 입력하세요'/>
        <Main>
          <List>
            <tbody>
              {
                userList.map((x, index) => {
                  return(
                    <tr key={index}>
                      <td><Profile src={x.profile}/>{x.nickname}</td>
                      {
                        x.userID || x.receiver || x.sender ? null : <td><input onClick={() => {addFriend(x.id);}} type="button" value="친구 추가"/></td>
                      }
                    </tr>
                  )
                })
              }
            </tbody>
          </List>
        </Main>
      </Container>
    </>
  )
}

export default UsersSearch;