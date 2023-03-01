/**
 * 추가한 멤버들 리스트
 * 
 */

 import { useEffect, useRef } from 'react';

 import { useNavigate } from "react-router-dom";
 
 import { userListActions, userSearchActions } from '../../redux/modules/reducer/userListReducer'
 import { memberActions, memberListActions, appointmentActions } from '../../redux/modules/reducer/memberListReducer'
 import { useAppDispatch, useAppSelector } from "../../redux/hooks";
 
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // 아이콘 사용 위해 필요
 import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'; // 제거 아이콘
 
 import axios from 'axios';

import styled from "styled-components"; // styled in js

import getDateTime from '../../utils/getDateTime'; // 날짜, 시간


function MemberList() {
  axios.defaults.withCredentials = true; // 요청, 응답에 쿠키를 포함하기 위해 필요
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const memberList = useAppSelector(state => state.memberList);
  const appointment = useAppSelector(state => state.appointment);

  const deleteMember = (index: number) => { // 멤버 삭제
    dispatch(memberListActions.deleteMember(index)); // 멤버 리스트 배열값 변경
  }

  const saveAppointment = async () => {
    if (appointment.name && memberList.length !== 0 ) {
      try {
        let state = await axios.post('http://localhost:6001/appointment', {
          name: appointment.name,
          members: memberList,
          date: getDateTime.getDate(),
          time: getDateTime.getTime()
        })
        navigate('/main'); // 메인페이지로 이동
      } catch(e) {
        console.log(e);
      }
    } else {
      alert("입력하지 않은 부분이 있습니다.");
    }
  }

  const changeComponent = () => {
    if (memberList.length) {
      return (
        <Container__memberList>
          <Member_List>
            {
              memberList.map((x, index) => {
                return(
                  <Member key={index}>
                    <td><DefaultProfile src={x.profile ? x.profile : '/image/default_profile.png'}/></td>
                    <td>{x.nickname}</td>
                    <td><FontAwesomeIcon onClick={()=>{deleteMember(index)}} icon={faMinusCircle} /></td>
                  </Member>
                )
              })
            }
          </Member_List>
        </Container__memberList>
      )
    } else {
      return (
        <>
          <p>멤버를 추가해주세요</p>
        </>
      )
    }
  }

  return(
    <Container>
      {changeComponent()}
      <input onClick={saveAppointment} type="button" value="저장"/>
    </Container>
  );
}

const Container = styled.section`
display: flex;
flex-direction: column;
align-items: center;
width: 100%;
height: 100%;
background-color: #ffffff;
padding: 20px 20px 50px 20px;

& > p {
  font-size: 2rem;
  font-weight: 700;
  color: #515151;
  margin: 10vw 0;
}

& > input {
  background-color: #73ba9a;
  border: none;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  height: 60px;
  color: #ffffff;
  font-weight: 700;
  margin-top: 30px;
  font-size: 1.7rem;
  cursor: pointer;

  :hover {
    background-color: #65b490;
    color: #ffffff;
  }
}
`

const Container__memberList = styled.table`
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: space-between;

width: 100%;
/* background-color: #d4d4d4; */
max-width: 800px;
border-collapse: collapse; 
`

const Member_List = styled.tbody`
width: 100%;
/* background-color: aquamarine; */
`

const Member = styled.tr`
width: 100%;
border-bottom: 1px solid #e0e0e0;

:last-child {
  border: none;
}

& > td {
  width: 100%;
  padding: 10px;

  :nth-child(1) {
    width: auto;
    white-space: nowrap;
  }

  :nth-child(2) {
    width: 100%;
    padding: 0;
    font-size: 1.3rem;
    font-weight: 600;
    color: #5f5f5f;
  }

  :nth-child(3) {
    width: auto;
    font-size: 2rem;
    color: #7a2020;
  }
}
`

const DefaultProfile = styled.img`
width: 50px;
height: 50px;
border-radius: 70%;
`;

export default MemberList;