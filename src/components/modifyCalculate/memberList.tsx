/**
 * 추가한 멤버들 리스트
 *
 */
import { useNavigate, useParams } from "react-router-dom";
import { modifyCalculate } from "../../apis/api/calculate";
import { memberListActions } from "../../redux/modules/reducer/memberListReducer";
import { modifyCalculateActions } from "../../redux/modules/reducer/calculateReducer";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import getDateTime from "../../utils/getDateTime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import * as MemberListStyle from "../../styles/addCalculate/memberListStyle";
import { useEffect, useState } from "react";

function MemberList() {
  const navigate = useNavigate();
  const params = useParams();
  const num = params.num; // 리스트 번호
  const dispatch = useAppDispatch();
  const memberList = useAppSelector((state) => state.memberList);
  const calculateState = useAppSelector((state) => state.calculate); // 정산 정보
  const modifyCalculateState = useAppSelector((state) => state.modifyCalculate); // 정산 정보
  const userInfo = useAppSelector((state) => state.userInfo);

  /* 멤버 삭제 */
  const deleteMember = (index: number) => {
    let nDeleteMemberList = [...modifyCalculateState.deleteMemberList];
    nDeleteMemberList.push(memberList[index].id);
    dispatch(modifyCalculateActions.setDeleteMemberList(nDeleteMemberList));
    dispatch(memberListActions.deleteMember(index)); // 멤버 리스트 배열값 변경
  };

  /* 정산 수정하기 */
  const saveCalculate = async () => {
    if (!num) return;
    if (calculateState.calculateName.length === 0 || memberList.length === 0)
      return;
    console.log(calculateState.calculateName);
    let state = await modifyCalculate(num, {
      name: calculateState.calculateName,
      addMemberList: modifyCalculateState.addMemberList,
      deleteMemberList: modifyCalculateState.deleteMemberList,
    });

    if (state.status === 200) {
      navigate(-1);
    } else if (state.status === 600) {
      // 로그인이 되어있지 않을 경우
      alert("로그아웃 되었습니다.");
      navigate("/login");
    }
  };

  useEffect(() => {
    return () => {
      dispatch(dispatch(modifyCalculateActions.setDeleteMemberList([])));
    };
  }, []);

  return (
    <MemberListStyle.Container>
      {memberList.length ? (
        <MemberListStyle.Container__memberList>
          <MemberListStyle.Member_List>
            {memberList.map((x, index) => {
              return (
                <MemberListStyle.Member key={index}>
                  <td>
                    <MemberListStyle.Profile
                      src={x.profile ? x.profile : "/image/default_profile.png"}
                    />
                  </td>
                  <td>{x.nickname}</td>
                  <td>
                    {userInfo.userID !== x.id ? (
                      <FontAwesomeIcon
                        onClick={() => {
                          deleteMember(index);
                        }}
                        icon={faMinusCircle}
                      />
                    ) : null}
                  </td>
                </MemberListStyle.Member>
              );
            })}
          </MemberListStyle.Member_List>
        </MemberListStyle.Container__memberList>
      ) : (
        <p>멤버를 추가해주세요</p>
      )}
      <input onClick={saveCalculate} type="button" value="저장" />
    </MemberListStyle.Container>
  );
}

export default MemberList;
