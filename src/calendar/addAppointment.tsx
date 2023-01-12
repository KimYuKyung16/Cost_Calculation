import { useEffect, useRef } from 'react';

import { useNavigate } from "react-router-dom";

import { userListActions, userSearchActions } from '../redux/modules/reducer/userListReducer'
import { memberActions, memberListActions, appointmentActions } from '../redux/modules/reducer/memberListReducer'
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // 아이콘 사용 위해 필요
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'; // 제거 아이콘

import axios from 'axios';
 
import styled from "styled-components"; // styled in js

const Member = styled.div`
display: flex;
flex-direction: row;
`

const DefaultProfile = styled.img`
width: 100px;
height: 100px;
`;

const Main__member = styled.div`
  display: flex;
  flex-direction: column;  
  width: 100%;
`

const Main__member__search = styled.div`
  /* background-color: aqua; */
  position: relative;

  & > input {
    &:nth-child(1) {
      width: 50%;
      height: 30px;
      font-size: 17px;
    }
    &:nth-child(2) {
      height: 30px;
      font-size: 17px;
      border: none;
      background-color: aquamarine;
    }
  }
`

const Main = styled.div`
  /* position: relative; */
  width: 100%;
  background-color: antiquewhite;
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



function AddAppointment() {
  axios.defaults.withCredentials = true; // 요청, 응답에 쿠키를 포함하기 위해 필요
  const dispatch = useAppDispatch();

  const member = useAppSelector(state => state.member);
  const memberList = useAppSelector(state => state.memberList);
  const appointment = useAppSelector(state => state.appointment);

  const friendList = useAppSelector((state  => state.userList)); // 친구 리스트
  const searchVal = useAppSelector((state  => state.userSearch)); // 검색 단어

  const el: any = useRef();
  
  let onChangeAppointmentName = (e: React.ChangeEvent<HTMLInputElement>) => { // 약속 이름
    dispatch(appointmentActions.setAppointmentName(e.target.value));
  };

  let onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => { // 수동으로 입력해서 멤버 추가할 때: 닉네임 설정
    dispatch(memberActions.setNickname(e.target.value));
    dispatch(userSearchActions.setSearch(e.target.value));
  };

  function friendlistUp() { // 유저 검색했을 때 나오는 값들 저장
    axios.get('http://localhost:6001/friendList', {
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
    dispatch(memberListActions.addMember({
      id: id, 
      nickname: nickname, 
      profile: profile
    }));
  }

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

  function saveAppointment() { // 약속 저장
    axios.post('http://localhost:6001/appointment', {
      name: appointment.name,
      members: memberList
    })
    .then(function (response) { 
      console.log(response);
      // if (response.data.login_status === 'success') { // 로그인에 성공했다면
      //   dispatch(userInfoActions.setNickname(response.data.nickname));
      //   dispatch(userInfoActions.setProfile(response.data.profile));

      //   navigate('/main'); // 메인페이지로 이동
      // } else {
      //   alert("로그인에 실패하셨습니다.");
      // }  
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  const test = function({target}: any) {
    if (!el.current.contains(target)) {
      dispatch(userSearchActions.setSearch(' '));
    } else  {
      dispatch(userSearchActions.setSearch(''));
    }
  };

  
  useEffect(() => { friendlistUp(); }, [searchVal])
  useEffect(() => {
    window.addEventListener("click", test);
  }, [])


  return(
    <>
      <h1>약속 추가하기</h1>
      <h5>일정이름</h5>
      <input onChange={onChangeAppointmentName} type="text" placeholder="일정 이름을 적어주세요"/>
      <h5>인원</h5>
      <Main__member>
        <Main__member__search>
          <input ref={el} onClick={ ()=>{ dispatch(userSearchActions.setSearch(''))} } onChange={onChangeNickname} type="text" placeholder="이름을 적어주세요" value={member.nickname}/>
          <input onClick={addMember} type="button" value="인원 추가" />
        </Main__member__search>
        <Main>
          {/* <p>안녕</p> */}
          <List>
            <Test>
              {
                friendList.map((x, index) => {
                  return(
                    <tr onClick={()=>{ addFriendMember(x.friendID, x.nickname, x.profile)}} key={index}>
                      <td><Profile src={x.profile === "\\image\\default_profile.png" ? x.profile : x.profile}/>{x.nickname}</td>
                    </tr>
                  )
                })
              }
            </Test>
          </List>
        </Main>
      </Main__member>
      

      {
        memberList.map((x, index) => {
          return(
            <Member key={index}>
              <DefaultProfile src={x.profile ? x.profile : '/image/default_profile.png'}/>
              <p>{x.nickname}</p>
              <p>{index}</p>
              <FontAwesomeIcon onClick={()=>{deleteMember(index)}} icon={faMinusCircle} />
            </Member>
          )
        })
      }

      <input onClick={saveAppointment} type="button" value="저장"/>

    </>
  )
}

export default AddAppointment;