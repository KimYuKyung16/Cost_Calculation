import { useNavigate, Link } from "react-router-dom";

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


function AddAppointment() {
  axios.defaults.withCredentials = true; // 요청, 응답에 쿠키를 포함하기 위해 필요
  const dispatch = useAppDispatch();

  const member = useAppSelector(state => state.member);
  const memberList = useAppSelector(state => state.memberList);
  const appointment = useAppSelector(state => state.appointment);

  console.log(member);
  console.log(memberList);
  
  let onChangeAppointmentName = (e: React.ChangeEvent<HTMLInputElement>) => { // 약속 이름
    dispatch(appointmentActions.setAppointmentName(e.target.value)) 
  };

  let onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => { // 수동으로 입력해서 멤버 추가할 때: 닉네임 설정
    dispatch(memberActions.setNickname(e.target.value)) 
  };

  
  function addMember() { // 멤버 추가
    dispatch(memberListActions.addMember({
      userID: member.userID, 
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
      name: appointment.name
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


  return(
    <>
      <h1>약속 추가하기</h1>
      <h5>일정이름</h5>
      <input onChange={onChangeAppointmentName} type="text" placeholder="일정 이름을 적어주세요"/>
      <h5>인원</h5>
      <input onChange={onChangeNickname} type="text" placeholder="이름을 적어주세요" value={member.nickname}/>
      <input onClick={addMember} type="button" value="인원 추가" />

      {
        memberList.map((x, index) => {
          return(
            <Member key={index}>
              <DefaultProfile src='/image/default_profile.png'/>
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