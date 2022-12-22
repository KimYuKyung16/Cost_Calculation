import { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";

import { userInfoActions } from '../redux/modules/reducer/userInfoReducer'
// import { useDispatch, useSelector} from 'react-redux'
import { useAppSelector, useAppDispatch } from '../redux/hooks' // 커스텀된 useSelector, useDispatch

function Login() {
  const navigate = useNavigate(); // 페이지 이동을 위해 필요

  const userInfo = useAppSelector((state  => state.userInfo))
  console.log(userInfo.userID);
  console.log(userInfo.userPW);
  const dispatch = useAppDispatch();

  let onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => { dispatch(userInfoActions.setUserID(e.target.value)); console.log(e) }; // 변경된 아이디 저장
  let onChangePw = (e: React.ChangeEvent<HTMLInputElement>) => { dispatch(userInfoActions.setUserPW(e.target.value)) }; // 변경된 패스워드 저장

  function login() {
    let loginStatus = true;
    if (loginStatus) { // 로그인에 성공하면
      navigate('/main');
    } else { // 로그인에 실패하면
      console.log("로그인에 실패했습니다. 다시 로그인해주세요.")
    }
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

export default Login;