/**
 * 멤버 추가
 * 
 */

import { useEffect, useRef, useState } from 'react';

import { useNavigate } from "react-router-dom";

import { userListActions, userSearchActions } from '../../redux/modules/reducer/userListReducer'
import { memberActions, memberListActions, appointmentActions } from '../../redux/modules/reducer/memberListReducer'
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import axios from 'axios'; 

import styled from "styled-components"; // styled in js


function AppointmentInfo() {
  axios.defaults.withCredentials = true; // 요청, 응답에 쿠키를 포함하기 위해 필요
  const dispatch = useAppDispatch();

  const member = useAppSelector(state => state.member);

  const friendList = useAppSelector((state  => state.userList)); // 친구 리스트

  let [searchVal, setSearchVal] = useState(' '); // 검색 단어

  const el: any = useRef();
  
  const onChangeAppointmentName = (e: React.ChangeEvent<HTMLInputElement>) => { // 약속 이름
    dispatch(appointmentActions.setAppointmentName(e.target.value));
  };

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => { // 수동으로 입력해서 멤버 추가할 때: 닉네임 설정
    dispatch(memberActions.setNickname(e.target.value));
    setSearchVal(e.target.value);
  };

  /* 유저 검색했을 때 나오는 값들 저장 */
  const friendlistUp = async () => {
    try {
      let friendList = await axios.get('http://localhost:6001/searchFriendList', {
        params: {
          searchVal: searchVal
        }
      })
      dispatch(userListActions.setInitialUserList(friendList.data))
    } catch(e) {
      console.log(e);
    }
  }

  /* 친구 중에서 멤버 추가 */
  const addFriendMember = (id: string, nickname: string, profile: string) => { 
    dispatch(memberListActions.addMember({
      id: id, 
      nickname: nickname, 
      profile: profile
    }));
  }
 
  /* 멤버 추가 */
  const addMember = () => { 
    if (el.current.value) {
      dispatch(memberListActions.addMember({
        id: member.id, 
        nickname: member.nickname, 
        profile: member.profile
      })); // 멤버 리스트 배열값 변경
      dispatch(memberActions.setNickname('')); // input 초기화
    } else {
      alert("이름을 입력해주세요");
    }
  }

  useEffect(() => {
    const handleOutsideClick = (e: any) => {
      if (el.current && el.current.contains(e.target)) setSearchVal(''); // 친구 목록 보임
      else setSearchVal(' '); // 친구 목록 안보임
    }

    document.addEventListener('click', handleOutsideClick, true); // Component rendering 후 이벤트 등록
    return () => {
      document.removeEventListener('click', handleOutsideClick, true); // Component 제거 시 이벤트 제거
    };
  }, [el]);

  useEffect(() => {
    dispatch(memberListActions.setInitialMemberList([])); // 멤버리스트 초기화
  }, [])  

  useEffect(() => { friendlistUp(); }, [searchVal])


  return(
    <Container>
      <h2>일정 추가</h2>

      <Container__information>
        <AppointmentName>
          <label htmlFor="appointmentName">일정이름</label>
          <input id="appointmentName" onChange={onChangeAppointmentName} type="text" placeholder="일정 이름"/>
        </AppointmentName>

        <Member>
          <label htmlFor="id">인원추가</label>
          <Member_Search>
            <input id="id" ref={el} onClick={ ()=>{ dispatch(userSearchActions.setSearch(''))} } onChange={onChangeNickname} type="text" placeholder="아이디 또는 이름" value={member.nickname}/>
            <Member_FriendList>
              <List>
              {
                  friendList.map((x, index) => {
                    return(
                      <tr onClick={()=>{ addFriendMember(x.id, x.nickname, x.profile)}} key={index}>
                        <td><Profile src={x.profile === "\\image\\default_profile.png" ? x.profile : x.profile}/>{x.nickname}</td>
                      </tr>
                    )
                  })
                }
              </List>
            </Member_FriendList>
          </Member_Search>
          <input onClick={addMember} type="button" value="추가" />
        </Member>
      </Container__information>

    </Container>
  );
}

