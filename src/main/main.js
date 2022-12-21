import { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";

import { userInfoActions } from '../redux/modules/reducer/userInfoReducer'
import { useDispatch, useSelector} from 'react-redux'

function Main() {
  // let [userID, setUserID] = useState(''); // 유저 아이디 설정
  // let [userPW, setUserPW] = useState(''); // 유저 패스워드 설정
  const test = useSelector((state => state.userInfo))
  console.log(test.userID);
  console.log(test.userPW);
  const dispatch = useDispatch();

  let onChangeId = (e) => { dispatch(userInfoActions.setUserID(e.target.value)) }; // 변경된 아이디 저장
  let onChangePw = (e) => { dispatch(userInfoActions.setUserPW(e.target.value)) }; // 변경된 패스워드 저장

  // let onChangeId = (e) => {console.log(e)};
  // let onChangePw = (e) => {console.log(e)};

  function login() {
    console.log("로그인 버튼 클릭");
    console.log()
  }

  return(
    <>
      <h1>정산관리 시스템</h1>
      <input onChange={onChangeId} type="text" placeholder='아이디를 입력하세요.'/>
      <input onChange={onChangePw} type="password" placeholder='패스워드를 입력하세요.'/>
      <input onClick={login} type="button" value="로그인"/>
    </>
  );
}

export default Main;