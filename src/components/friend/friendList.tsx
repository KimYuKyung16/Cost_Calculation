/* 친구 목록 */

import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import styled from "styled-components"; // styled in js
import axios from 'axios';

import { friendVisibleActions } from '../../redux/modules/reducer/barReducer'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // 아이콘 사용 위해 필요
import { faMinusCircle, faUserPlus } from '@fortawesome/free-solid-svg-icons'; // 제거 아이콘
// import { faMinusCircle } from "@fortawesome/free-regular-svg-icons";

import { userListActions } from '../../redux/modules/reducer/userListReducer'
import { friendListActions } from '../../redux/modules/reducer/friendReducer' 
import { useAppSelector, useAppDispatch } from '../../redux/hooks' // 커스텀된 useSelector, useDispatch


function FriendList() {
  axios.defaults.withCredentials = true; // 요청, 응답에 쿠키를 포함하기 위해 필요
  const dispatch = useAppDispatch();

  const friendVisibleState = useAppSelector(state => state.friendVisible);
  console.log(friendVisibleState.visible)
  const friendList = useAppSelector(state => state.friendList);

  interface friendListType {
    id: string;
    nickname: string;
    profile: string;
  }

  // let [friendList, setFriendList] = useState<friendListType[]>([])

  const getFriendList = async () => {
    let friendlist = await axios.get('http://localhost:6001/friendList')
    // setFriendList(friendlist.data);
    dispatch(friendListActions.setInitialFriendList(friendlist.data));
  }

  const clickAddFriendBtn = () => { // 친구추가 버튼을 클릭했을 때 실행되는 함수
    if (friendVisibleState.visible === 'none') dispatch(friendVisibleActions.setVisible('block'));
    else dispatch(friendVisibleActions.setVisible('none'));
    console.log(friendVisibleState.visible);
  }

   const deleteFriend = async (index: number, id: string) => {
    let state = await axios.delete('http://localhost:6001/friendList', {
      params: { id: id }
    });

    if (state) dispatch(friendListActions.deleteFriend(index));
   }

  useEffect(() => {
    getFriendList();
  }, [])

  
  const delete_friend = (index: number, id: string) => {
    if (window.confirm("친구 목록에서 삭제하시겠습니까?")) { 
      deleteFriend(index, id)               
      console.log("삭제되었습니다.");                
    } else { 
      console.log("삭제에 실패했습니다.");  
    }  
  }


  return(
    <>
      <Main>
        <Main__friendList>
          <tbody>
            {
              friendList.map((x, index) => {
                return(
                  <tr key={index}>
                    <td><Profile src={x.profile}/>{x.nickname}</td>
                    <td>
                      <img src="/image/delete_icon.svg" onClick={ () => { delete_friend(index, x.id) } }/>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </Main__friendList>

        <Main__button onClick={clickAddFriendBtn} src="/image/add_friend_icon.svg" />
      </Main>

    </>
  )
}

const Main = styled.div`
width: 100%;
height: 100%;
background-color: #ffffff;
position: relative;
`

/* 친구 리스트  */
const Main__friendList = styled.table`
width: 100%;
height: 100%;
border-spacing: 0px;
border-collapse: separate;
font-size: 1.2em;
font-weight: bold;
color: #4f4f4f;

& tr {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 8px;
}

& td {
  display: flex;
  align-items: center;
}

& td:nth-child(1) { // 프로필 & 닉네임
  width: 100%;
  height: 100%;
}

& td:nth-child(2) { // 삭제 아이콘
  /* visibility: hidden; */
  height: 100%;

  & > img {
    height: 20px;
  }
}

@media screen and (max-width: 768px) { 
  font-size: 1.1rem;

  & td:nth-child(2) { // 삭제 아이콘
    & > img {
      height: 15px;
    }
  }
}
`

const Main__button = styled.img`
display: none;
align-items: center;
justify-content: center;
width: 10vw;
height: 10vw;
min-width: 50px;
min-height: 50px;
position: absolute;
right: 5vw;
bottom: 7vw;

& > img {
  height: 80%;
}

@media screen and (max-width: 768px) { 
  display: block;
}
`

const Profile = styled.img`
width: 50px;
height: 50px;
border-radius: 70px;
border: 1px solid #bfbfbf;
margin-right: 5px;

@media screen and (max-width: 768px) { 
  width: 45px;
  height: 45px;
}
`


export default FriendList;