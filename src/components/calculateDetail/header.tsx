/**
 * 일정 상세 페이지 - 헤더
 *
 * */
import { useState } from "react";
import { deleteCalculate } from "../../apis/api/calculate";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { barActions } from "../../redux/modules/reducer/barReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import * as HeaderStyle from "../../styles/calculateDetail/headerStyle";

function Header(props: { num: string | undefined }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const num: string | undefined = params.num;
  const barState = useAppSelector((state) => state.barState); // 바 상태 : none | block
  const calculateState = useAppSelector((state) => state.calculate);
  const [menuState, setMenuState] = useState<string>("none");
  const userInfo = useAppSelector((state) => state.userInfo);

  /* 햄버거바를 클릭했을 때 실행되는 함수 */
  const clickBar = () => {
    if (barState.visible === "none") dispatch(barActions.setVisible("block"));
    else dispatch(barActions.setVisible("none"));
  };
  /* 메뉴를 클릭했을 때 실행되는 함수 */
  const clickMenuBar = () => {
    if (menuState === "none") setMenuState("block");
    else setMenuState("none");
  };
  /* 메뉴에서 삭제 버튼을 클릭했을 때 실행되는 함수 */
  const clickDeleteBtn = async () => {
    let member = await deleteCalculate(num);
    if (member.status === 200) {
      alert("삭제되었습니다.");
      navigate("/main");
    }
  };

  return (
    <HeaderStyle.Header_>
      <img
        onClick={() => {
          navigate(-1);
        }}
        src="/image/back_icon.svg"
      />
      <p onClick={clickBar}>
        <FontAwesomeIcon icon={faBars} />
      </p>
      <HeaderStyle.Header__title>
        <img src="/image/appointment_logo_icon.svg" />
        <p>{calculateState.calculateName}</p>
      </HeaderStyle.Header__title>
      {calculateState.calculateOwner === userInfo.userID ? (
        <HeaderStyle.Header__Menu>
          <p onClick={clickMenuBar}>
            <FontAwesomeIcon icon={faEllipsisV} />
          </p>
          <HeaderStyle.Menu visible={menuState}>
            <ul>
              <li
                onClick={() => {
                  navigate("modify");
                }}
              >
                일정 수정
              </li>
              <li onClick={clickDeleteBtn}>삭제</li>
            </ul>
          </HeaderStyle.Menu>
        </HeaderStyle.Header__Menu>
      ) : null}
    </HeaderStyle.Header_>
  );
}

export default Header;