const Container = styled.section`
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
height: auto;
max-width: 800px;
color: #ffffff;
background-color: #322c58;
padding: 40px 20px 50px 20px;

& > h2 { 
  font-size: 3rem;
  margin-bottom: 20px;
  white-space: nowrap;
}

@media screen and (max-width: 768px) { 
  & > h2 {
    font-size: 2rem;
  }
} 
`

const Container__information = styled.section`
display: flex;
flex-direction: column;
width: 100%;
font-size: 2rem;
gap: 15px;

@media screen and (max-width: 768px) { 
  gap: 10px;
} 
`

/* 일정 이름 */
const AppointmentName = styled.div`
display: flex;
flex-direction: row;
align-items: center;
width: 100%;
/* margin-bottom: 15px; */

& > label {
  margin-right: 10px;
  white-space: nowrap;
}

& > input { // 일정 이름
  width: 100%;
  padding: 15px;
  margin-right: 20px;
  border: 1px solid #322c58;
  border-radius: 10px;
  font-size: 2rem;
  color: #535353;
  outline: none;
}

::after {
  content: '';
  width: 100px;
}

@media screen and (max-width: 768px) { 
  & > label {
    display: none;
  }

  & > input {
    padding: 10px;
    margin: 0;
    font-size: 1.5rem;
  }

  ::after {
    display: none;
  }
}
`

/* 인원 추가 */
const Member = styled.div`
display: flex;
flex-direction: row;
align-items: center;
width: 100%;
gap: 10px;

& > label {
  /* margin-right: 10px; */
  white-space: nowrap;
}

& > input { // 추가 버튼
  padding: 15px;
  border: none;
  white-space: nowrap;
  font-size: 2rem;
  background-color: #322c58;
  border: 3px solid #b4b8d3;
  color: #b4b8d3;
  font-weight: bold;
  border-radius: 10px;
  margin-right: 10px;
}

@media screen and (max-width: 768px) { 
  gap: 5px;

  & > label {
    display: none;
  }

  & > input { // 추가 버튼
    border: 2px solid #b4b8d3;
    padding: 9px;
    font-size: 1.5rem;
    margin: 0;
  }
}
`

/* 멤버 검색 */
const Member_Search = styled.div`
width: 100%;
position: relative; 

& > input { // 멤버 이름
  /* height: 50px; */
  padding: 15px 15px;
  border: 1px solid #322c58;
  width: 100%;
  font-size: 2rem;
  color: #535353;
  border-radius: 10px 10px 0 0;
  outline: none;
}

@media screen and (max-width: 768px) { 
  & > input {
    padding: 10px 10px;
    font-size: 1.5rem;
  }
} 
`

/* 멤버 검색: 친구 검색 */
const Member_FriendList = styled.table`
position: absolute;
width: 100%;
z-index: 1;
top: 53px;
background-color: #ffffff;
border: 1px solid #322c58;
border-radius: 0 0 10px 10px;
overflow: hidden;
border-collapse: separate;

@media screen and (max-width: 768px) { 
  top: 38px;
} 
`

/* 친구 리스트 */
const List = styled.tbody`
width: 100%;

& > tr {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #ffffff;
  /* margin: 5px; */
  padding: 5px 10px;
  color: #5f5f5f;
  cursor: pointer;
}

& td:nth-child(1) {
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 1.4rem;
  gap: 10px;
  font-weight: 600;
}

@media screen and (max-width: 768px) { 
  & td:nth-child(1) {
    font-size: 1.2rem;
    gap: 5px;
  }
} 
`

const Profile = styled.img`
width: 50px;
height: 50px;
border-radius: 70%;

@media screen and (max-width: 768px) { 
  width: 35px;
  height: 35px;
} 
`



export default AppointmentInfo;