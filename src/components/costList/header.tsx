/**
 * 비용 리스트 - 헤더
 *
 * */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteCalculateComplete,
  addCalculateComplete,
  changeCalculateComplete,
} from "../../apis/api/calculate";
import { costActions } from "../../redux/modules/reducer/costReducer";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { calculateActions } from "../../redux/modules/reducer/calculateReducer";
import { costListDeleteStateActions } from "../../redux/modules/reducer/barReducer";
import * as HeaderStyle from "../../styles/costList/headerStyle";

function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const memberList = useAppSelector((state) => state.memberList); // 멤버 리스트
  const cost = useAppSelector((state) => state.cost); // 비용 리스트
  const calculateState = useAppSelector((state) => state.calculate);
  const costListDeleteState = useAppSelector(
    (state) => state.costListDeleteState
  ); // 삭제 버튼 상태

  // 변경된 지불인 닉네임 저장 : 나중에 변경해야함.
  const onChangePayer = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(costActions.setcostID(e.target.value));
    dispatch(
      costActions.setcostPayer(e.target.options[e.target.selectedIndex].text)
    );
  };
  /* 정산 완료 버튼 클릭하는 경우 */
  const click_CompleteBtn = async () => {
    if (calculateState.complete.state) {
      // 정산 완료 버튼이 눌러져 있는 경우
      let changedMemberCount = calculateState.complete.memberCount - 1;
      dispatch(calculateActions.setCompleteState(false)); // 안 누른 상태로 만들기
      dispatch(calculateActions.setCompleteMemberCount(changedMemberCount)); // 안 누른 상태로 만들기

      let state = await deleteCalculateComplete(
        calculateState.calculateListNum
      ); // 정산 상태 취소
      if (state.status === 600) {
        alert("오류가 있습니다. 다시 한 번 시도해주세요.");
        changedMemberCount = calculateState.complete.memberCount + 1;
        dispatch(calculateActions.setCompleteState(true)); // 누른 상태로 만들기
        dispatch(calculateActions.setCompleteMemberCount(changedMemberCount)); // 누른 상태로 만들기
      }
    } else {
      // 정산 완료 버튼이 눌러져 있지 않은 경우
      let changedMemberCount = calculateState.complete.memberCount + 1;
      dispatch(calculateActions.setCompleteState(true)); // 누른 상태로 만들기
      dispatch(calculateActions.setCompleteMemberCount(changedMemberCount)); // 누른 상태로 만들기

      let state = await addCalculateComplete(calculateState.calculateListNum); // 정산 상태 추가
      if (state.status === 600) {
        alert("오류가 있습니다. 다시 한 번 시도해주세요.");
        changedMemberCount = calculateState.complete.memberCount - 1;
        dispatch(calculateActions.setCompleteState(false)); // 안 누른 상태로 만들기
        dispatch(calculateActions.setCompleteMemberCount(changedMemberCount)); // 안 누른 상태로 만들기
      }
    }
  };
  /* 정산 상태 바꾸기 */
  const changeState = async (state: string) => {
    await changeCalculateComplete(calculateState.calculateListNum, state);
  };
  /* 비용 삭제 표시 여부 */
  const onClickDelete = () => {
    dispatch(costListDeleteStateActions.setState(!costListDeleteState.state));
  };

  /* complete 인원수와 멤버들 수가 같으면 [정산완료]로 바꾸기 */
  useEffect(() => {
    if (calculateState.complete.memberCount === calculateState.memberCount) {
      changeState("false");
    } else {
      changeState("true");
    }
  }, [calculateState.complete.memberCount, calculateState.memberCount]);
  useEffect(() => {
    return () => {
      dispatch(costActions.setcostID(""));
      dispatch(costActions.setcostPayer(""));
    };
  }, []);

  return (
    <HeaderStyle.Header_>
      <h2>🤑 지출 내역</h2>
      <div>
        <HeaderStyle.Header__CompleteBtn>
          <img
            onClick={click_CompleteBtn}
            src={
              calculateState.complete.state
                ? "/image/complete_icon.svg"
                : "/image/incomplete_icon.svg"
            }
          />
          <p>{calculateState.complete.memberCount}</p>
        </HeaderStyle.Header__CompleteBtn>
        <HeaderStyle.Header__SelectUser>
          <select onChange={onChangePayer} value={cost.id}>
            <option value={""}>전체</option>
            {memberList.map((x, index) => {
              return (
                <option key={index} value={x.id}>
                  {x.nickname}
                </option>
              );
            })}
          </select>
        </HeaderStyle.Header__SelectUser>
        <input
          onClick={() => {
            navigate("cost");
          }}
          type="button"
          value="등록"
        />
        <input onClick={onClickDelete} type="button" value="삭제" />
      </div>
    </HeaderStyle.Header_>
  );
}

export default Header;
