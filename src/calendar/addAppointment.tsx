import { useNavigate, Link } from "react-router-dom";

import { memberActions, memberListActions } from '../redux/modules/reducer/memberListReducer'
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // 아이콘 사용 위해 필요
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'; // 제거 아이콘


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
  const dispatch = useAppDispatch();

  const member = useAppSelector(state => state.member);
  const memberList = useAppSelector(state => state.memberList);

  console.log(member);
  console.log(memberList);
  
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


  return(
    <>
      <h1>약속 추가하기</h1>
      <h5>일정이름</h5>
      <input type="text" />
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

      <input type="button" value="저장"/>

    </>
  )
}

export default AddAppointment;