/** 
 * 회원가입 페이지
 * 
 * */

 import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { register } from "../../apis/api/user";

import { useAppSelector, useAppDispatch } from '../../redux/hooks' // 커스텀된 useSelector, useDispatch

import { Main, Main__Logo, Main__Components, Etc_components, Component_Input, Component_btn } from '../../styles/Login_SignUp_Component';


function Signup() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // const signupInfo = useAppSelector((state  => state.signupInfo));
  let [signUpVals, setsignUpVals] = useState({ nickname: '', userID: '', userPW: '', userConfirmPW: '' });

  let onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => { setsignUpVals((val) => ( {...val, nickname:e.target.value} )) };
  let onChangeUserID = (e: React.ChangeEvent<HTMLInputElement>) => { setsignUpVals((val) => ( {...val, userID:e.target.value} )) };
  let onChangeUserPW = (e: React.ChangeEvent<HTMLInputElement>) => { setsignUpVals((val) => ( {...val, userPW:e.target.value} )) };
  let onChangeUserConfirmPW = (e: React.ChangeEvent<HTMLInputElement>) => { setsignUpVals((val) => ( {...val, userConfirmPW:e.target.value} )) };

  // 회원가입 과정
  const signupConfirm = async () => {
    const info =  await register(signUpVals);
    if (info.status === 200) {
      alert("회원가입에 성공하셨습니다."); 
      navigate('/'); // 메인페이지로 이동
    } else {
      alert("회원가입에 실패헀습니다.")
    }
  }
 
  return(
    <Main>
      <Main__Logo src="image/logo_name.png"/>
      <Main__Components>
        <Etc_components>
          <Component_Input onChange={onChangeNickname} type="text" placeholder='닉네임을 입력하세요'/>
          <Component_Input onChange={onChangeUserID} type="text" placeholder='아이디를 입력하세요'/>
          <Component_Input onChange={onChangeUserPW} type="password" placeholder='비밀번호를 입력하세요'/>
          <Component_Input onChange={onChangeUserConfirmPW} type="password" placeholder='비밀번호를 한 번 더 입력하세요'/>
          <Component_btn onClick={signupConfirm} type="button" value="회원가입"/>
        </Etc_components>
      </Main__Components>
    </Main>
  )
}

export default Signup;