/**
 * 멤버 추가
 * 
 */

import { useEffect, useRef, useState } from 'react';

import { useNavigate } from "react-router-dom";

import { userListActions, userSearchActions } from '../../redux/modules/reducer/userListReducer'
import { memberActions, memberListActions, appointmentActions } from '../../redux/modules/reducer/memberListReducer'
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // 아이콘 사용 위해 필요
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'; // 제거 아이콘

import axios from 'axios'; 

import styled from "styled-components"; // styled in js


function AppointmentInfo() {
  axios.defaults.withCredentials = true; // 요청, 응답에 쿠키를 포함하기 위해 필요
  const dispatch = useAppDispatch();

  const member = useAppSelector(state => state.member);
  const memberList = useAppSelector(state => state.memberList);
  const appointment = useAppSelector(state => state.appointment);

  const friendList = useAppSelector((state  => state.userList)); // 친구 리스트

  let [searchVal, setSearchVal] = useState(''); // 검색 단어

  const el: any = useRef();
  
  let onChangeAppointmentName = (e: React.ChangeEvent<HTMLInputElement>) => { // 약속 이름
    dispatch(appointmentActions.setAppointmentName(e.target.value));
  };

  let onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => { // 수동으로 입력해서 멤버 추가할 때: 닉네임 설정
    dispatch(memberActions.setNickname(e.target.value));
    setSearchVal(e.target.value);
  };

  // console.log(memberList);
  // console.log(friendList);
  console.log(searchVal)

  function friendlistUp() { // 유저 검색했을 때 나오는 값들 저장
    axios.get('http://localhost:6001/searchFriendList', {
      params: {
        searchVal: searchVal
      }
    })
    .then(function (response) { 
      // console.log(el.current.contains());
      // console.log(el.current)
      // el.current.focus();
      console.log(response.data);
      dispatch(userListActions.setInitialUserList(response.data))
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  function addFriendMember(id: string, nickname: string, profile: string) { // 친구 중에서 멤버 추가
    console.log('멤버의 id값:',id)
    dispatch(memberListActions.addMember({
      id: id, 
      nickname: nickname, 
      profile: profile
    }));
  }

  console.log(friendList)

  function addMember() { // 멤버 추가
    dispatch(memberListActions.addMember({
      id: member.id, 
      nickname: member.nickname, 
      profile: member.profile
    })); // 멤버 리스트 배열값 변경
    dispatch(memberActions.setNickname('')); // input 초기화
  }

  function deleteMember(index: number) { // 멤버 삭제
    dispatch(memberListActions.deleteMember(index)); // 멤버 리스트 배열값 변경
  }



  function date(){ //날짜를 구해주는 함수
    let today = new Date();

    let year = today.getFullYear();
    let month = ('0' + (today.getMonth() + 1)).slice(-2);
    let day = ('0' + today.getDate()).slice(-2);

    let dateString = year + '.' + month  + '.' + day;
    return dateString
  }

  function time(){ //시간을 구해주는 함수
    let today = new Date();   

    let hours = ('0' + today.getHours()).slice(-2); 
    let minutes = ('0' + today.getMinutes()).slice(-2);
    let seconds = ('0' + today.getSeconds()).slice(-2); 
    
    let timeString = hours + ':' + minutes  + ':' + seconds;
    return timeString
  }


  function saveAppointment() { // 약속 저장
    axios.post('http://localhost:6001/appointment', {
      name: appointment.name,
      members: memberList,
      date: date(),
      time: time()
    })
    .then(function (response) { 
      console.log(response);
      // navigate('/main'); // 메인페이지로 이동
 
    })
    .catch(function (error) {
      console.log(error);
    })
  }


  const test2 = () => {
    dispatch(memberListActions.setInitialMemberList([]));
    console.log(memberList)
  }

  useEffect(() => {
    function handleOutsideClick(e: any) {
      if (el.current && el.current.contains(e.target)) {
        setSearchVal('');
      } else {
        setSearchVal(' ');
      }
    }

    // Component rendering 후 이벤트 등록
    document.addEventListener('click', handleOutsideClick, true);
    // Component 제거 시 이벤트 제거
    return () => {
      document.removeEventListener('click', handleOutsideClick, true);
    };
  }, [el]);

  useEffect(() => {test2();}, [])  
  useEffect(() => { friendlistUp(); }, [searchVal])


  return(
    <Container>
      <h2>일정 추가</h2>

      <Container__information>
        <AppointmentName>
          <label htmlFor="appointmentName">일정이름</label>
          <input id="appointmentName" onChange={onChangeAppointmentName} type="text" placeholder="일정 이름을 적어주세요"/>
        </AppointmentName>

        <Member>
          <label htmlFor="id">인원추가</label>
          <Member_Search>
            <input id="id" ref={el} onClick={ ()=>{ dispatch(userSearchActions.setSearch(''))} } onChange={onChangeNickname} type="text" placeholder="이름을 적어주세요" value={member.nickname}/>
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
}
`

const Container__information = styled.section`
display: flex;
flex-direction: column;
width: 100%;
font-size: 2rem;
`

/* 일정 이름 */
const AppointmentName = styled.div`
display: flex;
flex-direction: row;
align-items: center;
width: 100%;
margin-bottom: 15px;

& > label {
  margin-right: 10px;
  white-space: nowrap;
}

& > input { // 일정 이름
  width: 100%;
  height: 50px;
  padding: 10px 15px;
  margin-right: 20px;
  border: 1px solid #322c58;
  border-radius: 10px;
  font-size: 1.6rem;
  color: #535353;
  outline: none;
}

::after {
  content: '';
  width: 100px;
}
`

/* 인원 추가 */
const Member = styled.div`
display: flex;
flex-direction: row;
align-items: center;
width: 100%;

& > label {
  margin-right: 10px;
  white-space: nowrap;
}

& > input { // 추가 버튼
  height: 50px;
  border: none;
  white-space: nowrap;
  font-size: 1.5rem;
  width: 100px;
  background-color: #322c58;
  border: 3px solid #b4b8d3;
  color: #b4b8d3;
  font-weight: bold;
  border-radius: 10px;
  margin-right: 10px;
  margin-left: 10px;
}
`

/* 멤버 검색 */
const Member_Search = styled.div`
width: 100%;
position: relative; 

& > input { // 멤버 이름
  height: 50px;
  border: 1px solid #322c58;
  width: 100%;
  padding: 10px 15px;
  font-size: 1.6rem;
  color: #535353;
  border-radius: 10px 10px 0 0;
  outline: none;
}
`

/* 멤버 검색: 친구 검색 */
const Member_FriendList = styled.table`
position: absolute;
width: 100%;
z-index: 1;
top: 49px;
background-color: #ffffff;
border: 1px solid #322c58;
border-radius: 0 0 10px 10px;
overflow: hidden;
border-collapse: separate;
/* display: none; */
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
`

const Profile = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 70%;
`



export default AppointmentInfo;