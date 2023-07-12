/**
 * 로그인 페이지
 *
 * */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { login, authentication } from "../../apis/api/user";

import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { userInfoActions } from "../../redux/modules/reducer/userInfoReducer";

import styled from "styled-components";
import {
  Main,
  Main__Logo,
  Main__Components,
  Etc_components,
  Component_Input,
  Component_btn,
} from "../../styles/common/Login_SignUp_Component";

function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let [loginState, setLoginState] = useState(false);
  let [loginVals, setLoginVals] = useState({ userID: "", userPW: "" });

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginVals((val) => ({ ...val, userID: e.target.value }));
  };
  const onChangePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginVals((val) => ({ ...val, userPW: e.target.value }));
  };
  /* 로그인 버튼을 클릭했을 경우 */
  const click_LoginBtn = async () => {
    const userInfo = await login(loginVals);
    if (userInfo.status === 200) {
      // 로그인을 했을 때 user의 닉네임과 프로필 정보를 redux에 저장
      dispatch(userInfoActions.setNickname(userInfo.data.nickname));
      dispatch(userInfoActions.setProfile(userInfo.data.profile));
      navigate("/main"); // 메인페이지로 이동
    } else {
      if (userInfo.status === 406) {
        alert(userInfo.message);
      }
    }
  };

  useEffect(() => {
    /* 현재 로그인 상태 확인 */
    const login_confirm = async () => {
      const auth = await authentication();
      console.log(auth);
      if (auth.status === 200) {
        navigate("/main");
      } else {
        setLoginState(true);
      }
    };
    login_confirm();
  }, []);

  return (
    <Main>
      {loginState && (
        <>
          <Main__Logo src="image/logo_name.png" />
          <Main__Components>
            <Etc_components>
              <Component_Input
                onChange={onChangeId}
                type="text"
                placeholder="아이디를 입력하세요."
              />
              <Component_Input
                onChange={onChangePw}
                type="password"
                placeholder="패스워드를 입력하세요."
              />
              <Component_btn
                onClick={click_LoginBtn}
                type="button"
                value="로그인"
              />
              <Signup>
                <p>회원이 아니라면</p>
                <p
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  회원가입
                </p>
              </Signup>
            </Etc_components>
          </Main__Components>
        </>
      )}
    </Main>
  );
}

const Signup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  margin-top: 15px;
  cursor: pointer;

  & > p:nth-child(1) {
    color: #d2d2d2;
    font-size: 1.1rem;
    padding-right: 5px;
  }

  & > p:nth-child(2) {
    // 회원가입 버튼
    color: #ffec42;
    font-size: 1.1rem;
    padding-right: 10px;

    &:hover {
      text-decoration: underline;
      text-underline-position: under;
    }
  }
`;

export default Login;
