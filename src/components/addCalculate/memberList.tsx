/**
 * 추가한 멤버들 리스트
 *
 */
import { useNavigate } from "react-router-dom";
import { addCalculate } from "../../apis/api/calculate";
import { memberListActions } from "../../redux/modules/reducer/memberListReducer";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import getDateTime from "../../utils/getDateTime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import * as MemberListStyle from "../../styles/addCalculate/memberListStyle";
import { useEffect } from "react";

function MemberList() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const memberList = useAppSelector((state) => state.memberList);
  const calculateName = useAppSelector((state) => state.calculateName);

  /* 멤버 삭제 */
  const deleteMember = (index: number) => {
    dispatch(memberListActions.deleteMember(index)); // 멤버 리스트 배열값 변경
  };
  /* 정산 저장하기 */
  const saveCalculate = async () => {
    if (calculateName && memberList.length !== 0) {
      let state = await addCalculate({
        name: calculateName,
        members: memberList,
        date: getDateTime.getDate(),
        time: getDateTime.getTime(),
      });

      if (state.status === 200) {
        navigate("/main");
      } else if (state.status === 600) {
        // 로그인이 되어있지 않을 경우
        alert("로그아웃 되었습니다.");
        navigate("/login", {replace: true});
      }
    } else {
      alert("입력하지 않은 부분이 있습니다.");
    }
  };

  useEffect(() => {
    dispatch(memberListActions.setInitialMemberList([]));
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
                    <FontAwesomeIcon
                      onClick={() => {
                        deleteMember(index);
                      }}
                      icon={faMinusCircle}
                    />
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
