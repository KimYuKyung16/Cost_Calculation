/* 친구 목록 */

import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import styled from "styled-components"; // styled in js
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // 아이콘 사용 위해 필요
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'; // 제거 아이콘
// import { faMinusCircle } from "@fortawesome/free-regular-svg-icons";

import {  } from '../redux/modules/reducer/userListReducer'
import { useAppSelector, useAppDispatch } from '../redux/hooks' // 커스텀된 useSelector, useDispatch

const Main = styled.div`
width: 100%;
height: 100%;
`

const Main__List = styled.table`
  width: 100%;
  border-spacing: 0px;
  border-collapse: separate;
  font-size: 2.8vw;
  font-weight: bold;
  /* box-sizing: border-box; */
  color: #4f4f4f;

  & tr {
    display: flex;
    flex-direction: row;
    align-items: center;
    /* background-color: #928b82; */
    width: 100%;
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
      padding-top: 10%;
      /* max-width: 30px;
      max-height: 30px;  */
      position: relative;
      border-radius: 70%;
      margin: 0 0.5rem;

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



const Profile = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 70%;
`

function FriendList() {

  interface friendListType {
    id: string;
    nickname: string;
    profile: string;
  }

  let [friendList, setFriendList] = useState<friendListType[]>([])

  const getFriendList = async () => {
    let friendlist = await axios.get('http://localhost:6001/friendList')

    setFriendList(friendlist.data);

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
                      

                    <td><FontAwesomeIcon icon={faMinusCircle} /></td>
                  </tr>
                )
              })
            }
          </tbody>
        </Main__List>
      </Main>

    </>
  )

}

export default FriendList;