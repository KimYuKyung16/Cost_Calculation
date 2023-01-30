import { useEffect } from 'react';

import styled from "styled-components"; // styled in js
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // 아이콘 사용 위해 필요
import { faSearchPlus } from '@fortawesome/free-solid-svg-icons'; // 제거 아이콘

import { userListActions, userSearchActions } from '../redux/modules/reducer/userListReducer'
import { useAppSelector, useAppDispatch } from '../redux/hooks' // 커스텀된 useSelector, useDispatch

const Main = styled.div`
  display: flex;
  flex-direction: column;  
  width: 100%;
  background-color: #322c5a;

  & input {
    /* width: 100%; */
    background-color: #ffffff;
    font-size: 0.9em;
    outline: none;
    padding: 7px;
  }
`

const Main__Search = styled.div`
display: flex;
flex-direction: row;
width: 100%;
background-color: #ffffff;
align-items: center;
justify-content: center;
border: 1px solid #322c5a;
border-bottom: none;
box-sizing: border-box;

& :nth-child(1) {
  width: 100%;
  border: none;
}

& :nth-child(2) {
  font-size: 1.3em;
  color: #322c58;
  padding: 0 10px;
}
`


const Main__list = styled.div`
  position: relative;
  width: 100%;
  
`

const Main__list_memberList = styled.table`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  border-spacing: 0px;
  border-collapse: separate;
  font-size: 1em;
  font-weight: bold;
  /* color: #4f4f4f; */
  background-color: #ffffff;
  box-sizing: border-box;
  border: 1px solid #322c5a; // 화면 커졌을 때 이상한 줄 원인

  & tr {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #ffffff;
    width: 100%;
    height: 70px;
    padding: 0.5em;
    box-sizing: border-box;
  }

  & td:nth-child(1) {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0 0.5em;
  }

  & td:nth-child(2) {
    padding: 0 10px;
    display: flex;
    align-items: center;
    color: #a34747;
    height: 100%;

    & input {
      width: 70px;
      height: 50%;
      font-size: 0.7em;
      background-color: #cecece;
      border: 1px solid #bfbfbf;
    }
  }

`

const Profile = styled.img`  
  border: 1px solid #bfbfbf;
  border-radius: 70%;
  width: 50px;
  height: 50px;
  margin-right: 0.5rem;
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
    <Main>
      <Main__Search>
        <input onChange={onChangeSearch} type="text" placeholder='아이디를 입력하세요'/>
        <FontAwesomeIcon icon={faSearchPlus}/>
      </Main__Search>
      <Main__list>
        <Main__list_memberList>
          <tbody>
            {
              userList.map((x, index) => {
                return(
                  <tr key={index}>
                    <td><Profile src={x.profile === "\\image\\default_profile.png" ? x.profile : x.profile}/>{x.nickname}</td>
                    {
                    x.userID || x.receiver || x.sender ? null : 
                    <td><input onClick={() => {addFriend(x.id);}} type="button" value="친구 추가"/></td>
                    }
                  </tr>
                )
              })
            }
          </tbody>
        </Main__list_memberList>
      </Main__list>
    </Main>
  )
}

export default UsersSearch;