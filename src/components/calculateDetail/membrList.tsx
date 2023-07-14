/**
 * 일정 상세 페이지 - 멤버 리스트
 *
 */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMemberList } from "../../apis/api/calculate";
import { MemberInterface } from "../../interfaces/memberInterface";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { memberListActions } from "../../redux/modules/reducer/memberListReducer";
import { calculateActions } from "../../redux/modules/reducer/calculateReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faUser } from "@fortawesome/free-solid-svg-icons";
import * as MemberListStyle from "../../styles/calculateDetail/memberListStyle";
import Swal from "sweetalert2";

function MemberList(props: { num: string | undefined }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const params = useParams();
  const num: string | undefined = params.num;
  const [memberList, setMemberList] = useState<MemberInterface[]>([]); // 멤버 리스트
  const [fontSize, setFontSize] = useState<number>(1.4); // 비용 폰트 사이즈
  const [totalCost, setTotalCost] = useState(0); // 총 비용
  const [eachCost, setEachCost] = useState(0); // 1인당 내야 하는 비용

  /* 멤버 리스트 가져오기 */
  const member_List = async () => {
    const member = await getMemberList({ params: { num } });
    if (member.status === 200) {
      setTotalCost(Number(member.data.sumCost)); // 총 비용 설정
      setEachCost(member.data.eachCost); // 1인당 내야 하는 비용 설정
      setMemberList(member.data.memberList); // 멤버 리스트 설정
      dispatch(memberListActions.setInitialMemberList(member.data.memberList));
      dispatch(calculateActions.setMemberCount(member.data.memberList.length)); // 멤버 수 설정
    }
    if (member.status === 600) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: member.message,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/login");
    }
  };

  useEffect(() => {
    member_List();
  }, []);
  /* 글자 수에 따라 폰트 사이즈 조절 */
  useEffect(() => {
    if (String(totalCost).length >= 10) {
      setFontSize(1.3);
    } else if (String(totalCost).length >= 15) {
      setFontSize(1.2);
    }
  }, [totalCost]);

  return (
    <MemberListStyle.Container>
      <MemberListStyle.Container__Common_Expense size={fontSize}>
        <div>
          <p>
            <FontAwesomeIcon icon={faUsers} /> 총 비용:
          </p>
          <p>
            <span>{totalCost.toLocaleString("ko-KR")}</span>원
          </p>
        </div>
        <div>
          <p>
            <FontAwesomeIcon icon={faUser} /> 1인 지출 비용:
          </p>
          <p>
            <span>{eachCost.toLocaleString("ko-KR")}</span>원
          </p>
        </div>
      </MemberListStyle.Container__Common_Expense>

      <hr />

      <h5>현재 인원</h5>
      {memberList.map((x, index) => {
        if (index === 0) {
          // 본인 정보
          return (
            <MemberListStyle.Container__Members_myInfo key={index}>
              <li>
                <img src="/image/crown_icon.svg" />
                <MemberListStyle.MyProfile src={x.profile} />
                <p>{x.nickname}</p>
              </li>
              <li>
                <MemberListStyle.List>
                  <li>
                    <span>총 지출비</span> <hr />{" "}
                    {x.totalCost.toLocaleString("ko-KR")} 원
                  </li>
                  <li>
                    <span>더 내야하는 비용</span> <hr />{" "}
                    {x.lackCost.toLocaleString("ko-KR")} 원
                  </li>
                  <li>
                    <span>받아야 하는 비용</span> <hr />{" "}
                    {x.excessCost.toLocaleString("ko-KR")} 원
                  </li>
                </MemberListStyle.List>
              </li>
            </MemberListStyle.Container__Members_myInfo>
          );
        } else {
          // 본인을 제외한 멤버들의 정보
          return (
            <MemberListStyle.Container__Members_memberInfo key={index}>
              <li>
                <MemberListStyle.Profile src={x.profile} />
                <p>{x.nickname}</p>
              </li>
              <li>
                <MemberListStyle.List>
                  <li>
                    <span>총 지출비</span> <hr />{" "}
                    {x.totalCost.toLocaleString("ko-KR")} 원
                  </li>
                  <li>
                    <span>더 내야하는 비용</span> <hr />{" "}
                    {x.lackCost.toLocaleString("ko-KR")} 원
                  </li>
                  <li>
                    <span>받아야 하는 비용</span> <hr />{" "}
                    {x.excessCost.toLocaleString("ko-KR")} 원
                  </li>
                </MemberListStyle.List>
              </li>
            </MemberListStyle.Container__Members_memberInfo>
          );
        }
      })}
    </MemberListStyle.Container>
  );
}

export default MemberList;
