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

const Main = styled.div`
width: 100%;
height: 100%;
/* background-color: #ffffff; */
position: relative;
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
  background-color: #ffffff;

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

const Main__button = styled.p`
  display: none;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 2em;
  bottom: 2em;
  background-color: #322c58;
  color: white;
  font-weight: bold;
  border-radius: 70%;
  border: 2px solid #9291a1;
  width: 10vw;
  height: 10vw;
  z-index: 1;

  & :nth-child(1) {
    font-size: 4vw;
  }

/* 모바일, 타블렛 기준 */
@media screen and (max-width: 1023px) { 
display: flex;
}
`


const Profile = styled.img`
  /* width: 50px;
  height: 50px;
  border-radius: 70%; */
`

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


  return(
    <>
      <Main>
        <Main__List>
          <tbody>
            {
              friendList.map((x, index) => {
                return(
                  <tr key={index}>
                    <td>
                      <div><Profile src={x.profile}/></div>
                      {x.nickname}
                    </td>
                    <td><FontAwesomeIcon onClick={
                      () => {
                        if (window.confirm("친구 목록에서 삭제하시겠습니까?")) { 
                          deleteFriend(index, x.id)               
                          console.log("삭제되었습니다.");                
                        } else { 
                          console.log("삭제에 실패했습니다.");  
                        }              
                      }
                    } icon={faMinusCircle} /></td>
                  </tr>
                )
              })
            }
          </tbody>
        </Main__List>

        <Main__button onClick={clickAddFriendBtn}>
          <FontAwesomeIcon icon={faUserPlus}/>
        </Main__button>
      </Main>

    </>
  )

}

export default FriendList;