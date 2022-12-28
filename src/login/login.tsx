import { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";

import { loginActions } from '../redux/modules/reducer/loginReducer'
import { userInfoActions } from '../redux/modules/reducer/userInfoReducer'
// import { useDispatch, useSelector} from 'react-redux'
import { useAppSelector, useAppDispatch } from '../redux/hooks' // 커스텀된 useSelector, useDispatch
import styled from 'styled-components'; // styled in js

import axios from 'axios';


const Main = styled.div`
width: 100vw;
height: 100vh;
background-color: #6549b9;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
padding-bottom: 10%;
box-sizing: border-box;
`

const Title = styled.h1`
margin-bottom: 20px;
color: white;
`

const Side = styled.div`
display: flex;
flex-direction: row;
width: 30%;
align-items: center;
justify-content: center;
`

const Side__image = styled.img`
width: 50%;
`

const Side__login = styled.div`
display: flex;
flex-direction: column;
width: 50%;
`

const Side__login__component = styled.input`
width: 100%;
height: 40px;
margin-bottom: 10px;
padding: 10px;
box-sizing: border-box;
border: none;
outline: none;
`

const Side__login__btn = styled.input`
width: 100%;
background-color: #44466b;
border: none;
padding: 10px;
color: white;
font-weight: bold;
cursor: pointer;
`

const Side__signup__btn = styled.p`
width: 100%;
/* padding: 10px; */
color: white;
font-weight: bold;
cursor: pointer;
text-align: right;
`


function Login() {
  axios.defaults.withCredentials = true; // withCredentials 전역 설정
  const navigate = useNavigate(); // 페이지 이동을 위해 필요

  const loginInfo = useAppSelector((state  => state.loginInfo));
  
  const dispatch = useAppDispatch();

  let onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => { dispatch(loginActions.setUserID(e.target.value)) }; // 변경된 아이디 저장
  let onChangePw = (e: React.ChangeEvent<HTMLInputElement>) => { dispatch(loginActions.setUserPW(e.target.value)) }; // 변경된 패스워드 저장



  function login() { // 로그인 함수
    axios.post('http://localhost:6001/login', {
      userID: loginInfo.userID,
      userPW: loginInfo.userPW
    })
    .then(function (response) { 
      console.log(response);
      if (response.data.login_status === 'success') { // 로그인에 성공했다면
        // 로그인을 했을 때 user의 닉네임과 프로필 정보를 redux에 저장
        dispatch(userInfoActions.setNickname(response.data.nickname));
        dispatch(userInfoActions.setProfile(response.data.profile));

        navigate('/main'); // 메인페이지로 이동
      } else {
        alert("로그인에 실패하셨습니다.");
      }  
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  async function login_confirm() { // 현재 로그인 상태 확인
    let test = await axios.get('http://localhost:6001/authentication') // 서버로 post 요청
    if (test.data.authenticator) {
      navigate('/main'); // 메인페이지로 이동
    }
   }

  useEffect(() => {login_confirm();}, [])

  return(
    <Main>
      <Title>정산관리 시스템</Title>
      <Side>
        <Side__image src='image/logo512.png'/>
        <Side__login>
          <Side__login__component onChange={onChangeId} type="text" placeholder='아이디를 입력하세요.'/>
          <Side__login__component onChange={onChangePw} type="password" placeholder='패스워드를 입력하세요.'/>
          <Side__login__btn onClick={login} type="button" value="로그인"/>
          <Side__signup__btn onClick={()=>{navigate('/signup')}}>회원가입</Side__signup__btn>
        </Side__login>
      </Side>
    </Main>
  );
}

export default Login;