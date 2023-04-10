/**
 * 추가한 멤버들 리스트
 * 
 */
import { useNavigate } from "react-router-dom";

import { addCalculate } from "../../apis/api/calculate";

import { memberListActions } from '../../redux/modules/reducer/memberListReducer'
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import getDateTime from '../../utils/getDateTime'; // 날짜, 시간


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // 아이콘 사용 위해 필요
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'; // 제거 아이콘
import * as MemberListStyle from "../../styles/addCalculate/memberListStyle";


function MemberList() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const memberList = useAppSelector(state => state.memberList);
  const calculateName = useAppSelector(state => state.calculateName);

  const deleteMember = (index: number) => { // 멤버 삭제
    dispatch(memberListActions.deleteMember(index)); // 멤버 리스트 배열값 변경
  }

  /* 정산 저장하기 */
  const saveCalculate = async () => {
    if (calculateName && memberList.length !== 0 ) {
      let state = await addCalculate({
        name: calculateName,
        members: memberList,
        date: getDateTime.getDate(),
        time: getDateTime.getTime()
      })

      if (state.status === 200) { navigate('/main'); } 
      else if (state.status === 600) { // 로그인이 되어있지 않을 경우
        alert("로그아웃 되었습니다.");
        navigate('/login');
      }

    } else {
      alert("입력하지 않은 부분이 있습니다.");
    }
  }

  return(
    <MemberListStyle.Container>
      {
        memberList.length ?
        <MemberListStyle.Container__memberList>
          <MemberListStyle.Member_List>
            {
              memberList.map((x, index) => {
                return(
                  <MemberListStyle.Member key={index}>
                    <td><MemberListStyle.Profile src={x.profile ? x.profile : '/image/default_profile.png'}/></td>
                    <td>{x.nickname}</td>
                    <td><FontAwesomeIcon onClick={()=>{deleteMember(index)}} icon={faMinusCircle} /></td>
                  </MemberListStyle.Member>
                )
              })
            }
          </MemberListStyle.Member_List>
        </MemberListStyle.Container__memberList>
        :
        <p>멤버를 추가해주세요</p>
      }
      <input onClick={saveCalculate} type="button" value="저장"/>
    </MemberListStyle.Container>
  );
}


export default MemberList;