import { useNavigate, Link } from "react-router-dom";

import { memberActions, memberListActions } from '../redux/modules/reducer/memberListReducer'
import { useAppDispatch, useAppSelector } from "../redux/hooks";

function AddAppointment() {

  const memberList = useAppSelector(state => state.memberList) ;
  console.log(memberList);

  const dispatch = useAppDispatch();

  let onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => { dispatch(memberActions.setUserID(e.target.value)) };

  
  function addMember() {
    dispatch(memberListActions.addMember({userID: 'kyk', nickname: '김김', profile:'?'})); // 멤버 리스트 배열값 변경
  }

  return(
    <>
      <h1>약속 추가하기</h1>
      <h5>일정이름</h5>
      <input type="text" />
      <h5>인원</h5>
      <input onChange={onChangeId} type="text"/>
      <input onClick={addMember} type="button" value="인원 추가" />
    </>
  )
}

export default AddAppointment;