/* 로그인 페이지 */

import { useEffect } from 'react';
import { useNavigate } from "react-router-dom"; 

import axios from 'axios';
import styled from 'styled-components'; 

import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { loginActions } from '../redux/modules/reducer/loginReducer'
import { userInfoActions } from '../redux/modules/reducer/userInfoReducer'


function Login() {
  axios.defaults.withCredentials = true; // withCredentials 전역 설정
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const loginInfo = useAppSelector((state  => state.loginInfo));

  let onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => { dispatch(loginActions.setUserID(e.target.value)) }; // 변경된 아이디 저장
  let onChangePw = (e: React.ChangeEvent<HTMLInputElement>) => { dispatch(loginActions.setUserPW(e.target.value)) }; // 변경된 패스워드 저장

  const login = async () => { // 로그인 함수
    const userInfo = await axios.post('http://localhost:6001/login', {
      userID: loginInfo.userID,
      userPW: loginInfo.userPW
    })

    if (userInfo.data.login_status === 'success') { // 로그인에 성공했다면
      // 로그인을 했을 때 user의 닉네임과 프로필 정보를 redux에 저장
      dispatch(userInfoActions.setNickname(userInfo.data.nickname));
      dispatch(userInfoActions.setProfile(userInfo.data.profile));
      navigate('/main'); // 메인페이지로 이동
    } else {
      alert("로그인에 실패하셨습니다.");
    }  
  }

  const login_confirm = async () => { // 현재 로그인 상태 확인
    let auth = await axios.get('http://localhost:6001/authentication')
    if (auth.data.authenticator) { navigate('/main'); }
  }

  useEffect(() => { login_confirm() }, [])

  return(
    <Main>
      <Main__Logo src="image/logo_name.png"/>
      <Main__Components>
        <Login_components>
          <Login__component onChange={onChangeId} type="text" placeholder='아이디를 입력하세요.'/>
          <Login__component onChange={onChangePw} type="password" placeholder='패스워드를 입력하세요.'/>
          <Login__btn onClick={login} type="button" value="로그인"/>
          <Signup>
            <p>회원이 아니라면</p>
            <p onClick={()=>{navigate('/signup')}}>회원가입</p>
          </Signup>
        </Login_components>
      </Main__Components>
    </Main>
  );
}


const Main = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100vw;
height: 100vh;
background-color: #322c58;
padding-bottom: 15vh;
box-sizing: border-box;
`

const Main__Logo = styled.img` // 로고
width: 200px;
padding-bottom: 20px;
`

const Main__Components = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
width: 30vw;

@media screen and (max-width: 1023px) { 
  width: 50vw;
}
`

const Login_components = styled.div`
display: flex;
flex-direction: column;
width: 60%;
min-width: 250px;

@media screen and (max-width: 1023px) { 
  width: 70%;
}
`

const Login__component = styled.input` // 아이디, 패스워드 입력칸
width: 100%;
height: 40px;
margin-bottom: 10px;
padding: 10px;
box-sizing: border-box;
border: none;
outline: none;
border-radius: 7px;
`

const Login__btn = styled.input` // 로그인 버튼
width: 100%;
background-color: #74b99a;
border: none;
padding: 10px;
color: #3b3b3b;
font-weight: bold;
border-radius: 10px;
cursor: pointer;
&:hover {
  background-color: #5b8f78;
  color: #ffffff;
}
`

const Signup = styled.div`
display: flex;
flex-direction: row;
justify-content: flex-end;
align-items: center;
width: 100%;
cursor: pointer;

& > p:nth-child(1) {
  color: #d2d2d2;
  font-size: 0.9em;
  padding-right: 5px;
}

& > p:nth-child(2) { // 회원가입 버튼
  color: #d0dc5c;
  font-size: 1em;

  &:hover {
    font-weight: bold;
  }
}
`

export default Login;