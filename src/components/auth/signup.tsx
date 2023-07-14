/**
 * 회원가입 페이지
 *
 * */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { register } from "../../apis/api/user";
import {
  Main,
  Main__Logo,
  Main__Components,
  Etc_components,
  Component_Input,
  Component_btn,
} from "../../styles/common/Login_SignUp_Component";
import Swal from "sweetalert2";

function Signup() {
  const navigate = useNavigate();
  const [signUpVals, setsignUpVals] = useState({
    nickname: "",
    userID: "",
    userPW: "",
    userConfirmPW: "",
  });
  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setsignUpVals((val) => ({ ...val, nickname: e.target.value }));
  };
  const onChangeUserID = (e: React.ChangeEvent<HTMLInputElement>) => {
    setsignUpVals((val) => ({ ...val, userID: e.target.value }));
  };
  const onChangeUserPW = (e: React.ChangeEvent<HTMLInputElement>) => {
    setsignUpVals((val) => ({ ...val, userPW: e.target.value }));
  };
  const onChangeUserConfirmPW = (e: React.ChangeEvent<HTMLInputElement>) => {
    setsignUpVals((val) => ({ ...val, userConfirmPW: e.target.value }));
  };
  /* 회원가입 과정 */
  const signupConfirm = async () => {
    if (
      signUpVals.nickname &&
      signUpVals.userConfirmPW &&
      signUpVals.userID &&
      signUpVals.userPW
    ) {
      const info = await register(signUpVals);
      if (info.status === 200) {
        Swal.fire("회원가입 성공", "회원가입에 성공하셨습니다", "success");
        navigate("/login");
      } else if (info.status === 406) {
        Swal.fire("회원가입 오류", info.message, "error");
      }
    } else {
      Swal.fire("", "입력하지 않은 값이 있습니다");
    }
  };

  return (
    <Main>
      <Main__Logo src="image/logo_name.png" />
      <Main__Components>
        <Etc_components>
          <p>2 ~ 6자리로 한글, 영문자, 숫자만 가능</p>
          <Component_Input
            onChange={onChangeNickname}
            type="text"
            placeholder="닉네임을 입력하세요"
          />
          <p>8 ~ 20자리로 영문자, 숫자만 가능</p>
          <Component_Input
            onChange={onChangeUserID}
            type="text"
            placeholder="아이디를 입력하세요"
          />
          <p>10 ~ 16자리로 영문자, 숫자, 특수문자 모두 포함 필수</p>
          <Component_Input
            onChange={onChangeUserPW}
            type="password"
            placeholder="비밀번호를 입력하세요"
          />
          <Component_Input
            onChange={onChangeUserConfirmPW}
            type="password"
            placeholder="비밀번호를 한 번 더 입력하세요"
          />
          <Component_btn
            onClick={signupConfirm}
            type="button"
            value="회원가입"
          />
          <Login>
            <p>회원이라면</p>
            <p
              onClick={() => {
                navigate("/login");
              }}
            >
              로그인
            </p>
          </Login>
        </Etc_components>
      </Main__Components>
    </Main>
  );
}

const Login = styled.div`
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

export default Signup;
