/** 
 * 일정 상세 페이지 - 헤더
 * 
 * */

import { useState } from "react";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { barActions } from "../../redux/modules/reducer/barReducer"
import { calculateActions } from "../../redux/modules/reducer/calculateReducer"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faEllipsisV } from "@fortawesome/free-solid-svg-icons"; // 햄버거바 아이콘

import * as HeaderStyle from "../../styles/calculateDetail/headerStyle";

type Props = {
  num: string|undefined;
}

function Header(props: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const barState = useAppSelector(state => state.barState); // 바 상태 : none | block
  const calculateState = useAppSelector(state => state.calculate);

  let [menuState, setMenuState] = useState<string>('none');

  /* 햄버거바를 클릭했을 때 실행되는 함수 */
  const clickBar = () => {
    if (barState.visible === 'none') dispatch(barActions.setVisible('block'));
    else dispatch(barActions.setVisible('none'));
  }

  /* 메뉴를 클릭했을 때 실행되는 함수 */
  const clickMenuBar = () => {
    if (menuState === 'none') setMenuState('block');
    else setMenuState('none');
  }

  return (
    <HeaderStyle.Header_>
      <img onClick={() => {navigate('/main')}} src='/image/back_icon.svg'/>
      <p onClick={clickBar}><FontAwesomeIcon icon={faBars}/></p>
      <HeaderStyle.Header__title>
        <img src='/image/appointment_logo_icon.svg'/>
        <p>{calculateState.calculateName}</p>
      </HeaderStyle.Header__title>

      <HeaderStyle.Header__Menu>
        <p onClick={clickMenuBar}><FontAwesomeIcon icon={faEllipsisV}/></p>
        <HeaderStyle.Menu visible={menuState}>
          <ul>
            <li>일정 수정</li>
            <li>삭제</li>
          </ul>
        </HeaderStyle.Menu>
      </HeaderStyle.Header__Menu>

    </HeaderStyle.Header_>
  )
}


export default Header;