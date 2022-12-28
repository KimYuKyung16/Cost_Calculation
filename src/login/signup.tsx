import { useNavigate } from "react-router-dom";

import { signUpFormActions } from '../redux/modules/reducer/signUpReducer'

import { useAppSelector, useAppDispatch } from '../redux/hooks' // 커스텀된 useSelector, useDispatch
import styled from 'styled-components'; // styled in js

import axios from 'axios';

const SignupForm = styled.div`
display: flex;
flex-direction: column;
`

function Signup() {
  const navigate = useNavigate(); // 페이지 이동을 위해 필요
  const dispatch = useAppDispatch();

  const signupInfo = useAppSelector((state  => state.signupInfo));

  let onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => { dispatch(signUpFormActions.setNickname(e.target.value)) };
  let onChangeUserID = (e: React.ChangeEvent<HTMLInputElement>) => { dispatch(signUpFormActions.setUserID(e.target.value)) };
  let onChangeUserPW = (e: React.ChangeEvent<HTMLInputElement>) => { dispatch(signUpFormActions.setUserPW(e.target.value)) };
  let onChangeUserConfirmPW = (e: React.ChangeEvent<HTMLInputElement>) => { dispatch(signUpFormActions.setUserConfirmPW(e.target.value)) };

 
  function signupConfirm() { // 회원가입 확인
    axios.post('http://localhost:6001/signup', { // 서버로 post 요청
      nickname: signupInfo.nickname,
      userID: signupInfo.userID,
      userPW: signupInfo.userPW,
      userConfirmPW: signupInfo.userConfirmPW
    })
    .then(function (response) { // 서버에서 응답이 왔을 때
      alert("회원가입에 성공하셨습니다."); 
      navigate('/'); // 메인페이지로 이동
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  return(
    <>
      <h1>회원가입 화면</h1>
      <SignupForm>
        <input onChange={onChangeNickname} type="text" placeholder='닉네임을 입력하세요'/>
        <input onChange={onChangeUserID} type="text" placeholder='아이디를 입력하세요'/>
        <input onChange={onChangeUserPW} type="password" placeholder='비밀번호를 입력하세요'/>
        <input onChange={onChangeUserConfirmPW} type="password" placeholder='비밀번호를 한 번 더 입력하세요'/>
      </SignupForm>
      <input onClick={signupConfirm} type="button" value="회원가입"/>
    </>
  )
}

export default Signup;