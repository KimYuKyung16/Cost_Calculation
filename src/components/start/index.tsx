/**
 * 시작 페이지
 *
 * */
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

function Index() {
  const navigate = useNavigate();

  return (
    <Main>
      <div>
        <Main__Logo src="/image/logo.png" />
        <Main__Logo_start>
          <Logo_name src="/image/logo_letter.png" />
          <Main__start
            type="button"
            value="시작하기"
            onClick={() => {
              navigate("/login");
            }}
          />
        </Main__Logo_start>
      </div>

      <div>
        <Main__Logo src="/image/logo_name.png" />
        <Main__start
          type="button"
          value="시작하기"
          onClick={() => {
            navigate("/login");
          }}
        />
      </div>

      <p>
        당신의 정산을 손쉽게 만들어 줄 수 있습니다.
        <br /> 지금 한 번 시작해보세요 :)
      </p>
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
  padding: 0 10vw;
  padding-bottom: 10vh;
  color: #74b99a;

  & > div:nth-child(1) {
    display: flex;
    flex-direction: row;
    padding-bottom: 10vh;
  }

  & > div:nth-child(2) {
    display: none;
    text-align: center;
    padding-bottom: 10vh;
  }

  & > p {
    font-size: 1.4rem;
    text-align: center;

    & > br {
      display: none;
    }
  }

  @media screen and (max-width: 1023px) {
    & > div:nth-child(1) {
      display: none;
    }
    & > div:nth-child(2) {
      display: block;
      padding-bottom: 5vh;
    }
    & > p {
      font-size: 2vw;
      & > br {
        display: block;
      }
    }
  }
`;

const Main__Logo = styled.img`
  // 로고
  width: 200px;
  padding-right: 20px;
  padding-bottom: 20px;

  @media screen and (max-width: 1023px) {
    width: 60vw;
    padding-right: 0;
  }
`;

const Main__Logo_start = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo_name = styled.img`
  // 로고 이름에서 text부분
  width: 300px;
  padding-bottom: 30px;
`;

const Shine = keyframes` 
  0% { border-color: #61b694; color: #61b694; }
  15% { border-color: #A0CCBA; color: #A0CCBA; }
  30% { border-color: #dbe8e3; color: #dbe8e3; }
  45% { border-color: #A0CCBA; color: #A0CCBA; }
  60% { border-color: #77B79D; color: #77B79D; }
  75% { border-color: #A0CCBA; color: #A0CCBA;  }
  90% { border-color: #dbe8e3; color: #dbe8e3;  } 
 100% { border-color: #A0CCBA; color: #A0CCBA; }
`;

const Main__start = styled.input`
  // 시작하기 버튼
  width: 80%;
  height: 50px;
  background-color: #322c58;
  border: 3px solid #77b79d;
  animation: ${Shine} 2s 1s infinite linear alternate;
  font-weight: bold;
  color: #a0ccba;
  cursor: pointer;

  @media screen and (max-width: 1023px) {
    width: 60%;
  }
`;

export default Index;
