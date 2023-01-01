import { useEffect } from 'react';

import styled from "styled-components"; // styled in js
import axios from 'axios';

import { userListActions, userSearchActions } from '../redux/modules/reducer/userListReducer'
import { useAppSelector, useAppDispatch } from '../redux/hooks' // 커스텀된 useSelector, useDispatch

const Container = styled.div`
  display: flex;
  flex-direction: column;  
  width: 100%;
`

const Main = styled.div`
  position: relative;
  width: 100%;
`

const List = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
`

const Test = styled.tbody`
  background-color: #ffffff;
  width: 100%;

  * {
    /* width: 100%; */
    
  }

  & > tr {
    width: 100%;
    /* display: flex;
    flex-direction: row;
    align-items: center; */
    background-color: #ffffff;
    /* margin: 5px; */
    padding: 5px;
    
  }

  & td:nth-child(1) {
    width: 100%;
    /* background-color: #2781d0; */
  }

  & td:nth-child(2) {
    width: 100%;
    /* background-color: #a4adb4; */
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
            <Test>
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
            </Test>
          </List>
        </Main>
      </Container>
    </>
  )
}

export default UsersSearch;