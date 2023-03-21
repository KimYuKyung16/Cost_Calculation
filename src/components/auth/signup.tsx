/** 
 * 회원가입 페이지
 * 
 * */

import { useNavigate } from "react-router-dom";

import axios from 'axios';
import { Main, Main__Logo, Main__Components, Etc_components, Component_Input, Component_btn } from '../../styles/Login_SignUp_Component';

import { useAppSelector, useAppDispatch } from '../../redux/hooks' // 커스텀된 useSelector, useDispatch
import { signUpFormActions } from '../../redux/modules/reducer/signUpReducer';


function Signup() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const signupInfo = useAppSelector((state  => state.signupInfo));

  let onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => { dispatch(signUpFormActions.setNickname(e.target.value)) };
  let onChangeUserID = (e: React.ChangeEvent<HTMLInputElement>) => { dispatch(signUpFormActions.setUserID(e.target.value)) };
  let onChangeUserPW = (e: React.ChangeEvent<HTMLInputElement>) => { dispatch(signUpFormActions.setUserPW(e.target.value)) };
  let onChangeUserConfirmPW = (e: React.ChangeEvent<HTMLInputElement>) => { dispatch(signUpFormActions.setUserConfirmPW(e.target.value)) };

  // 회원가입 과정
  const signupConfirm = async () => {
    const info =  await axios.post('http://localhost:6001/auth/register', { // 서버로 post 요청
      nickname: signupInfo.nickname,
      userID: signupInfo.userID,
      userPW: signupInfo.userPW,
      userConfirmPW: signupInfo.userConfirmPW
    })

    if (info.data.status) {
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